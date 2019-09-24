import React from 'react';
import './Search.css';

class Search extends React.Component {

  constructor () {
    super();
    this.state = {
      query: null,
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.callback(this.state.query);
  }

  handleInputChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    })
  }

  render = () => {
    return (
      <form 
        className="App-header"
        onSubmit={this.handleSubmit}>
        <label htmlFor="Search">Search for clothes</label>
    
        <input 
        type="text" 
        name="query" id="" 
        className="Search Input"
        onChange={this.handleInputChange}
        />
        
        <button type="submit" className="Button" > 
            Search
        </button>
      </form>
    );
  }
}

export default Search;
