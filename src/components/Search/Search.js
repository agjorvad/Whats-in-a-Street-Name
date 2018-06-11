import React, { Component } from 'react'
import axios from 'axios'
import Suggestions from '../Suggestions/Suggestions'

class Search extends Component {
  state = {
    query: '',
    results: []
  }

  getInfo = () => {
    axios.get('/api/street')
      .then(response => {
        console.log(response.data);
        this.setState({
          results: response.data,
        })
        console.log(this.state.results)
      })
      .catch((error) => {
        console.log('error on get: ', error);
      })
    }

  handleInputChange = () => {
    this.setState({
      query: this.search.value
    }, () => {
      if (this.state.query && this.state.query.length > 1) {
        if (this.state.query.length % 2 === 0) {
          this.getInfo()
        }
      } else if (!this.state.query) {
      }
    })
  }

  handleSubmit = (event) => {
    event.preventDefault();
    console.log(this.state.results);
  }

  render() {
    return (
      <div>
        <input
          placeholder="Search for..."
          ref={input => this.search = input}
          onChange={this.handleInputChange} />
        <Suggestions results={this.state.results} />
        </div>
    )
  }
}

export default Search