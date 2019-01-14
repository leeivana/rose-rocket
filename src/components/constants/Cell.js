import React, { Component } from 'react';

class Cell extends Component {
  render() {
    const { x, y, stopName, cell_size } = this.props;
    return (
      <div data-before={stopName} className="Cell" style={{
        left: `${cell_size * x + 1}px`,
        top: `${cell_size * y + 1}px`,
        width: `${cell_size - 1}px`,
        height: `${cell_size - 1}px`,
      }} />
    );
  }
}

export default Cell;