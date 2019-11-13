import React, { Component } from 'react'
import { Button, Header, Image, Modal, Form, Input } from 'semantic-ui-react'
import * as ServerCall from '../scripts/ServerCall.js'
import { Server } from 'http'

const options = {
  updateAnimal: {
    key: "dk-updateAnimal",
    cageDropDown: [{key: ""}]
  }
}

class UpdateForm extends Component {
  state = { 
    open: false, 
    searchSelect: "", 
    searchAttributeSelect: "", 
    searchValue: "", 
    
    //add animal
    animalId: "",
    animalType: "",
    animalCage: "",
    
    //add worker
    workerId: "",
    workerFirst: "",
    workerLast: "",
    workerPosition: ""
  }

  contents = null;

  close = () => this.setState({ open: false }, () => this.props.closePopup())

  submit = () => {
    console.log(this.state);
    this.setState({ open: false }, () => this.props.closePopup())
  }
  
  getKey = (object, value) => {
      return Object.keys(object).find(key => object[key] === value);
  }
  
  handleSelectChange = (e, { name, value }) => {
      this.setState({ [name]: value }, () => this.showContents());
  }
  
  getInitialData() {
    ServerCall.searchData(this.state)
      .then(res => {
      	this.setState({dbData: res[0]})
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
        default: return;
      }
       })
    	.catch(err => console.log(err));
  }

  showContents() {
    console.log(this.state);
    switch (this.state.searchSelect) {
      		case ("animal"):
          	{
              this.contents= (
                <div className='formContents'>
                  <Header>Modify animal data, then submit:</Header>
                  <Form>
                    <Form.Group >
                      <Form.Input 
                				fluid label='Animal ID' 
                				placeholder={this.state.animalId} 
                				readOnly 
                				width={2} /> 
                      <Form.Field width={5}>
                        <label>Animal Type</label>
                        <Input value={this.state.animalType} />
                      </Form.Field>
                      <Form.Select
                				width = {5}
                        label = "Animal Assigned Cage"
                        options={options.updateAnimal.cageDropdown}
                        name='animalCage'
                        value={this.state.animalCage}
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
              this.contents= (
                <div className='formContents'>
                  <Header>Modify worker data, then submit:</Header>
                  <Form>
                    <Form.Group >
                      <Form.Input 
                				fluid label='Worker ID' 
                				placeholder={this.state.workerId} 
                				readOnly 
                				width={2} 
                			/> 
                      <Form.Field width={5}>
                        <label>Worker First Name</label>
                        <Input value={this.state.workerFirst} />
                      </Form.Field>
                      <Form.Field width={5}>
                        <label>Worker Last Name</label>
                        <Input value={this.state.workerLast} />
                      </Form.Field>
                      <Form.Field width={5}>
                        <label>Worker Position</label>
                        <Input value={this.state.workerPosition} />
                      </Form.Field>
                    </Form.Group>
                  </Form>
                </div>
              );
              break;
            }
        default: return;
      }
    this.setState({open: true});
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


// const FormExampleEvenlyDividedGroup = () => (

// )
