import React, { Component } from 'react';
import SideMenu from './SideMenu.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaw } from '@fortawesome/free-solid-svg-icons'
import '../css/App.css';

class App extends Component {
  render() {
    return (
      <div className="main-div">
        <h2 className="ui block header" id="top-border" style={{ marginTop: "20px" }}>
          <FontAwesomeIcon icon={faPaw} style={{ width: "25px", height: "25px", border: "1px solid white", borderRadius: "3px"}}/> Zoo Management Database</h2>
        <SideMenu />
      </div>
    );
  }
}

export default App;
