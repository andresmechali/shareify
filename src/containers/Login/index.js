import React from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import LoginForm from '../../components/Forms/LoginForm';

import { addFlashMessage } from "../../redux/actions/flashMessages";
import { deleteFlashMessage } from "../../redux/actions/flashMessages";
import { setCurrentUser } from "../../redux/actions/authActions";

class LoginPage extends React.Component {

    componentWillMount() {
        this.props.deleteFlashMessage()
    }

    render() {
        return(
            <LoginForm
                addFlashMessage={this.props.addFlashMessage}
                deleteFlashMessage={this.props.deleteFlashMessage}
                flashMessages={this.props.flashMessages}
                push={this.props.push}
                setCurrentUser={this.props.setCurrentUser}
                isAuthenticated={this.props.isAuthenticated}
            />
        )
    }
}

LoginPage.propTypes = {
    addFlashMessage: PropTypes.func.isRequired,
    deleteFlashMessage: PropTypes.func.isRequired,
    flashMessages: PropTypes.array.isRequired,
    push: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => {
    return {
        flashMessages: state.flashMessages,
        isAuthenticated: state.auth.isAuthenticated,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        addFlashMessage: (m) => dispatch(addFlashMessage(m)),
        deleteFlashMessage: () => dispatch(deleteFlashMessage()),
        push: (path) => dispatch(push(path)),
        setCurrentUser: (userToken) => dispatch(setCurrentUser(userToken))
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LoginPage);