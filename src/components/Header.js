import React, { Component } from 'react';
import './Header.css';
import swapi from '../apis/swapi';
import SearchBar from './SearchBar';
import {connect} from 'react-redux';
import {setCurrentMovie} from '../actions';

/**
 * The Header component showing STAR WARS logo and a SearchBar component
 */
class Header extends Component {
    constructor(props) {
        super(props);
        this.state = { term: '' };
    }

    /**
     * This callback is called when the user clicks the "BUSCAR PELICULA" button
     * TODO: For the sake of simetry and order, convert this operation into a redux action
     * @param string searchTerm The search term to use for searching movies in swapi
     */
    async onSearch(searchTerm) {
        this.setState({ term: searchTerm , suggestions:null});
        const response = await swapi.get('films/', { params: { search: searchTerm } });

        if (response.data.results.length > 0)
            this.setState({term: searchTerm, suggestions:response.data.results})
        else
            this.setState({term: searchTerm, suggestions:[]})
    }

    /**
     * This callback is called when the user actually selects a movie among the suggested ones.
     * TODO: For the sake of simetry and order, convert this operation into a redux action
     * @param {*} movie The selected movie object
     */
    onMovieSelection(movie){
        movie.year = movie.release_date.substring(0,4);
        movie.summary = movie.opening_crawl.replace('\r\n',' ');
        this.props.onSearch(movie);        
        this.setState({term:this.state.term,suggestions:null})
        this.props.setCurrentMovie(movie);
    }

    render() {
        return (
            <div className="Header">
                <div className='app-logo'>
                    <img src='/star_wars_logo.png' height='40px' alt='logo'/>
                </div>
                <div className="search-bar">
                    <SearchBar onSearch={term => this.onSearch(term)} />
                </div>
                <div className='suggestions'>
                    <ul>{this.renderSuggestions()}</ul>
                </div>
            </div>
        );
    }

    /**
     * Sub.rendering method showin the possible movies to be selected after the current search term
     */
    renderSuggestions(){
        if (this.state.suggestions){
            if(this.state.suggestions[0] != null)
                return this.state.suggestions.map(suggestion=>{
                    return (<li className='valid-suggestion' key={suggestion.episode_id} onClick={(e)=>this.onMovieSelection(suggestion)}>{suggestion.title}</li>);
                })
            else{
                return (<li key='error' className='no-suggestions'>Sin resultados!</li>)
            }
        }
        else{
            return '';
        }
    }    
}

export default connect(null,{setCurrentMovie})(Header);
