import React, { Component } from 'react';
import Cell from './Cell';
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
    cells: [],
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
      cells: stops.stopData.stopData,
      driver: driver.driverData.driverData,
      fetching: false,
    }))
    .catch(err => console.warn('Error:', err))
  }

  makeEmptyBoard() {
    let board = [];
    for (let y = 0; y < this.rows; y++) {
      board[y] = [];
      for (let x = 0; x < this.cols; x++) {
        board[y][x] = false;
      }
    }
    return board;
  }
  makeCells() {
    let cells = [];
    for (let y = 0; y < this.rows; y++) {
      for (let x = 0; x < this.cols; x++) {
        if (this.board[y][x]) {
          cells.push({ x, y });
        }
      }
    }
    return cells;
  }

  render() {
    const { cells, fetching } = this.state;
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
          {cells.map(cell => (
            <Cell x={cell.x} y={cell.y}
              key={cell.name}
              stopName={cell.name}
              cell_size={CELL_SIZE}
            />
          ))}
        </div>
        
      </div>
    );
  }
}
export default Board;