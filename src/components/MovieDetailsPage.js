import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Redirect} from 'react-router-dom';
import { updateMovieHistory } from '../actions';

class MovieDetailsPage extends Component {

    componentDidMount(){
        if (this.props.currentMovie)
            this.props.updateMovieHistory(this.props.currentMovie);
    }


    render() {
        
        if (!this.props.currentMovie) return (<Redirect to='/'></Redirect>);

        const movie = this.props.currentMovie;

        return (
            <div className={`MovieDetailsPage movie-cover-${movie.episode_id}`}>            
                <div className='movie-title'>
                    { movie.title }
                </div>
                <div className='movie-data'>
                    <span className='movie-director'>{movie.director}</span>
                    <span className='movie-release-year'>{movie.year}</span>
                </div>

                <table className='movie-stats'>
                    <tr><th>PERSONAJES</th><th>RAZAS</th><th>NAVES</th><th>PLANETAS</th></tr>
                    <tr><td>{movie.characters.length}</td><td>{movie.species.length}</td><td>{movie.starships.length}</td><td>{movie.planets.length}</td></tr>
                </table>

                <div className='label'>Producida por</div>
                <p>{movie.producer}</p>
                <div className='label'>Resumen</div>
                <p>{movie.summary}</p>
            </div>
        );
    }
}

const mapStateToProps = state =>{
    return {currentMovie:state.currentMovie};
}

export default connect(mapStateToProps,{updateMovieHistory})(MovieDetailsPage);
