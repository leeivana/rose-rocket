import React, { Component } from 'react';
class Stops extends Component {
  render() {
    const { x, y, stopName, cell_size, includes } = this.props;
    const styles = {
      left: `${cell_size * x + 1}px`,
      top: `${cell_size * y + 1}px`,
      width: `${cell_size - 1}px`,
      height: `${cell_size - 1}px`,
      fontWeight: 500,
    }
    return (
      <div>
      {includes && stopName === 'A' ? 
        <div className="Cell show" style={styles} id={stopName}>
          {stopName}
        </div>
            :
        <div className="Cell" style={styles} id={stopName}>
          {stopName}
        </div>
      }
      </div>
    );
  }
}

export default Stops;