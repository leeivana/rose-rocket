import React, { Component } from 'react'; 
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
    console.log('submitted');
    event.preventDefault();
  }

  render() {
    const { items } = this.props;
    return (
      <div className="selector-container">
        <form onSubmit={this.handleSubmit}>
          <select value={this.state.legID} onChange={this.handleChange}>
            {items.map(item => (
              <option key={item} value={item}>{item}</option>
            ))}
          </select>
          {this.state.value &&
            <p>Selected Id {this.state.value}</p>
          }
          <input 
            type="text" 
            value={this.state.percentage} 
            placeholder="Enter leg percentage" 
            onChange={this.handleInputChange}
          />
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

export default Selector;