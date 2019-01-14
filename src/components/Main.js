import React, { Component } from 'react'; 
import Board from './constants/Board';
class MainPage extends Component {
  constructor(props){
    super(props)
    this.state = {
      fetching: false,
      haveData: false,
      legs: '',
      stops: '', 
      driver: '',
    }
  }

  componentDidMount = () => {
    this.setState({fetching: true});
    Promise.all([
      fetch('http://localhost:3000/legs'),
      fetch('http://localhost:3000/stops'),
      fetch('http://localhost:3000/driver')
    ])
    .then(([res1, res2, res3]) => Promise.all([res1.json(), res2.json(), res3.json()]))
    .then(([legs, stops, driver]) => this.setState({
      legs, 
      stops,
      driver,
      fetching: false,
      haveData: true,
    }))
    .catch(err => console.warn('Error:', err))
  }
  render(){
    const { haveData, fetching, data } = this.state;
    return(
      <div>
        <Board />
      </div>
    )
  }
}

export default MainPage;


