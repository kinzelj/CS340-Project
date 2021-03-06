import React, { Component } from 'react'
import { Button, Header, Modal, Form, Input } from 'semantic-ui-react'
import * as ServerCall from '../scripts/ServerCall.js'
import '../css/RemovePopup.css';

/*********************************************************************
 * RemovePopup component will render when user selects to remove zoo
 * item. Props passed to component will determine popup contents
**********************************************************************/
class RemovePopup extends Component {
  state = {
    open: false,
    searchSelect: "",
    searchAttributeSelect: "",
    searchValue: "",
    animalId: "",
    animalType: "",
    animalCage: "",
    workerId: "",
    workerFirst: "",
    workerLast: "",
    workerPosition: "",
    foodId: "",
    foodType: "",
    cageId: "",
    cageName: "",
    cageSize: "",
    foodEntryId: "",
    animalWorkerEntryId: ""
  }

  contents = null;

  //handle popup close
  close = () => this.setState({ open: false }, () => this.props.closePopup(null, "close"))

  //set state of component values from props passed into component
  componentDidMount() {
    this.setState({
      searchSelect: this.props.select,
      searchValue: this.props.id,
      searchAttributeSelect: this.props.idName
    }, () => this.getInitialData());
  }

  //function that handles deletion of item
  deleteItem = () => {
    //if user tries to remove animal worker assignment, first check there is more than one worker assigned to animal
    if (this.state.searchSelect === "workerAnimal") {
      var searchProps = {
        searchSelect: "workerAnimal",
        searchAttributeSelect: "ANIMAL ID",
        searchValue: this.state.animalId
      };
      ServerCall.searchRemove(searchProps)
        .then(res => {
          if (res.length > 1) {
            ServerCall.removeItem(this.state)
              .then(res => {
                this.setState({
                  open: false
                }, () => this.props.closePopup(this.state.searchSelect.toUpperCase(), "success"))
              }).catch(
                err => {
                  console.log(err)
                  this.setState({
                    open: false
                  }, () => this.props.closePopup(this.state.searchSelect.toUpperCase(), this.state.searchSelect))
                });
          }
          else {
            this.setState({
              open: false
            }, () => this.props.closePopup(this.state.searchSelect.toUpperCase(), this.state.searchSelect))
          }
        }).catch(err => {
          console.log(err);
          this.setState({
            open: false
          }, () => this.props.closePopup(this.state.searchSelect.toUpperCase(), this.state.searchSelect))
        });
      return;
    }

    //if user tries to remove animal food assignment, first check there is more than one assigned food to animal
    if (this.state.searchSelect === "approvedFoods") {
      searchProps = {
        searchSelect: "approvedFoods",
        searchAttributeSelect: "ANIMAL ID",
        searchValue: this.state.animalId
      };
      ServerCall.searchRemove(searchProps)
        .then(res => {
          if (res.length > 1) {
            ServerCall.removeItem(this.state)
              .then(res => {
                this.setState({
                  open: false
                }, () => this.props.closePopup(this.state.searchSelect.toUpperCase(), "success"))
              }).catch(
                err => {
                  console.log(err)
                  this.setState({
                    open: false
                  }, () => this.props.closePopup(this.state.searchSelect.toUpperCase(), this.state.searchSelect))
                });
          }
          else {
            this.setState({
              open: false
            }, () => this.props.closePopup(this.state.searchSelect.toUpperCase(), this.state.searchSelect))
          }
        }).catch(err => {
          console.log(err);
          this.setState({
            open: false
          }, () => this.props.closePopup(this.state.searchSelect.toUpperCase(), this.state.searchSelect))
        });
      return;
    }

    //else call server to remove item from database
    ServerCall.removeItem(this.state)
      .then(res => {
        this.setState({
          open: false
        }, () => this.props.closePopup(this.state.searchSelect.toUpperCase(), "success"))
      }).catch(
        err => {
          console.log(err)
          this.setState({
            open: false
          }, () => this.props.closePopup(this.state.searchSelect.toUpperCase(), this.state.searchSelect))
        });
  }

  //get initial data from server based on searchSelect state variable 
  getInitialData() {
    ServerCall.searchData(this.state)
      .then(res => {
        this.setState({ dbData: res[0] }, () => {
          const data = this.state.dbData;
          switch (this.state.searchSelect) {
            case ("animal"):
              {
                this.setState({
                  animalType: data["ANIMAL TYPE"],
                  animalCage: data["CAGE NAME"],
                  animalId: data["ANIMAL ID"]
                }, () => { this.showContents() })
                break;
              }
            case ("worker"):
              {
                this.setState({
                  workerId: data["WORKER ID"],
                  workerFirst: data["FIRST NAME"],
                  workerLast: data["LAST NAME"],
                  workerPosition: data["POSITION"]
                }, () => { this.showContents() })
                break;
              }
            case ("food"):
              {
                this.setState({
                  foodId: data["FOOD ID"],
                  foodType: data["FOOD TYPE"]
                }, () => { this.showContents() })
                break;
              }
            case ("cage"):
              {
                this.setState({
                  cageId: data["CAGE NUMBER"],
                  cageName: data["CAGE NAME"],
                  cageSize: data["SQ FT"]
                }, () => { this.showContents() })
                break;
              }
            case ("approvedFoods"):
              {
                this.setState({
                  foodEntryId: data["ENTRY ID"],
                  animalId: data["ANIMAL ID"],
                  animalType: data["ANIMAL TYPE"],
                  foodType: data["FOOD TYPE"],
                }, () => { this.showContents() })
                break;
              }
            case ("workerAnimal"):
              {
                this.setState({
                  animalWorkerEntryId: data["ENTRY ID"],
                  animalId: data["ANIMAL ID"],
                  animalType: data["ANIMAL TYPE"],
                  workerId: data["ASSIGNED WORKER ID"],
                  workerFirst: data["WORKER FIRST NAME"],
                  workerLast: data["WORKER LAST NAME"],
                }, () => { this.showContents() })
                break;
              }
            default:
              return;
          }
        })
      })
      .catch(err => console.log(err));
  }

  //determine popup contents based on searchSelect passed to component
  showContents() {
    const {
      animalType,
      animalId,
      workerId,
      workerFirst,
      workerLast,
      workerPosition,
      foodId,
      foodType,
      cageId,
      cageName,
      cageSize,
      foodEntryId,
      animalWorkerEntryId,
    } = this.state

    switch (this.state.searchSelect) {
      case ("animal"):
        {
          this.contents = (
            <div className='formContents'>
              <Header>Are you sure you want to remove animal data from the zoo database:</Header>
              <Form>
                <Form.Group >
                  <Form.Field width={2}>
                    <label>Animal ID</label>
                    <Input
                      id="remove-input"
                      readOnly
                      value={animalId}
                    />
                  </Form.Field>
                  <Form.Field width={5}>
                    <label>Animal Type</label>
                    <Input
                      id="remove-input"
                      readOnly
                      value={animalType}
                    />
                  </Form.Field>
                </Form.Group>
              </Form>
            </div>
          );
          break;
        }
      case ("worker"):
        {
          this.contents = (
            <div className='formContents'>
              <Header>Are you sure you want to remove worker data from the zoo database?</Header>
              <p>Any worker-animal assignemnt for this worker will also be deleted:</p>
              <Form>
                <Form.Group >
                  <Form.Field width={2}>
                    <label>Worker ID</label>
                    <Input
                      id="remove-input"
                      value={workerId}
                      readOnly
                    />
                  </Form.Field>
                  <Form.Field width={5}>
                    <label>Worker First Name</label>
                    <Input
                      id="remove-input"
                      value={workerFirst}
                      readOnly
                    />
                  </Form.Field>
                  <Form.Field width={5}>
                    <label>Worker Last Name</label>
                    <Input
                      id="remove-input"
                      value={workerLast}
                      readOnly
                    />
                  </Form.Field>
                  <Form.Field width={5}>
                    <label>Worker Position</label>
                    <Input
                      id="remove-input"
                      value={workerPosition}
                      readOnly
                    />
                  </Form.Field>
                </Form.Group>
              </Form>
            </div>
          );
          break;
        }
      case ("food"):
        {
          this.contents = (
            <div className='formContents'>
              <Header>Are you sure you want to remove animal food data from the zoo database?</Header>
              <p>Any animal that has is currently approved to eat this food will no longer have it available:</p>
              <Form>
                <Form.Group >
                  <Form.Field width={2}>
                    <label>Food ID</label>
                    <Input
                      id="remove-input"
                      value={foodId}
                      readOnly
                    />
                  </Form.Field>
                  <Form.Field width={5}>
                    <label>Food Type</label>
                    <Input
                      id="remove-input"
                      value={foodType}
                      readOnly
                    />
                  </Form.Field>
                </Form.Group>
              </Form>
            </div>
          );
          break;
        }
      case ("cage"):
        {
          this.contents = (
            <div className='formContents'>
              <Header>Are you sure you want to remove cage data from the zoo database:</Header>
              <Form>
                <Form.Group >
                  <Form.Field width={2}>
                    <label>Cage ID</label>
                    <Input
                      id="remove-input"
                      value={cageId}
                      readOnly
                    />
                  </Form.Field>
                  <Form.Field width={5}>
                    <label>Cage Name</label>
                    <Input
                      id="remove-input"
                      value={cageName}
                      readOnly
                    />
                  </Form.Field>
                  <Form.Field width={5}>
                    <label>Cage Size</label>
                    <Input
                      id="remove-input"
                      value={cageSize}
                      readOnly
                    />
                  </Form.Field>
                </Form.Group>
              </Form>
            </div>
          );
          break;
        }
      case ("approvedFoods"):
        {
          this.contents = (
            <div className='formContents'>
              <Header>Are you sure you want to remove from this animal's list of approved foods:</Header>
              <Form>
                <Form.Group >
                  <Form.Field width={2}>
                    <label>Entry ID</label>
                    <Input
                      id="remove-input"
                      value={foodEntryId}
                      readOnly
                    />
                  </Form.Field>
                  <Form.Field width={5}>
                    <label>Animal</label>
                    <Input
                      id="remove-input"
                      value={"Animal ID #" + animalId + ":  " + animalType}
                      readOnly
                    />
                  </Form.Field>
                  <Form.Field width={5}>
                    <label>Approved Food</label>
                    <Input
                      id="remove-input"
                      value={foodType}
                      readOnly
                    />
                  </Form.Field>
                </Form.Group>
              </Form>
            </div >
          );
          break;
        }
      case ("workerAnimal"):
        {
          this.contents = (
            <div className='formContents'>
              <Header>Are you sure you want to remove from this animal's list of approved workers:</Header>
              <Form>
                <Form.Group >
                  <Form.Field width={2}>
                    <label>Entry ID</label>
                    <Input
                      id="remove-input"
                      value={animalWorkerEntryId}
                      readOnly
                    />
                  </Form.Field>
                  <Form.Field width={5}>
                    <label>Animal</label>
                    <Input
                      id="remove-input"
                      value={"Animal ID #" + animalId + ":  " + animalType}
                      readOnly
                    />
                  </Form.Field>
                  <Form.Field width={5}>
                    <label>Assigned Worker</label>
                    <Input
                      id="remove-input"
                      value={"Worker ID #" + workerId + ":  " + workerFirst + " " + workerLast}
                      readOnly
                    />
                  </Form.Field>
                </Form.Group>
              </Form>
            </div >
          );
          break;
        }
      default:
        return;
    }
    this.setState({ open: true });
  }

  //render jsx for remove popup
  render() {
    return (
      <div>
        <Modal open={this.state.open} onClose={this.close}>
          <Modal.Header>REMOVE ZOO DATA</Modal.Header>
          <Modal.Content image>
            <Modal.Description>
              {this.contents}
            </Modal.Description>
          </Modal.Content>
          <Modal.Actions>
            <Button color='red' content="CANCEL" onClick={this.close} />
            <Button content="REMOVE ITEM" onClick={this.deleteItem} />
          </Modal.Actions>
        </Modal>
      </div>
    )
  }
}

export default RemovePopup
