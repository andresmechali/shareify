import React from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';

import SignupForm from '../../components/Forms/SignupForm';

import { userSignupRequest } from '../../redux/actions/signupActions';
import { addFlashMessage } from "../../redux/actions/flashMessages";

class SignupPage extends React.Component {
    render() {
        const { userSignupRequest, addFlashMessage } = this.props;
        return(
            <SignupForm userSignupRequest={userSignupRequest} addFlashMessage={addFlashMessage} />
        )
    }
}

SignupPage.propTypes = {
    userSignupRequest: PropTypes.func.isRequired,
    addFlashMessage: PropTypes.func.isRequired,
};

export default connect(
    null,
    {
        userSignupRequest,
        addFlashMessage,
    }
    )(SignupPage);