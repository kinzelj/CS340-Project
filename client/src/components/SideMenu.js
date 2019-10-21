import React, { Component } from 'react'
import ColumnContent from './ColumnContent.js'
import { Grid, Menu, Segment } from 'semantic-ui-react'

export default class SideMenu extends Component {
  state = { 
    activeItem: 'View Zoo Items',
    activeContent: "view_items"
  }

  handleItemClick = (setContent, name) => {
    this.setState({ 
      activeContent: setContent,
      activeItem: name 
    })
  }
  
  render() {
    const { activeItem } = this.state

    return (
      <Grid>
        <Grid.Column width={4}>
          <Menu fluid vertical tabular>
            <Menu.Item
              active={activeItem === 'View Zoo Items'}
              name="View Zoo Items"
              onClick={() => this.handleItemClick("view_items", "View Zoo Items")}
            />
            <Menu.Item
              active={activeItem === 'Add Zoo Item'}
              name="Add Zoo Item"
              onClick={() => this.handleItemClick("add_item", "Add Zoo Item")}
            />
            <Menu.Item
              active={activeItem === 'Update Zoo Item'}
              name="Update Zoo Item"
              onClick={() => this.handleItemClick("update_item", "Update Zoo Item")}
            />
            <Menu.Item
              active={activeItem === 'Remove Zoo Item'}
              name="Remove Zoo Item"
              onClick={() => this.handleItemClick("remove_item", "Remove Zoo Item")}
            />
          </Menu>
        </Grid.Column>

        <Grid.Column stretched width={12}>
          <Segment>
            <ColumnContent content={this.state.activeContent} />
          </Segment>
        </Grid.Column>
      </Grid>
    )
  }
}
