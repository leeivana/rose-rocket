import React, { Component } from 'react'; 
import './Selector.css';
class Selector extends Component {
  constructor(props) {
    super(props);
    this.state = {
      legID: this.props.currentId,
      percentage: '',
    };
  }

  handleChange = (event) => {
    this.setState({
      legID: event.target.value, 
    })
  }

  handleInputChange = (event) => {
    this.setState({percentage: event.target.value})
  }

  handleSubmit = (event) => {
    if(!this.state.percentage) {
      this.props.updateInfo(this.state.legID, 0);
    }
    this.props.updateInfo(this.state.legID, (this.state.percentage / 100));
    event.preventDefault();
  }

  render() {
    const { items } = this.props;
    return (
      <div className="selector-container">
        <form className="form-group" onSubmit={this.handleSubmit}>
          <select value={this.state.legID} onChange={this.handleChange}>
            {items.map(item => (
              <option key={item} value={item}>{item}</option>
            ))}
          </select>
          {this.state.value &&
            <p>Selected Id {this.state.value}</p>
          }
          <label htmlFor="inp" className="inp">
          <input 
            type="text" 
            value={this.state.percentage} 
            placeholder="Enter leg progress %" 
            onChange={this.handleInputChange}
            id="inp"
          />
          </label>
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

export default Selector;