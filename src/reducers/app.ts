import { USER_LOADED, LOAD_ERROR } from '../actions/user';
import type { Reducer } from 'redux';
import type { UserAction, User } from '../actions/user';


export interface AppState {
    loading?: boolean;
    error?: string;
    user?: User;
};


const appReducer: Reducer<AppState, UserAction> = (state = {loading: true}, action) => {
    console.log(action);
    switch (action.type) {
        case LOAD_ERROR:
            return {...state, error: action.error.message, loading: false};

        case USER_LOADED:
            const { error, loading, ...newState } = state;
            newState.user = action.user;
            return  newState;

        default:
            return state;
    }
};


export default appReducer;
