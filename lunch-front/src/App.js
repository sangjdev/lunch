import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Gallery from './components/galleryContainer';
import './styles/gallery.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <Switch>
            <Route path="/" exact component={Gallery} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
