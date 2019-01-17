import React, { Component } from 'react';
import './App.css';
import Board from './components/Board';
import Selector from './components/Selector';
class App extends Component {
  constructor(){
    super();
    this.state = {
      stops: [],
      legs: [],
      activeLegID: '',
      previousLegID: '',
      legProgress: '',
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
      legs: legs.legData.legData, 
      stops: stops.stopData.stopData,
      activeLegID: driver.driverData.driverData[0].activeLegID,
      legProgress: parseInt(driver.driverData.driverData[0].legProgress)/100,
      fetching: false,
    }))
    .catch(err => console.warn('Error:', err));
  }

  shouldComponentUpdate = () => {
    console.log('hi');
    return true;
  }

  updateInfo = (activeLegID, legProgress) => {
    console.log('activeLegID', activeLegID);
    console.log('legProgress', legProgress);
    this.setState(previousState => ({
      activeLegID,
      previousLegID: previousState.activeLegID,
    }))
  }

  render() {
    const { stops, fetching, activeLegID, legProgress, legs } = this.state;
    return (
      fetching ? 
      <div>LOADING</div>
      :
      <div style={{display: 'flex'}}>
        <Board 
          stops={stops}
          legID={activeLegID}
          legProgress={legProgress}
          fetching={fetching}
        />
        {legs && 
          <Selector 
            items={legs.map(leg => (leg.legID))}
            currentId={activeLegID}
            currentPercentage={legProgress}
            updateInfo={this.updateInfo}
          />
        }

      </div>
    );
  }
}

export default App;
