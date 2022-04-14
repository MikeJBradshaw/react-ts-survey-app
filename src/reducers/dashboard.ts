import { LOADED, LOAD_ERROR } from '../actions/dashboard';
import type { Reducer } from 'redux';
import type { DashboardAction, Survey } from '../actions/dashboard';


interface DashboardState {
    loading?: boolean;
    error?: string;
    surveys?: Survey[];
}


const dashboardReducer: Reducer<DashboardState, DashboardAction> = (state = {loading: true}, action) => {
    switch (action.type) {
        case LOAD_ERROR:
            return {...state, error: action.error.message};

        case LOADED:
            const { error, loading, ...newState } = state;
            newState.surveys = action.surveys;
            return newState;

        default:
            return state;
    }
};


export default dashboardReducer;
