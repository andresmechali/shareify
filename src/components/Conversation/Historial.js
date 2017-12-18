import React from 'react';
import PropTypes from 'prop-types';

const Historial = (props) => {
    return (
        <div className="ui-block">
            <div className="ui-block-title">
                <h6 className="title bold personal">
                    Conversations
                </h6>
            </div>

            <div className="ui-block-content">
                <ul className="widget w-personal-info">
                    {
                        props.conversations.map((conversation, key) => {
                            return (
                                <li
                                    key={key}
                                    onClick = {props.setConversation}
                                    id={conversation._id}
                                >
                                    {
                                        conversation.userTo.username === props.user.username
                                            ? `${conversation.userFrom.firstName} ${conversation.userFrom.lastName}`
                                            : `${conversation.userTo.firstName} ${conversation.userTo.lastName}`
                                    }
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        </div>
    )
};

Historial.propTypes = {
    user: PropTypes.object.isRequired,
    conversations: PropTypes.array.isRequired,
    setConversation: PropTypes.func.isRequired,
};

export default Historial;