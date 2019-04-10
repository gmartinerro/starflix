import swapi from '../apis/swapi'
import {SHOW_MOVIE,GET_CHARACTERS,UPDATE_MOVIE_HISTORY,GET_MOVIE_HISTORY} from './types'

/**
 * Sets the movie that is currently selected.
 * @param {*} movie The movie to set as current as shown in the preview in the search page
 */
export const setCurrentMovie = movie =>  (dispatch, getState) => {
    fixMovieData(movie);
    dispatch({ type: SHOW_MOVIE, payload: movie });
};

/**
 * Retrieves the movie (film) object using swapi 
 * @param {*} movieId The id of the movie to fetch as stated in swapi.co
 */
export const fetchMovie = movieId => async (dispatch, getState) => {
    const response = await swapi.get(`/films/${movieId}/`);

    let movie = response.data;
    fixMovieData(movie);
    dispatch({ type: SHOW_MOVIE, payload: movie });
};

/**
 * Retrieves a chunk (page) of characters from swapi
 * @param integer page Page number
 */
export const fetchCharacters = (page) => async (dispatch, getState) => {    
    const response = await swapi.get('/people/',{params:{page:page}});
    dispatch({ type: GET_CHARACTERS, payload: response.data });
};

/**
 * Adds a new element to the movie history list.
 * @param {*} movie  The movie object to add
 */
export const updateMovieHistory = movie =>  (dispatch, getState) => {    
    let movieHistory = window.localStorage.getItem('movieHistory');

    if (!movieHistory){
        movieHistory = [movie];
    }
    else{
        movieHistory = JSON.parse(movieHistory);
        movieHistory.push(movie)
    }
    
    window.localStorage.setItem('movieHistory',JSON.stringify(movieHistory));
    dispatch({ type: UPDATE_MOVIE_HISTORY, payload: movieHistory });
};

/**
 * Gets the list of movies previously viewed by the user as stored in browser.
 */
export const getMovieHistory = () =>  (dispatch, getState) => {    
    let movieHistory = window.localStorage.getItem('movieHistory');
    movieHistory = JSON.parse(movieHistory);
    dispatch({ type: GET_MOVIE_HISTORY, payload: movieHistory });
};


/**
 * Fixes movie data by adding a 'year' field and reformatting the 'opening_crawl' text to fit in HTML as a new 'summary' field 
 * @param {*} movie 
 */
function fixMovieData(movie){
    movie.year = movie.release_date.substring(0,4);
    movie.summary = movie.opening_crawl.replace('\r\n',' ');
}