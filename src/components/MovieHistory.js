import React, { Component } from 'react';
import {connect} from 'react-redux';
import {getMovieHistory} from '../actions';


class MovieHistory extends Component {

    componentDidMount(){
        this.props.getMovieHistory();
    }

    renderMovieSliderItems(){
        
        if (this.props.movieHistory){
            return this.props.movieHistory.map(movie=>{
                return (
                    <div className='slider-item' key={movie.episode_id} >
                        <div className='slider-item-title'>{movie.title}</div>
                    </div>)
            });
        }else{
            return '';
        }
    }

    render() {
        return (
            <div className='MovieHistory'>
                <div className='section-title'>Películas consultadas</div>
                <div className='movie-slider'>
                    {this.renderMovieSliderItems()}
                </div>
            </div>
        );
    }
}

const mapStateToProps = state =>{
    console.log(state);
    return {movieHistory: state.movieHistory};
}


export default connect(mapStateToProps,{getMovieHistory})(MovieHistory);
