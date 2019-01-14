import React, { Component } from 'react'; 

class MainPage extends Component {
  constructor(props){
    super(props)
    this.state = {
      fetching: false,
      haveData: false,
      legs: '',
      stops: '', 
    }
  }

  componentDidMount = () => {
    this.setState({fetching: true});
    Promise.all([
      fetch('http://localhost:3000/legs'),
      fetch('http://localhost:3000/stops')
    ])
    .then(([res1, res2]) => Promise.all([res1.json(), res2.json()]))
    .then(([legs, stops]) => this.setState({
      legs, 
      stops,
      fetching: false,
      haveData: true,
    })
    .catch(err => console.warn('Error:', err));
  }
  render(){
    const { haveData, fetching, data } = this.state;
    return(
      <div>
        LANDING PAGE
      </div>
    )
  }
}

export default MainPage;


