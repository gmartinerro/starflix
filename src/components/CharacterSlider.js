import React, { Component } from 'react';
import './CharacterSlider.css';
import {connect} from 'react-redux';
import {fetchCharacters, setCurrentMovie} from '../actions';

// Time to set the automatic scroll period for the slider
const CHARACTER_SLIDER_TIME = 3000;

// Width in pixels for each item in the slider bar
const CHARACTER_SLIDER_ITEM_WIDTH = 270;

// Total amount of characters in the star wars movie saga
const TOTAL_CHARACTER_COUNT = 87;

/**
 * Character slider component
 * A simple component showing a slider with some information about the 
 * characters included in the star wars movie saga.
 * The sliders moves automatically each 3 seconds.
 */
class CharacterSlider extends Component {

    constructor(props){
        super(props);
        this.state={position:0}
    }


    componentDidMount(){
        if (this.props.characters 
            && this.props.characters.length===0){
                this.props.fetchCharacters(1);
        }

        // Scroll slider again and again...
        setInterval(()=>this.scrollRight(),CHARACTER_SLIDER_TIME);
    }


    render() {
        return (
            <div className='CharacterSlider'>
                <div className='section-title'>Personajes</div>
                <div className='character-slider'>
                    <div className='character-slider-items' style={this.getSliderStyle()}>
                        {this.renderMovieSliderItems()}
                    </div>
                </div>
            </div>
        );
    }

    renderMovieSliderItems(){
        
        if (this.props.characters.length > 0){
            
            // Check the amount of items in the character list.
            // If it is lower than the total amount found in the swapi api
            // then request a new chunk to fill the list.
            if (this.props.characters.length < TOTAL_CHARACTER_COUNT)
                this.props.fetchCharacters(1 + this.props.characters.length/10);

            return this.props.characters.map(character=>{
                return (
                    <div className={`slider-item`} key={character.name}>
                        <div className='character-name'>{character.name}</div>
                        <div className='character-feature'><label>HEIGHT:</label><span className='value'>{character.height}</span></div>
                        <div className='character-feature'><label>WEIGHT:</label><span className='value'>{character.mass}</span></div>
                        <div className='character-feature'><label>GENDER:</label><span className='value'>{character.gender}</span></div>
                        <div className='character-feature'><label>FILMS:</label><span className='value'>{character.films.length}</span></div>
                    </div>)
            });
        }else{
            return '';
        }
    }

    scrollRight(){
        this.setState({position:this.state.position - CHARACTER_SLIDER_ITEM_WIDTH})
    }

    getSliderStyle(){
        return {left: this.state.position + "px"};
    }


}

const mapStateToProps = state =>{
    return {characters: state.characters};
}


export default connect(mapStateToProps,{fetchCharacters,setCurrentMovie})(CharacterSlider);
