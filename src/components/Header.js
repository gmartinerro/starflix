import React, { Component } from 'react';
import axios from 'axios';
import SearchBar from './SearchBar';
import {connect} from 'react-redux';
import {setCurrentMovie} from '../actions';


class Header extends Component {
    constructor(props) {
        super(props);
        this.state = { text: 'Click Me' };
    }

    async onSearch(searchTerm) {
        this.setState({ text: searchTerm , suggestions:null});
        const response = await axios.get('https://swapi.co/api/films/', { params: { search: searchTerm } });

        if (response.data.results.length > 0)
            this.setState({term: searchTerm, suggestions:response.data.results})
        else
            this.setState({term: searchTerm, suggestions:[]})
    }

    onMovieSelection(movie){
        movie.year = movie.release_date.substring(0,4);
        movie.summary = movie.opening_crawl.replace('\r\n',' ');
        this.props.onSearch(movie);        
        this.setState({term:this.state.term,suggestions:null})
        this.props.setCurrentMovie(movie);
    }

    renderSuggestions(){
        if (this.state.suggestions){
            if(this.state.suggestions[0] != null)
                return this.state.suggestions.map(suggestion=>{
                    return (<li key={suggestion.episode_id} onClick={(e)=>this.onMovieSelection(suggestion)}>{suggestion.title}</li>);
                })
            else{
                return (<li key='error' className='empty-suggestions'>No suggestions...</li>)
            }
        }
        else{
            return '';
        }
    }

    render() {
        return (
            <div className="Header">
                <div className='app-logo'>
                    <img src='star_wars_logo.png' height='40px'/>
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
}

export default connect(null,{setCurrentMovie})(Header);
