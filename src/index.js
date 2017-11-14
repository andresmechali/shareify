import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './containers/App';
import registerServiceWorker from './registerServiceWorker';

import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import store, { history } from './store';

const httpLink = new HttpLink({ uri: 'http://localhost:3001/graphql' });

const client = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache()
});

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
