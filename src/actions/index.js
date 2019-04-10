import swapi from '../apis/swapi'
import {SHOW_MOVIE,GET_CHARACTERS,UPDATE_MOVIE_HISTORY,GET_MOVIE_HISTORY} from './types'

export const setCurrentMovie = movie =>  (dispatch, getState) => {
    fixMovieData(movie);
    dispatch({ type: SHOW_MOVIE, payload: movie });
};

export const fetchMovie = movieId => async (dispatch, getState) => {
    const response = await swapi.get(`/films/${movieId}/`);

    let movie = response.data;
    fixMovieData(movie);
    dispatch({ type: SHOW_MOVIE, payload: movie });
};

export const fetchCharacters = () => async (dispatch, getState) => {
    const page = Math.ceil(Math.random()*8);
    const response = await swapi.get('/people/',{params:{page:page}});
    dispatch({ type: GET_CHARACTERS, payload: response.data });
};

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

export const getMovieHistory = () =>  (dispatch, getState) => {    
    let movieHistory = window.localStorage.getItem('movieHistory');
    movieHistory = JSON.parse(movieHistory);
    dispatch({ type: GET_MOVIE_HISTORY, payload: movieHistory });
};

function fixMovieData(movie){
    movie.year = movie.release_date.substring(0,4);
    movie.summary = movie.opening_crawl.replace('\r\n',' ');
}