import React from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import LoginForm from '../../components/Forms/LoginForm';

import { addFlashMessage } from "../../redux/actions/flashMessages";

class LoginPage extends React.Component {
    render() {
        return(
            <LoginForm addFlashMessage={this.props.addFlashMessage} flashMessages={this.props.flashMessages} push={this.props.push}/>
        )
    }
}

LoginPage.propTypes = {
    addFlashMessage: PropTypes.func.isRequired,
    flashMessages: PropTypes.array.isRequired,
    push: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
    return {
        flashMessages: state.flashMessages
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        addFlashMessage: () => dispatch(addFlashMessage),
        push: (path) => dispatch(push(path))
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LoginPage);