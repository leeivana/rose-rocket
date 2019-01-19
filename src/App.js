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
    this.socket = new WebSocket("ws://localhost:3000");
  }
  componentDidMount = () => {
    this.socket.addEventListener("open", event => {
    });
    this.socket.onmessage = this.incoming = event => { 
      const payload = JSON.parse(event.data);
      const { activeLegID, legProgress, previousLegID } = payload; 
      this.setState({
        activeLegID,
        legProgress,
        previousLegID,
      })
    }
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

  updateInfo = (activeLegID, legProgress) => {
    this.setState(previousState => ({
      previousLegID: previousState.activeLegID,
    }))
    this.socket.send(JSON.stringify({
      activeLegID, 
      legProgress,
      previousLegID: this.state.previousLegID
    }));
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
