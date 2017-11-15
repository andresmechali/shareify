import React from 'react';
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

const query = gql`
    { 
        users {
            _id
            username
        } 
    }
`;


let Home = props => {
    return(
        <div className="container">
            <ul>
                {props.data.users? props.data.users.map(u => <li key={u._id}>{u.username}</li>) : 'loading'}
            </ul>
            <button onClick={() => props.history.push('/signup')}>Sign up</button>
        </div>
    )
};

Home = graphql(query)(Home);

const mapDispatchToProps = dispatch => bindActionCreators({
    changePage: () => push('/signup')
});

export default connect(
    null,
    mapDispatchToProps
)(Home);