import React, { Component } from 'react'
import { Button, Header, Modal, Form, Input } from 'semantic-ui-react'
import * as ServerCall from '../scripts/ServerCall.js'

const options = {
  updateAnimal: {
    key: "dk-updateAnimal",
    cageDropDown: [{ key: "" }]
  },
  updateApprovedFood: {
    key: 'dk-updateApprovedFood',
    foodDropdown: [{ key: "" }]
  },
  updateCageWorker: {
    key: 'dk-updateCageWorker',
    workerDropdown: [{ key: "" }]
  },
  updateAnimalWorker: {
    key: 'dk-updateAnimalWorker',
    workerDropdown: [{ key: "" }]
  }
}

class UpdateForm extends Component {
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

  close = () => this.setState({ open: false }, () => this.props.closePopup(null, "close"))

  submit = () => {
    ServerCall.updateItem(this.state)
      .then(res => {
        this.setState({ open: false }, () => this.props.closePopup(this.state.searchSelect.toUpperCase(), "success"))
      }).catch(
        err => {
          console.log(err)
          this.setState({ open: false }, () => this.props.closePopup(this.state.searchSelect.toUpperCase(), err))
        });

  }

  getKey = (object, value) => {
    return Object.keys(object).find(key => object[key] === value);
  }

  handleSelectChange = (e, { name, value }) => {
    this.setState({ [name]: value }, () => this.showContents());
  }

  handleInputChange = (e, { name, value }) => {
    this.setState({
      [name]: value.toUpperCase()
    }, () => this.showContents())
  }

  getInitialData() {
    ServerCall.searchData(this.state)
      .then(res => {
        this.setState({ dbData: res[0] }, () => {
          const data = this.state.dbData;
          switch (this.state.searchSelect) {
            case ("animal"):
              {
                this.setState(
                  {
                    animalType: data["ANIMAL TYPE"],
                    animalCage: data["CAGE NUMBER"],
                    animalId: data["ANIMAL ID"]
                  }, () => {
                    ServerCall.getCageDropdown({ query: "cage" })
                      .then(res => {
                        options.updateAnimal.cageDropdown = res;
                        this.showContents();
                      }).catch(err => console.log(err));
                  }
                )
                break;
              }
            case ("worker"):
              {
                this.setState(
                  {
                    workerId: data["WORKER ID"],
                    workerFirst: data["FIRST NAME"],
                    workerLast: data["LAST NAME"],
                    workerPosition: data["POSITION"]
                  }, () => { this.showContents() }
                )
                break;
              }
            case ("food"):
              {
                this.setState(
                  {
                    foodId: data["FOOD ID"],
                    foodType: data["FOOD TYPE"]
                  }, () => { this.showContents() }
                )
                break;
              }
            case ("cage"):
              {
                this.setState({
                  cageId: data["CAGE NUMBER"],
                  cageName: data["CAGE NAME"],
                  cageSize: data["SQ FT"],
                  workerId: data["ASSIGNED WORKER ID"]
                }, () => { 
                  ServerCall.getWorkersDropdown({ query: "worker" })
                    .then(res => {
                      options.updateCageWorker.workerDropdown = res;
                      this.showContents();
                    }).catch(err => console.log(err));
                });
                break;
              }
            case ("approvedFoods"):
              {
                this.setState({
                  foodEntryId: data["ENTRY ID"],
                  animalId: data["ANIMAL ID"],
                  animalType: data["ANIMAL TYPE"],
                }, () => {
                  ServerCall.getFoodDropdown({ query: "food" })
                    .then(res => {
                      options.updateApprovedFood.foodDropdown = res;
                      const indexSearch = (foodName) => {
                        const i = options.updateApprovedFood.foodDropdown.findIndex(
                          (dropdownArray) => { return (dropdownArray.text === foodName) });
                        return (options.updateApprovedFood.foodDropdown[i].value);
                      }
                      this.setState({ foodId: indexSearch(data["FOOD TYPE"]) }, () => {
                        this.showContents();
                      });

                    }).catch(err => console.log(err));
                }
                )
                break;
              }
            case ("workerAnimal"):
              {
                this.setState({
                  animalWorkerEntryId: data["ENTRY ID"],
                  animalId: data["ANIMAL ID"],
                  animalType: data["ANIMAL TYPE"],
                  workerId: data["ASSIGNED WORKER ID"]
                }, () => {
                  ServerCall.getWorkersDropdown({ query: "worker" })
                    .then(res => {
                      options.updateAnimalWorker.workerDropdown = res;
                      this.showContents();
                    }).catch(err => console.log(err));
                }
                )
                break;
              }
            case ("workerCage"):
              {
                this.setState({
                  cageId: data["CAGE NUMBER"],
                  cageName: data["CAGE NAME"],
                  workerId: data["ASSIGNED WORKER ID"]
                }, () => {
                  ServerCall.getWorkersDropdown({ query: "worker" })
                    .then(res => {
                      options.updateAnimalWorker.workerDropdown = res;
                      this.showContents();
                    }).catch(err => console.log(err));
                }
                )
                break;
              }
            default: return;
          }
        })
      })
      .catch(err => console.log(err));
  }

  showContents() {
    const {
      animalType,
      animalCage,
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
              <Header>Modify animal data, then submit:</Header>
              <Form>
                <Form.Group >
                  <Form.Field width={2}>
                    <label>Animal ID</label>
                    <Input
                      placeholder={animalId}
                      readOnly
                      width={2}
                    />
                  </Form.Field>
                  <Form.Field width={5}>
                    <label>Animal Type</label>
                    <Input
                      name="animalType"
                      value={animalType}
                      onChange={this.handleInputChange}
                    />
                  </Form.Field>
                  <Form.Select
                    width={5}
                    label="Animal Assigned Cage"
                    options={options.updateAnimal.cageDropdown}
                    name='animalCage'
                    value={animalCage}
                    onChange={this.handleSelectChange}
                  />
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
              <Header>Modify worker data, then submit:</Header>
              <Form>
                <Form.Group >
                   <Form.Field width={2}>
                    <label>Worker ID</label>
                    <Input
                      placeholder={workerId}
                      readOnly
                      width={2}
                    />
                  </Form.Field>
                  <Form.Field width={5}>
                    <label>Worker First Name</label>
                    <Input
                      name="workerFirst"
                      value={workerFirst}
                      onChange={this.handleInputChange}
                    />
                  </Form.Field>
                  <Form.Field width={5}>
                    <label>Worker Last Name</label>
                    <Input
                      name="workerLast"
                      value={workerLast}
                      onChange={this.handleInputChange}
                    />
                  </Form.Field>
                  <Form.Field width={5}>
                    <label>Worker Position</label>
                    <Input
                      name="workerPosition"
                      value={workerPosition}
                      onChange={this.handleInputChange}
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
              <Header>Modify food data, then submit:</Header>
              <Form>
                <Form.Group >
                  <Form.Field width={2}>
                    <label>Food ID</label>
                    <Input
                      placeholder={foodId}
                      readOnly
                      width={2}
                    />
                  </Form.Field>
                  <Form.Field width={5}>
                    <label>Food Type</label>
                    <Input
                      name="foodType"
                      value={foodType}
                      onChange={this.handleInputChange}
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
              <Header>Modify cage data, then submit:</Header>
              <Form>
                <Form.Group >
                  <Form.Field width={2}>
                    <label>Cage ID</label>
                    <Input
                      placeholder={cageId}
                      readOnly
                      width={2}
                    />
                  </Form.Field>
                  <Form.Field width={5}>
                    <label>CAGE NAME</label>
                    <Input
                      name="cageName"
                      value={cageName}
                      onChange={this.handleInputChange}
                    />
                  </Form.Field>
                  <Form.Field width={5}>
                    <label>CAGE SIZE</label>
                    <Input
                      name="cageSize"
                      value={cageSize}
                      onChange={this.handleInputChange}
                    />
                  </Form.Field>
                  <Form.Select
                    width={5}
                    label="Assigned Cage Worker"
                    options={options.updateCageWorker.workerDropdown}
                    name='workerId'
                    value={workerId}
                    onChange={this.handleSelectChange}
                  />
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
              <Header>Modify animal approved food, then submit:</Header>
              <Form>
                <Form.Group >
                  <Form.Field width={2}>
                    <label>Entry ID</label>
                    <Input
                      placeholder={foodEntryId}
                      readOnly
                      width={2}
                    />
                  </Form.Field>
                  <Form.Input
                    fluid label='Animal'
                    placeholder={"Animal ID #" + animalId + ":  " + animalType}
                    readOnly
                    width={5}
                  />
                  <Form.Select
                    width={5}
                    label="Approved Food"
                    options={options.updateApprovedFood.foodDropdown}
                    name='foodId'
                    value={foodId}
                    onChange={this.handleSelectChange}
                  />
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
              <Header>Modify assigned animal worker, then submit:</Header>
              <Form>
                <Form.Group >
                  <Form.Field width={2}>
                    <label>Entry ID</label>
                    <Input
                      placeholder={animalWorkerEntryId}
                      readOnly
                      width={2}
                    />
                  </Form.Field>
                  <Form.Input
                    fluid label='Animal'
                    placeholder={"Animal ID #" + animalId + ":  " + animalType}
                    readOnly
                    width={5}
                  />
                  <Form.Select
                    width={5}
                    label="Assigned Worker"
                    options={options.updateAnimalWorker.workerDropdown}
                    name='workerId'
                    value={workerId}
                    onChange={this.handleSelectChange}
                  />
                </Form.Group>
              </Form>
            </div >
          );
          break;
        }
      case ("workerCage"):
        {
          this.contents = (
            <div className='formContents'>
              <Header>Modify assigned cage worker, then submit:</Header>
              <Form>
                <Form.Group >
                   <Form.Field width={2}>
                    <label>Cage Number</label>
                    <Input
                      placeholder={cageId}
                      readOnly
                      width={2}
                    />
                  </Form.Field>
                  <Form.Input
                    fluid label='Cage Name'
                    placeholder={cageName}
                    readOnly
                    width={5}
                  />
                  <Form.Select
                    width={5}
                    label="Assigned Worker"
                    options={options.updateAnimalWorker.workerDropdown}
                    name='workerId'
                    value={workerId}
                    onChange={this.handleSelectChange}
                  />
                </Form.Group>
              </Form>
            </div >
          );
          break;
        }
      default: return;
    }
    this.setState({ open: true });
  }

  componentDidMount() {
    this.setState({
      searchSelect: this.props.select,
      searchValue: this.props.id,
      searchAttributeSelect: this.props.idName
    }, () => this.getInitialData());
  }

  render() {
    return (
      <div>
        <Modal open={this.state.open} onClose={this.close}>
          <Modal.Header>UPDATE ZOO DATA</Modal.Header>
          <Modal.Content image>
            <Modal.Description>
              {this.contents}
            </Modal.Description>
          </Modal.Content>
          <Modal.Actions>
            <Button color='red' content="CANCEL" onClick={this.close} />
            <Button content="SUBMIT" onClick={this.submit} />
          </Modal.Actions>
        </Modal>
      </div>
    )
  }
}

export default UpdateForm