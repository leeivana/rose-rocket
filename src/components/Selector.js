import React, { Component } from 'react'; 
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
class Selector extends React.Component {
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
  }

  render() {
    const { items } = this.props;
    return (
      <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle} onChange={this.handleChange}>
        <DropdownToggle caret>
          Select Leg ID
        </DropdownToggle>
        <DropdownMenu>
          {items.map(item => (
            <DropdownItem key={item} value={item}>
              {item}
            </DropdownItem>
          ))}
        </DropdownMenu>
      </Dropdown>
    );
  }
}

export default Selector;