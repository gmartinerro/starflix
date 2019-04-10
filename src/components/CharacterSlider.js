import React, { Component } from 'react';
import './CharacterSlider.css';
import {connect} from 'react-redux';
import {fetchCharacters, setCurrentMovie} from '../actions';


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
        setInterval(()=>this.scrollRight(),3000);
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
            
            if (this.props.characters.length < 87)
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
        this.setState({position:this.state.position-270})
    }

    getSliderStyle(){
        return {left: this.state.position + "px"};
    }


}

const mapStateToProps = state =>{
    return {characters: state.characters};
}


export default connect(mapStateToProps,{fetchCharacters,setCurrentMovie})(CharacterSlider);
