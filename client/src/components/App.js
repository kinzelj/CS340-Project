import React, { Component } from 'react';
import SideMenu from './SideMenu.js';
import '../css/App.css';

class App extends Component {
  render() {
    return (
      <div className="main-div">
        <h2 className="ui block header" id="top-border" style={{marginTop: "20px"}}>Zoo Management Database</h2>
       <SideMenu /> 
      </div>
    );
  }
}

export default App;
