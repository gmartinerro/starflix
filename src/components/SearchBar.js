import React,{Component} from 'react';
import './SearchBar.css';

/**
 * Search box component
 * It includes an input box and a submit button to start a new search.
 * The component is connected to an upper component by means of the 
 * 'onSearch' callback prop.
 */
class SearchBar extends Component {

    constructor(props){
        super(props)
        this.state = {term:''}
    }

    /**
     * Submit callback. 
     * It simply forwards the submit action to a parent component 
     * @param {*} event The HTML event
     */
    onFormSubmit(event){
        this.props.onSearch(this.state.term)
        event.preventDefault()
    }

    render(){
        return (
            <div>
                <form onSubmit={(e)=>this.onFormSubmit(e)} className='search-form'>
                    <input id='search' type='text' 
                           value={this.state.term}
                           onChange={(e)=>{this.setState({term:e.target.value})}}/>
                    <button type='submit' className='button search-button'>BUSCAR PELICULA</button>
                </form>
            </div>
        );
    }   
};

export default SearchBar;