import React from 'react';
import Search from './component/Search';

import './App.css';

class App extends React.Component {
  constructor () {
    super();
    this.state = {
      query: null,
    };
  }

  setQuery = (q) => {
    if (q === null) return;
    this.setState({
      query: q,
    });
  }

  render = () => {
    return (
      <div className="App">
        

        <div>
          {
            this.state.query === null ?
            <Search callback={this.setQuery.bind(this)}/>
            :
            <p> { this.state.query }</p>
          }
        </div>

      </div>

    )
  }
}

export default App;
