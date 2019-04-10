import React, { Component } from 'react';
import './MovieSummary.css';
import { Link } from 'react-router-dom';

/**
 * Component that show a brief set of info realted to the currently selected movie
 * on the main page. Just a simple component (could be done using a functional component,
 * since it doesn't need any hook method)
 */
class MovieSummary extends Component {

    render() {
        return (
            <div className='MovieSummary'>
                <div className='movie-title'>
                    { this.props.movie.title }
                </div>
                <div className='movie-data'>
                    <span className='movie-director'>{this.props.movie.director}</span>
                    <span className='movie-release-year'>{this.props.movie.year}</span>
                </div>
                <div className='movie-summary'>{this.props.movie.summary}</div>
                <div className='movie-summary-actions'>
                    <Link to='/movie'>
                        <div className='button'>VER FICHA</div>
                    </Link>
                </div>
            </div>
        );
    }
}

export default MovieSummary;
