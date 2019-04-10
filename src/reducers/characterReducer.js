import { GET_CHARACTERS } from '../actions/types';

export default (state = [], action) => {
    switch (action.type) {
        case GET_CHARACTERS:
            return [...state,...action.payload.results];
        default:
            return state;
    }
};