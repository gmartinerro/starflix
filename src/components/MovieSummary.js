import React, { Component } from 'react';
import { Link } from 'react-router-dom';

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
