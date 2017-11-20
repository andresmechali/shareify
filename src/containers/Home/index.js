import React from 'react';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';

import RowWithButton from '../../components/RowWithButton/RowWithButton';

let Home = props => {
    return(
        <div className="container">
            <RowWithButton
                color="#1ed760"
                link="/ask/new"
                title="Need anything?"
                buttonText="Ask for it!"
            />
            <RowWithButton
                color="#38a9ff"
                link="/offer/new"
                title="Anything to offer?"
                buttonText="Start sharing it!"
            />
        </div>
    )
};

const mapDispatchToProps = dispatch => {
    return {
        push: (path) => dispatch(push(path)),
    }
};

export default connect(
    null,
    mapDispatchToProps
)(Home);