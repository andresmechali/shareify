import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './containers/App';
import registerServiceWorker from './registerServiceWorker';

import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloLink, concat } from 'apollo-link';
import { onError } from 'apollo-link-error'

import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import store, { history } from './store';

import { setCurrentUser, removeCurentUser } from "./redux/actions/authActions";
import jwt from 'jsonwebtoken';

const httpLink = new HttpLink({ uri: 'http://localhost:3001/graphql' });
//const httpLink = new HttpLink({ uri: 'https://cool-server.herokuapp.com/graphql' });

const authMiddleware = new ApolloLink((operation, forward) => {
    operation.setContext({
        headers: {
            authorization: 'Bearer ' + (localStorage.getItem('token') || sessionStorage.getItem('token') || null),
        }
    });
    return forward(operation);
});

const logoutLink = onError(({ networkError }) => {
    if (networkError) {
        if (networkError.statusCode === 401) {
            store.dispatch(removeCurentUser())
        }
    }
});

const client = new ApolloClient({
    link: logoutLink.concat(concat(authMiddleware, httpLink)),
    cache: new InMemoryCache()
});

const token = localStorage.getItem('token') || sessionStorage.getItem('token');
if (token) {
    store.dispatch(setCurrentUser(jwt.decode(token)))
}

ReactDOM.render(
    <ApolloProvider client={client}>
        <Provider store={store}>
            <ConnectedRouter history={history}>
                <App />
            </ConnectedRouter>
        </Provider>
    </ApolloProvider>,
    document.getElementById('root')
);

registerServiceWorker();
