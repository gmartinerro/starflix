import React, { Component } from 'react';
import Header from '../Header';
import { connect } from 'react-redux';
import MovieSummary from '../MovieSummary';
import MovieHistory from '../MovieHistory';
import CharacterSlider from '../CharacterSlider';
import {fetchMovie,fetchCharacters} from '../../actions';

// Number of movies in the starwars api
const MOVIES_NUMBER = 7;

/**
 * SearchPage component. 
 * Main app page, showing the searchbar, movie summary, 
 * the movie history and a movie character slider.
 * 
 */
class SearchPage extends Component {

    componentDidMount(){
      // If there is no currentMovie set yet, just show a random one.
      if (!this.props.currentMovie){        
        let movieId = Math.ceil(Math.random() * (MOVIES_NUMBER-1)) + 1;
        this.props.fetchMovie(movieId)  
      }
    }

    render() {
        
        if (!this.props.characters || !this.props.currentMovie)
            return(<div className='loading-veil'></div>);

        return (
            <div>
                <Header onSearch={(movie)=>this.onMovieSearch(movie)}/>              
                <div className='movie-highlight'>
                  <div className={`cover-frame movie-cover-${this.props.currentMovie.episode_id}`}>                  
                  </div>
                  <MovieSummary movie={this.props.currentMovie}/>
                </div>
                <MovieHistory/>
                <CharacterSlider/>
            </div>
        );
    }

    /**
     * Search movie callback. 
     * It just forwards the call to a parent component.
     * @param {*} movie The movie object selected by the user.
     */
    onMovieSearch(movie){
      this.props.fetchMovie(movie);
    }
}

const mapStateToProps = state =>{
  return { currentMovie: state.currentMovie, 
           characters: state.characters }
}

export default connect(mapStateToProps,{fetchMovie,fetchCharacters})(SearchPage);
