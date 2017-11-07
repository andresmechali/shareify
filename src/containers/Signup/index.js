import React from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';

import SignupForm from '../../components/Forms/SignupForm';

import { userSignupRequest } from '../../redux/actions/signupActions';

class SignupPage extends React.Component {
    render() {
        const { userSignupRequest } = this.props;
        return(
            <SignupForm userSignupRequest={userSignupRequest} />
        )
    }
}

SignupPage.propTypes = {
    userSignupRequest: PropTypes.func.isRequired
};

export default connect(
    null,
    {userSignupRequest}
    )(SignupPage);