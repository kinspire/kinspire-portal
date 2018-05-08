import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from '../reducers/rootReducer.js';

export const store = createStore(
    rootReducer,
    applyMiddleware(
        thunkMiddleware,
    )
);
