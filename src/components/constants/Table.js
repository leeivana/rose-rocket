import React from 'react';

const Table = ({
  fetching,
  data,
  reset
}) => (
  fetching ?
  <p>Loading...</p> :
  <div>
    <table>
      <tbody>
        <tr>
          <td>ID</td><td>Start</td><td>Stop</td><td>Speed</td>
        </tr>
        {data.legData.legData.map(value => <tr key={value.legID}><td>{value.legID}</td><td>{value.startStop}</td><td>{value.endStop}</td><td>{value.speedLimit}</td></tr>)}
      </tbody>
    </table>
    <p>Data</p>
    <button type='button' onClick={reset}>Search Again</button>
  </div>
);

export default Table;
