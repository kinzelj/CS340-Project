import React, { Component } from 'react'
import { Button, Header, Image, Modal, Form, Input } from 'semantic-ui-react'
import * as ServerCall from '../scripts/ServerCall.js'

class UpdateForm extends Component {
  state = { open: true }

  close = () => this.setState({ open: false }, () => this.props.closePopup())
  submit = () => {
    this.setState({ open: false }, () => this.props.closePopup())
  }

  render() {
    console.log(this.props);
    const { open } = this.state

    return (
      <div>
        <Modal open={open} onClose={this.close}>
          <Modal.Header>POPUP HEADER</Modal.Header>
          <Modal.Content image>
            <Modal.Description>
              <Header>CONTENT HEADER</Header>
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
//   <Form>
//     <Form.Group widths='equal'>
//       <Form.Field>
//         <label>First name</label>
//         <Input fluid placeholder='First name' />
//       </Form.Field>
//       <Form.Field>
//         <label>Middle name</label>
//         <Input fluid placeholder='Middle name' />
//       </Form.Field>
//       <Form.Field>
//         <label>Last name</label>
//         <Input fluid placeholder='Last name' />
//       </Form.Field>
//     </Form.Group>
//   </Form>
// )
