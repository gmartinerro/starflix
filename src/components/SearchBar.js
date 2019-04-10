import React,{Component} from 'react';
//import { Link } from 'react-router-dom';

class SearchBar extends Component {

    constructor(props){
        super(props)
        this.state = {term:''}
    }

    onFormSubmit(event){
        this.props.onSearch(this.state.term)
        event.preventDefault()
    }

    render(){

        return (
            <div>
                <form onSubmit={(e)=>this.onFormSubmit(e)} className='search-form'>
                    <input id='search' value={this.state.term}
                    type='text' onChange={(e)=>{this.setState({term:e.target.value})}}/>
                    <button type='submit' className='button search-button'>BUSCAR PELICULA</button>
                </form>
            </div>
        );
    }   
};

export default SearchBar;