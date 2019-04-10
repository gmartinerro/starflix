import { SHOW_MOVIE} from '../actions/types';

export default (state = null, action) => {
    switch (action.type) {
        case SHOW_MOVIE:
            return action.payload;
        default:
            return state;
    }
};
