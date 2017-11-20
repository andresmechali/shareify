import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import _ from 'lodash';

import FlashMessage from './FlashMessage';

import { deleteFlashMessage } from '../../redux/actions/flashMessages';

class FlashMessageList extends React.Component {
    render() {
        if (!_.isEmpty(this.props.messages)) {
            return (
                <div>
                    <hr/>
                    <FlashMessage message={this.props.messages[0]} deleteFlashMessage={this.props.deleteFlashMessage} />
                </div>
            )
        }
        else {
            return null
        }

    }
}

FlashMessageList.propTypes = {
    messages: PropTypes.array.isRequired,
    deleteFlashMessage: PropTypes.func.isRequired,
};

const mapStateToProps = state => {
    return {
        messages: state.flashMessages
    }
};

const mapDispatchToProps = dispatch => {
    return {
        deleteFlashMessage: () => dispatch(deleteFlashMessage()),
    }
};

FlashMessageList = connect(mapStateToProps, mapDispatchToProps)(FlashMessageList);

export default FlashMessageList;