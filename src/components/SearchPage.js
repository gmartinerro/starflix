import React, { Component } from 'react';
import Header from './Header';
import { connect } from 'react-redux';
import MovieSummary from './MovieSummary';
import MovieHistory from './MovieHistory';
import CharacterSlider from './CharacterSlider';
import {fetchMovie,fetchCharacters} from '../actions';

class SearchPage extends Component {

    componentDidMount(){
      if (!this.props.currentMovie){
        let movieId = Math.ceil(Math.random() * 6) + 1;
        console.log(movieId);
        this.props.fetchMovie(movieId)  
      }
    }

    onMovieSearch(movie){
      this.props.fetchMovie(movie);
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
}

const mapStateToProps = state =>{
  console.log(state)
  return { currentMovie: state.currentMovie, 
           characters: state.characters }
}

export default connect(mapStateToProps,{fetchMovie,fetchCharacters})(SearchPage);
