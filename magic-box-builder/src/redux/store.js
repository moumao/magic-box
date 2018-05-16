import {createStore, applyMiddleware} from 'redux';
import combineReducers from './reducers.js';
import thunkMiddleware from 'redux-thunk'
import promiseMiddleware from './middleware/promiseMiddleware'
import { composeWithDevTools } from 'redux-devtools-extension';

let store = createStore(combineReducers,  composeWithDevTools(
                  applyMiddleware(thunkMiddleware, promiseMiddleware)
              ));

export default store;
