import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import createHistory from 'history/createBrowserHistory'
import rootReducer from './redux/reducers/rootReducer';

export const history = createHistory();

const initialState = {};
const enhacers = [];
const middleWare = [
    thunk,
    logger,
    routerMiddleware(history)
];

if (process.env.NODE_ENV === 'development') {
    const devToolsExtension = window.devToolsExtension

    if (typeof devToolsExtension === 'function') {
        enhacers.push(devToolsExtension())
    }
}

const composedEnhacers = compose(
    applyMiddleware(...middleWare),
    ...enhacers
);

const store = createStore(
    rootReducer,
    initialState,
    composedEnhacers
);

export default store;

