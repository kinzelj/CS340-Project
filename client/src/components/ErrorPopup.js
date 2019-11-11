import React, { Component } from 'react'
import { Button, Modal } from 'semantic-ui-react'

class ErrorPopup extends Component {
  state = { open: false, message:"" }

  closeConfigShow = (closeOnEscape, closeOnDimmerClick) => () => {
    this.setState({ closeOnEscape, closeOnDimmerClick, open: true })
  }

  open = () => this.setState({ open: true, message: this.props.message})
  close = () => this.setState({ open: false }, () => this.props.closePopup())

  componentDidMount() {
    this.open();
  }

  render() {
    const { message, open, closeOnEscape, closeOnDimmerClick } = this.state

    return (
      <div>
        <Modal
          open={open}
          closeOnEscape={closeOnEscape}
          closeOnDimmerClick={closeOnDimmerClick}
          onClose={this.close}
        >
          <Modal.Header>ERROR!</Modal.Header>
          <Modal.Content>
            <p>{message}</p>
          </Modal.Content>
          <Modal.Actions>
            <Button onClick={this.close} negative>
             OK 
            </Button>
          </Modal.Actions>
        </Modal>
      </div>
    )
  }
}

export default ErrorPopup