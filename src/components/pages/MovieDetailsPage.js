import React, { Component } from 'react';
import './MovieDetailsPage.css';
import { connect } from 'react-redux';
import {Redirect, Link} from 'react-router-dom';
import { updateMovieHistory } from '../../actions';

/**
 * MovieDetailsPage component. 
 * Page showing extra info about the currently selected movie, whenever the user
 * clicks the "VER FICHA" button.
 */
class MovieDetailsPage extends Component {

    componentDidMount(){
        if (this.props.currentMovie)
            this.props.updateMovieHistory(this.props.currentMovie);
    }

    render() {
        
        // If no movie has already been selected, just go back home.
        if (!this.props.currentMovie) 
            return (<Redirect to='/'></Redirect>);

        const movie = this.props.currentMovie;

        return (
            <div className='MovieDetailsPage' >
                <div className={`movie-details-cover movie-cover-${movie.episode_id}`}></div>
                <div className='movie-details-info'>
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
                    <Link to='/'>
                        <div className='button'>VOLVER</div>
                    </Link>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state =>{
    return {currentMovie:state.currentMovie};
}

export default connect(mapStateToProps,{updateMovieHistory})(MovieDetailsPage);
