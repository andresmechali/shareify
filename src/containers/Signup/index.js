import React from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';

import SignupForm from '../../components/Forms/SignupForm';

import { userSignupRequest } from '../../redux/actions/signupActions';
import { addFlashMessage } from "../../redux/actions/flashMessages";

class SignupPage extends React.Component {
    render() {
        const { userSignupRequest, addFlashMessage } = this.props;
        return(
            <SignupForm userSignupRequest={userSignupRequest} addFlashMessage={addFlashMessage} flashMessages={this.props.flashMessages} push={this.props.push}/>
        )
    }
}

SignupPage.propTypes = {
    userSignupRequest: PropTypes.func.isRequired,
    addFlashMessage: PropTypes.func.isRequired,
    flashMessages: PropTypes.array.isRequired
};

const mapStateToProps = (state) => {
    return {
        flashMessages: state.flashMessages
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        userSignupRequest: userSignupRequest,
        addFlashMessage: addFlashMessage,
        push: (path) => dispatch(push(path))
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
    )(SignupPage);