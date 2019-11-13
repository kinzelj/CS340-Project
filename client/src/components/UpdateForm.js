import React, { Component } from 'react'
import { Button, Header, Image, Modal, Form, Input } from 'semantic-ui-react'
import * as ServerCall from '../scripts/ServerCall.js'
import { Server } from 'http'

class UpdateForm extends Component {
  state = { open: false, searchSelect: "", searchAttributeSelect: "", searchValue: "" }

  contents = null;

  close = () => this.setState({ open: false }, () => this.props.closePopup())

  submit = () => {
    this.setState({ open: false }, () => this.props.closePopup())
  }

  formContents() {
    ServerCall.searchData(this.state)
      .then(res => {
        switch (this.state.searchSelect) {
          case ("animal"):
            {
              this.contents= (<div>{res[0]["ANIMAL TYPE"]}</div>);
              this.setState(this.state);
            }
          default: return;
        }
      })
      .catch(err => console.log(err));
      console.log("test");
  }

  // getContents() {
  //   this.forumContents()
  //   .then(res => console.log(res));
  //   this.setState({ contents: newContents })
  // }

  componentDidMount() {
    this.setState({
      open: true,
      searchSelect: this.props.select,
      searchValue: this.props.id,
      searchAttributeSelect: this.props.idName
    }, () => this.formContents());
  }

  render() {
    return (
      <div>
        <Modal open={this.state.open} onClose={this.close}>
          <Modal.Header>POPUP HEADER</Modal.Header>
          <Modal.Content image>
            <Modal.Description>
              <Header>CONTENT HEADER</Header>
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
