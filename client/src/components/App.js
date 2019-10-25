import React, { Component } from 'react';
import SideMenu from './SideMenu.js';
import axios from 'axios';
import '../css/App.css';

class App extends Component {

  callServer = async () => {
    const options = {
      method: 'GET',
      url: '/test_server',
    }
    const response = await axios(options);
    const responseData = await response.data;

    if (response && response.status === 200 && response.statusText === 'OK') {
      return responseData;
    }
    else Error(responseData.message);
  };

  componentDidMount() {
    this.callServer()
      .then(res => {
        console.log(res);
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div className="main-div">
        <h2 className="ui block header" id="top-border" style={{ marginTop: "20px" }}>Zoo Management Database</h2>
        <SideMenu />
      </div>
    );
  }
}

export default App;
