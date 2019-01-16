import React, { Component } from 'react'; 
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
class Selector extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dropdownOpen: false,
      value: '',
    };
  }

  toggle = () => {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  }

  handleChange = (event) => {
    this.setState({
      value: event.target.value, 
    })
    console.log(this.state.value);
  }

  render() {
    const { items } = this.props;
    return (
      <div className="selector-container">
      <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
        <DropdownToggle caret>
          Select Leg ID
        </DropdownToggle>
        <DropdownMenu value={this.state.value} onChange={this.handleChange}>
          {items.map(item => (
            <DropdownItem key={item} value={item}>
              {item}
            </DropdownItem>
          ))}
        </DropdownMenu>
      </Dropdown>
      {this.state.value &&
      <p>Selected Id {this.state.value}</p>
      }
      <input type="text" placeholder="Enter leg percentage"></input>
      </div>
    );
  }
}

export default Selector;