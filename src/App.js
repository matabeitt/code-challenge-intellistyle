import React from 'react';
import Search from './component/Search';
import ItemList from './component/ItemList';
import './App.css';

class App extends React.Component {
  constructor () {
    super();
    this.state = {
      query: null,
    };
  };

  /**
   * Set the query used by this module to conditionally 
   * render the search or list component of the SPA.
   */
  setQuery = (q) => {
    this.setState({
      query: q,
    });
  };

  render = () => {
    return (
      <div className="App">
        <div>
          {
            this.state.query === null ?
            <Search callback={this.setQuery.bind(this)}/>
            :
            <ItemList 
            reset={this.setQuery}
            query={this.state.query}/>
            
          }
        </div>
      </div>
    );
  };
};

export default App;
