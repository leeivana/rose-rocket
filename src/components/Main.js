import React, { Component } from 'react'; 
import { Button } from 'reactstrap';
import Table from './constants/Table';

class MainPage extends Component {
  constructor(props){
    super(props)
    this.state = {
      fetching: false,
      haveData: false,
      data: '', 
    }
  }

  fetchData = (endpoint) => {
    this.setState({fetching: true});
    const url = `http://localhost:3000/${endpoint}`;
    fetch(url)
    .then(response => response.json())
    .then(data => {
      this.setState({
        fetching: false,
        haveData: true,
        data
      })
      console.log('state', this.state.data);
    })
    .catch(err => console.warn('Error:', err));
  }

  handleReset = () => {
    this.setState({
        fetching: false,
        haveData: false
    })
  }
  
  render(){
    const { haveData, fetching, data } = this.state;
    return(
      haveData || fetching ? 
      <Table 
        fetching={fetching}
        reset={this.handleReset}
        data={data} 
      />
      :
      <div>
        <Button
          onClick={()=> {
            this.fetchData('legs')
          }}
        >Get Legs
        </Button>
      </div>
    )
  }
}

export default MainPage;


