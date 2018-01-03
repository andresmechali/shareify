import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import { addFlashMessage, deleteFlashMessage } from "../redux/actions/flashMessages";

export default function(ComposedComponent) {
    class Authenticate extends React.Component {

        componentWillMount() {
            if (!this.props.isAuthenticated) {
                this.props.addFlashMessage({
                    type: 'error',
                    text: 'Please login'
                });
                //this.props.push('/login');
            }
        }

        componentWillUpdate(nextProps) {
            if (!nextProps.isAuthenticated) {
                this.props.push('/')
            }
        }

        render() {
            return (
                <ComposedComponent {...this.props} />
            )
        }
    }

    Authenticate.propTypes = {
        isAuthenticated: PropTypes.bool.isRequired,
        addFlashMessage: PropTypes.func.isRequired,
        deleteFlashMessage: PropTypes.func.isRequired,
        push: PropTypes.func.isRequired
    };

    const mapStateToProps = (state) => {
        return {
            isAuthenticated: state.auth.isAuthenticated
        }
    };

    const mapDispatchToProps = (dispatch) => {
        return {
            push: (path) => dispatch(push(path)),
            addFlashMessage: (msg) => dispatch(addFlashMessage(msg)),
            deleteFlashMessage: () => dispatch(deleteFlashMessage()),
        }
    };

    return connect(mapStateToProps, mapDispatchToProps)(Authenticate);
}