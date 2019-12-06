import React, { Component } from 'react'
import MainContent from './MainContent.js'
import { Grid, Menu, Segment } from 'semantic-ui-react'
import '../css/SideMenu.css'

/*********************************************************************
 * SideMenu component renders sidebar and main content components
**********************************************************************/
export default class SideMenu extends Component {
  state = { 
    activeContent: "view_items",
    activeItem: 'View Zoo Items',
    clicked: false
  }

  //set state when user clicks side menu option to set which props to pass to MainContent component
  handleItemClick = (setContent, name) => {
    this.setState({ 
      activeContent: setContent,
      activeItem: name,
      clicked: true
    })
  }

  resetClicked = () => {
    this.setState({clicked: false});
  }

  //render side menu and main content component
  render() {
    const { activeItem } = this.state

    return (
      <Grid>
        <Grid.Column width={4}>
          <Menu fluid vertical tabular>
            <Menu.Item
              key="menu-view"
              active={activeItem === 'View Zoo Items'}
              name="View Zoo Items"
              onClick={() => this.handleItemClick("view_items", "View Zoo Items")}
            />
            <Menu.Item
              key="menu-add"
              active={activeItem === 'Add Zoo Item'}
              name="Add Zoo Item"
              onClick={() => this.handleItemClick("add_item", "Add Zoo Item")}
            />
            <Menu.Item
              key="menu-update"
              active={activeItem === 'Update Zoo Item'}
              name="Update Zoo Item"
              onClick={() => this.handleItemClick("update_item", "Update Zoo Item")}
            />
            <Menu.Item
              key="menu-remove"
              active={activeItem === 'Remove Zoo Item'}
              name="Remove Zoo Item"
              onClick={() => this.handleItemClick("remove_item", "Remove Zoo Item")}
            />
            <Menu.Item
              key="menu-search"
              active={activeItem === 'Search Zoo Item'}
              name="Search Zoo Item"
              onClick={() => this.handleItemClick("search_item", "Search Zoo Item")}
            />
          </Menu>
        </Grid.Column>

        <Grid.Column stretched width={12} >
          <Segment className="dataColumn">
            <MainContent content={this.state.activeContent} clicked={this.state.clicked} reset={this.resetClicked} />
          </Segment>
        </Grid.Column>
      </Grid>
    )
  }
}
