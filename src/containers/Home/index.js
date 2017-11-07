import React from 'react';
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

const Home = props => (
    <div>
        <h1>Home</h1>
        <button onClick={() => props.changePage()}>Go to About page</button>
    </div>
);

const mapDispatchToProps = dispatch => bindActionCreators({
    changePage: () => push('/about')
});

export default connect(
    null,
    mapDispatchToProps
)(Home);