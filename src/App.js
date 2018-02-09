import React, { Component } from 'react';
import './App.css';
import key from './key.js'

import axios from 'axios';
import $ from 'jquery';

import Search from './components/Search.js'
import Result from './components/Result.js'
import RecHeader from './components/RecHeader.js'



class App extends Component {
  constructor() {
    super();

    this.state = {
      data: [],
      searchString: '',
      type: ''
    }

    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleType = this.handleType.bind(this);
  }

  handleClick() {
    let type = (this.state.type !== '' ? `type=${this.state.type}&` : '')
    console.log(type);

    $.ajax({url:`https://tastedive.com/api/similar?q=${this.state.searchString}&limit=4&${type}k=${key}`, 
    type: 'GET', 
    dataType: 'jsonp',
    success: (res) => {
      console.log(res.Similar.Results);
      this.setState({ data: res.Similar.Results})
    }})
  }

  handleSearchChange(val) {
    this.setState({ searchString: val })
  }

  handleType(val) {
    console.log(val);
    this.setState({ type: (val === 'all' ? '' : val)})
  }


  render() {
    const results = this.state.data.map((item, idx) => {
      return (
        <div key={idx}>
          <Result name={item.Name} type={item.Type}/>
        </div>
      )
    })

    const addRec = <RecHeader />;


    return (
      <div className="App">
        <Search handleType={this.handleType} 
                handleClick={this.handleClick}
                handleSearchChange={this.handleSearchChange} /> 

          { 
            this.state.data.length > 1 
            ?
             [...results, addRec]
            
            : 
            null
          } 

      </div>
    );
  }
}

export default App;
