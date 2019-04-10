import React, { Component } from 'react';
import {BrowserRouter,Route} from 'react-router-dom';
import './App.css';
import SearchPage from './SearchPage';
import MovieDetailsPage from './MovieDetailsPage';

class App extends Component {

    render() {
        return (
            <div className="App">            
              <BrowserRouter>
                <Route path='/' exact component={SearchPage} />
                <Route path='/movie' component={MovieDetailsPage} />
              </BrowserRouter>
            </div>
        );
    }
}

export default App;
