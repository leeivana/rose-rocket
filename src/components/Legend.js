import React from 'react';
import './Legend.scss';

const Legend = () => {
  return(
    <div className="legend-container">
      <h3 className="header">Legend</h3>
      <p className="legend"><span className="path path-general"></span> Path </p>
      <p className="legend"><span className="path path-traversed"></span> Path Traversed </p>
    </div>
  )
}

export default Legend; 