import React, { Component } from 'react';
import './App.css';
import MainPage from './components/Main';
import Selector from './components/Selector';


class App extends Component {
  render() {
    return (
      <div className="App">
        <MainPage />
        <Selector />
      </div>
    );
  }
}

export default App;
