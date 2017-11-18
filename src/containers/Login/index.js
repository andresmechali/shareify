import React from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import LoginForm from '../../components/Forms/LoginForm';

import { addFlashMessage } from "../../redux/actions/flashMessages";
import { deleteFlashMessage } from "../../redux/actions/flashMessages";

class LoginPage extends React.Component {
    render() {
        return(
            <LoginForm addFlashMessage={this.props.addFlashMessage} deleteFlashMessage={this.props.deleteFlashMessage} flashMessages={this.props.flashMessages} push={this.props.push}/>
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
        addFlashMessage: (m) => dispatch(addFlashMessage(m)),
        deleteFlashMessage: (m) => dispatch(deleteFlashMessage(m)),
        push: (path) => dispatch(push(path))
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LoginPage);