import React, { Component } from 'react'; 
import { Button } from 'reactstrap';
import { Form, FormGroup, Label, Input, FormFeedback, FormText } from 'reactstrap';

import './Selector.scss';
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
      <div className="select animated zoomIn">
        <form className="form-group" onSubmit={this.handleSubmit}>
        <Label>Leg ID: </Label>
          <div className="selector-container">
            <select value={this.state.legID} onChange={this.handleChange}>
              {items.map(item => (
                <option key={item} value={item}>{item}</option>
              ))}
            </select>
          </div>

          {this.state.value &&
            <p>Selected Id {this.state.value}</p>
          }
          <Label for="inp">Leg Progress: </Label>
          <Input
            value={this.state.percentage} 
            onChange={this.handleInputChange}
            id="inp"
            pattern="^(?:100|[1-9]?[0-9])$"
          />
          <FormFeedback>Oh noes! that name is already taken</FormFeedback>
          <FormText>Enter a number between 1-100</FormText>
          <Button type="submit" value="Submit" outline color="secondary">Submit</Button>{' '}
        </form>
      </div>
    );
  }
}

export default Selector;