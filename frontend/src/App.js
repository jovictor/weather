import React, { Component, Children } from 'react';
import WeatherBar from "./components/WeatherBar"


class App extends Component {

  render() {
    return (
      <div className="App">
        <WeatherBar name="Walter Weather" search={true}/>
      </div>
    );
  }
}

export default App;
