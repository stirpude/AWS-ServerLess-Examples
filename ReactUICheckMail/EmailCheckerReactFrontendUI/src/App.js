import React, { Component } from 'react';

import GetTable from './components/GetTable'
import UserPost from './UserPost'
import './App.css';



class App extends Component {
  render() {
    return (
      <div className="App">
      <h2>Shruti Microservice Email Checker</h2>
        <UserPost />

      </div>
    );
  }
}

export default App;
