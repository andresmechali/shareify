import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import { addFlashMessage, deleteFlashMessage } from "../../redux/actions/flashMessages";
import { setCurrentUser } from "../../redux/actions/authActions";

import NewOffer from '../../components/Forms/NewOffer';

class Offer extends React.Component {
    render() {
        return (
            <div className="container">
                <NewOffer
                    auth={this.props.auth}
                    push={this.props.push}
                    addFlashMessage={this.props.addFlashMessage}
                    deleteFlashMessage={this.props.deleteFlashMessage}
                    setCurrentUser={this.props.setCurrentUser}
                    flashMessages={this.props.flashMessages}
                />
            </div>
        )
    }
}

Offer.propTypes = {
    auth: PropTypes.object.isRequired,
    push: PropTypes.func.isRequired,
    addFlashMessage: PropTypes.func.isRequired,
    deleteFlashMessage: PropTypes.func.isRequired,
    setCurrentUser: PropTypes.func.isRequired,
};

const mapStateToProps = state => {
    return {
        auth: state.auth,
        flashMessages: state.flashMessages,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        push: (path) => dispatch(push(path)),
        addFlashMessage: (msg) => dispatch(addFlashMessage(msg)),
        deleteFlashMessage: () => dispatch(deleteFlashMessage()),
        setCurrentUser: (userToken) => dispatch(setCurrentUser(userToken)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Offer);