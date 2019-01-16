import React, { Component } from 'react';
import Stops from './Stops';
import Path from './Path';
import CurrentCell from './CurrentCell';
import './Board.css';

const CELL_SIZE = window.innerHeight/105;
const WIDTH = window.innerWidth/2;
const HEIGHT = window.innerHeight;
class Board extends Component {
  constructor(props) {
    super(props);
    this.rows = HEIGHT / CELL_SIZE;
    this.cols = WIDTH / CELL_SIZE;
    this.board = this.makeEmptyBoard();
  }
  state = {
    stops: [],
    path: [],
    pathTraversed: [],
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
    .then(() => {
      this.calculatePath(this.state.activeLegID);
    })
    .catch(err => console.warn('Error:', err));
  }

  calculatePath = (legID) => {
    const stops = legID.split('');
    const coordinates = this.state.stops.filter((stop) => {
      return stop.name === stops[0] || stop.name === stops[1]
    });
    const xDifference = Math.abs(coordinates[0].x - coordinates[1].x)
    const yDifference = Math.abs(coordinates[0].y - coordinates[1].y);
    this.setPaths(coordinates, xDifference, yDifference, stops[0], stops[1]);
  }

  setPaths = (coordinates, xDifference, yDifference, startStop, endStop) => {
    console.log(coordinates);
    const path = [];
    const pathTraversed = [];
    const yExceptions = ['A', 'B', 'C', 'D', 'E'];
    const xExceptions = ['H', 'I', 'J', 'K', 'L'];
    let cellsTraversed = Math.ceil((xDifference + yDifference) * this.state.legProgress);
    if(xDifference){
      for(let i = 1; i <= xDifference; i++) {
        path.push({
          x: xExceptions.includes(coordinates[0].name) ? coordinates[0].x - i : coordinates[0].x + i, y: coordinates[0].y,
        })
        console.log('path', path);
        if(cellsTraversed !== 0){
          pathTraversed.push({
            x: xExceptions.includes(coordinates[0].name) ? coordinates[0].x - i : coordinates[0].x + i, y: coordinates[0].y,
          })
          cellsTraversed--;
        }
      }
    }
    if(yDifference){
      coordinates.sort((a, b) =>  a.y - b.y);
      for(let i = 1; i < yDifference; i++) {
        path.push({
          x: xDifference ? path[path.length - 1].x : coordinates[0].x , y: coordinates[0].y + i
        })
        if(cellsTraversed !== 0){
          pathTraversed.push({
            x: xDifference ? path[path.length - 1].x : coordinates[0].x , y: yExceptions.includes(coordinates[0].name) ? coordinates[0].y + i : coordinates[1].y - i
          })
          cellsTraversed--;
        }
      }
    }

    this.setState({
      path,
      pathTraversed,
    })
  }

  makeEmptyBoard = () => {
    let board = [];
    for (let y = 0; y < this.rows; y++) {
      board[y] = [];
      for (let x = 0; x < this.cols; x++) {
        board[y][x] = false;
      }
    }
    return board;
  }

  render() {
    const { stops, fetching, path, pathTraversed } = this.state;
    return (
      fetching ? 
      <div>LOADING...</div>
      :
      <div>
        <div className="Board"
          style={{ width: WIDTH, height: HEIGHT,
            backgroundSize: `${CELL_SIZE}px ${CELL_SIZE}px`}}
          ref={(n) => { this.boardRef = n; }}
        >
          {stops.map(stop => (
            <Stops x={stop.x} y={stop.y}
              key={stop.name}
              stopName={stop.name}
              cell_size={CELL_SIZE}
            />
          ))}
          {path.map(point => (
              <Path x={point.x} y={point.y}
                key={`${point.x}, ${point.y}`}
                cell_size={CELL_SIZE}
              />
            ))
          }
          {pathTraversed.map(cells => (
            <CurrentCell x={cells.x} y={cells.y}
            key={`cells, ${cells.x}, ${cells.y}`}
            cell_size={CELL_SIZE}
          />
          )) 
          }
        </div>
      </div>
    );
  }
}
export default Board;