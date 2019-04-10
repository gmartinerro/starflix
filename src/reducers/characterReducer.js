import { GET_CHARACTERS } from '../actions/types';

export default (state = null, action) => {
    switch (action.type) {
        case GET_CHARACTERS:
            return {characters: action.payload};
        default:
            return state;
    }
};