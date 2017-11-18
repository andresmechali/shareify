import React from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import SignupForm from '../../components/Forms/SignupForm';

import { addFlashMessage } from "../../redux/actions/flashMessages";
import { deleteFlashMessage } from "../../redux/actions/flashMessages";
import { setCurrentUser } from "../../redux/actions/authActions";

class SignupPage extends React.Component {
    render() {
        return(
            <SignupForm
                addFlashMessage={this.props.addFlashMessage}
                deleteFlashMessage={this.props.deleteFlashMessage}
                flashMessages={this.props.flashMessages}
                push={this.props.push}
                setCurrentUser={this.props.setCurrentUser}
            />
        )
    }
}

SignupPage.propTypes = {
    addFlashMessage: PropTypes.func.isRequired,
    flashMessages: PropTypes.array.isRequired,
    setCurrentUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
    return {
        flashMessages: state.flashMessages
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        addFlashMessage: (m) => dispatch(addFlashMessage(m)),
        deleteFlashMessage: (m) => dispatch(deleteFlashMessage(m)),
        push: (path) => dispatch(push(path)),
        setCurrentUser: (user) => dispatch(setCurrentUser(user))
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SignupPage);