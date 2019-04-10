import { combineReducers } from 'redux';
import characterReducer from './characterReducer';
import movieReducer from './movieReducer';
import movieHistoryReducer from './movieHistoryReducer';

export default combineReducers({
    movieHistory: movieHistoryReducer,
    currentMovie: movieReducer,
    characters: characterReducer
});