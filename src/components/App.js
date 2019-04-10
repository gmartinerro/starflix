import React, { Component } from 'react';
import {BrowserRouter,Route} from 'react-router-dom';
import './App.css';
import SearchPage from './pages/SearchPage';
import MovieDetailsPage from './pages/MovieDetailsPage';

/**
 * Main Application class component.
 * It just wraps up the application pages using the BrowserRouter component.
 */
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
