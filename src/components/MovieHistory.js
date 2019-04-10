import React, { Component } from 'react';
import './MovieHistory.css';
import {connect} from 'react-redux';
import {getMovieHistory, setCurrentMovie} from '../actions';


class MovieHistory extends Component {

    constructor(props){
        super(props);
        this.state={position:0}
    }

    componentDidMount(){
        this.props.getMovieHistory();
    }

    scrollLeft(){
        this.setState({position:this.state.position+270})
        console.log(this.state);
    }

    scrollRight(){
        this.setState({position:this.state.position-270})
        console.log(this.state);
    }

    showMovie(movie){
        this.props.setCurrentMovie(movie);
    }

    renderMovieSliderItems(){
        
        if (this.props.movieHistory){
            return this.props.movieHistory.map((movie,index)=>{
                return (
                    <div className={`slider-item movie-cover-${movie.episode_id}`} key={index} onClick={()=>this.showMovie(movie)}>
                    </div>)
            });
        }else{
            return '';
        }
    }

    renderLeftArrow(){
        if (this.state.position < 0)
            return <div className='slider-arrow slider-left-arrow' onClick={()=>this.scrollLeft()}></div>;
        else
            return '';
    }

    renderRightArrow(){
        return <div className='slider-arrow slider-right-arrow' onClick={()=>this.scrollRight()}></div>
    }

    getSliderStyle(){
        return {left: this.state.position + "px"};
    }

    render() {
        return (
            <div className='MovieHistory'>
                <div className='section-title'>Películas consultadas</div>
                <div className='movie-slider'>
                    <div className='movie-slider-items' style={this.getSliderStyle()}>
                        {this.renderMovieSliderItems()}
                    </div>
                    
                    {this.renderLeftArrow()}
                    {this.renderRightArrow()}
                    
                </div>
            </div>
        );
    }
}

const mapStateToProps = state =>{
    console.log(state);
    return {movieHistory: state.movieHistory};
}


export default connect(mapStateToProps,{getMovieHistory,setCurrentMovie})(MovieHistory);
