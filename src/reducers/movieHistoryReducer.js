import { UPDATE_MOVIE_HISTORY, GET_MOVIE_HISTORY } from '../actions/types';

export default (state = null, action) => {
    switch (action.type) {
        case UPDATE_MOVIE_HISTORY:
            return action.payload;
        case GET_MOVIE_HISTORY:
            return action.payload;
        default:
            return state;
    }
};
