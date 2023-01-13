import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducer.js';
// import initData from './initData';

const store = createStore(reducer, applyMiddleware(thunk))
export default store;