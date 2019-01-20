import React, { Component } from 'react';
import Stops from './Stops';
import Path from './Path';
import CurrentCell from './CurrentCell';
import './Board.css';

const CELL_SIZE = window.innerHeight/103;
const WIDTH = window.innerWidth/3;
const HEIGHT = window.innerHeight;
class Board extends Component {
  constructor(props) {
    super(props);
    this.rows = HEIGHT / CELL_SIZE;
    this.cols = WIDTH / CELL_SIZE;
    this.board = this.makeEmptyBoard();
    this.state = {
      path: [],
      pathTraversed: [],
    }
  }

  componentDidMount = () => {
    if(!this.props.fetching && this.props.legID){
      this.calculatePath(this.props.legID)
    }
  }

  componentDidUpdate = (prevProps) => {
    if (this.props.legID !== prevProps.legID || this.props.legProgress !== prevProps.legProgress) {
      this.calculatePath(this.props.legID)
    }
  }

  calculatePath = (legID) => {
    const stops = legID.split('');
    const coordinates = this.props.stops.filter((stop) => {
      return stop.name === stops[0] || stop.name === stops[1]
    });
    const xDifference = Math.abs(coordinates[0].x - coordinates[1].x)
    const yDifference = Math.abs(coordinates[0].y - coordinates[1].y);
    this.setPaths(coordinates, xDifference, yDifference);
  }

  setPaths = (coordinates, xDifference, yDifference) => {
    const pathTraversed = [];
    const startStop = coordinates[0];
    const endStop = coordinates[1];
    let cellsTraversed = Math.ceil((xDifference + yDifference) * this.props.legProgress);
    for(let i = 1; i <= xDifference; i++) {
      coordinates.push({
        x: startStop.x > endStop.x ? startStop.x - i : startStop.x + i , y: startStop.y
      })
      if(cellsTraversed !== 0) {
        pathTraversed.push({
          x: startStop.x > endStop.x ? startStop.x - i : startStop.x + i, y: startStop.y
        })
        cellsTraversed --;
      }
    }
    for(let i = 1; i < yDifference; i++) {
      coordinates.push({
        x: coordinates[coordinates.length - 1].x, y: startStop.y > endStop.y ?  startStop.y - i : startStop.y + i
      })
      if(cellsTraversed !== 0){
        pathTraversed.push({
          x: coordinates[coordinates.length - 1].x, y: startStop.y > endStop.y ?  startStop.y - i : startStop.y + i
        })
        cellsTraversed --;
      }
    }
    this.setState({
      path: coordinates,
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
    const { path, pathTraversed } = this.state;
    const { stops } = this.props;

    return (
      <div>
        <div className="Board"
          style={{ width: WIDTH, height: HEIGHT,
            backgroundSize: `${CELL_SIZE}px ${CELL_SIZE}px`}}
          ref={(n) => { this.boardRef = n; }}
          
        >
        {stops.map(stop => (
          <Stops x={stop.x} y={stop.y}
            key={`${stop.name}, ${stop.x}, ${stop.y}`}
            stopName={stop.name}
            cell_size={CELL_SIZE}
          />
        ))}
        {path.map((point, i) => (
            <Path x={point.x} y={point.y}
              key={`path, ${point.x}, ${point.y}, ${i}`}
              cell_size={CELL_SIZE}
            />
          ))
        }
        {pathTraversed.map((cells, i) => (
          <CurrentCell x={cells.x} y={cells.y}
            key={`cells, ${cells.x}, ${cells.y}, ${i}`}
            cell_size={CELL_SIZE}
          />
        ))}
        </div>
      </div>
    );
  }
}
export default Board;