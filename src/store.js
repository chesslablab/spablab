import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers/rootReducer';

// Comment out when debugging with testing-redux-chess
// See https://github.com/programarivm/testing-redux-chess

const store = createStore(rootReducer, applyMiddleware(thunk));

// Uncomment when debugging with testing-redux-chess
// See https://github.com/programarivm/testing-redux-chess

/*
const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);
*/


export default store;
