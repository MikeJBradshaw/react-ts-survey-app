import { createStore, combineReducers, applyMiddleware } from 'redux';     
import { createEpicMiddleware, combineEpics } from 'redux-observable';
import app from './reducers/app';
import db from './reducers/dashboard';
import userEpic from './epics/user';
import dashboardEpic from './epics/dashboard';


const reducers = combineReducers({ app, db });
const epicMiddleware = createEpicMiddleware();

// set up the store
const store = createStore(reducers, applyMiddleware(epicMiddleware));
epicMiddleware.run(combineEpics<any>(userEpic, dashboardEpic));

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;          
export default store;                                     
