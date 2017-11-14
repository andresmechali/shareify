import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import FlashMessage from './FlashMessage';

import { deleteFlashMessage } from '../../redux/actions/flashMessages';

class FlashMessageList extends React.Component {
    render() {
        const messages = this.props.messages.map(
            message => <FlashMessage key={message.id} message={message} deleteFlashMessage={deleteFlashMessage} dispatch={this.props.dispatch} />
        );
        return(
            <div>
                {messages}
            </div>
        )
    }
}

FlashMessageList.propTypes = {
    messages: PropTypes.array.isRequired,
};

const mapStateToProps = state => {
    return {
        messages: state.flashMessages
    }
};

FlashMessageList = connect(mapStateToProps)(FlashMessageList);

export default FlashMessageList;