import React from 'react';
import PropTypes from 'prop-types';

import { withApollo } from 'react-apollo';

import classNames from 'classnames';

import CREATE_MESSAGE from "../../utils/queries/CREATE_MESSAGE";
import CREATE_CONVERSATION from "../../utils/queries/CREATE_CONVERSATION";

class MessageList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userOther: props.userOther,
            message: '',
            conversation: props.conversation,
            sent: false, //do it dynamically
        }
    }

    onChange(e) {
        e.preventDefault();
        this.setState({message: e.target.value})
    }

    sendMessage(e) {
        e.preventDefault();
        
        // if there is no conversation, create it
        if (!this.state.conversation._id) {
            this.props.client.mutate({
                mutation: CREATE_CONVERSATION,
                variables: {
                    userFrom: this.props.user._id,
                    userTo: this.props.userOther._id,
                    messages: [],
                    lastDate: new Date().toISOString(),
                }
            })
                .then(
                    conversation => {
                        this.props.client.mutate({
                            mutation: CREATE_MESSAGE,
                            variables: {
                                conversation: conversation.data.createConversation,
                                userFrom: this.props.user._id,
                                userTo: this.props.userOther._id,
                                message: this.state.message,
                                date: new Date().toISOString(),
                                read: false,
                            }
                        })
                            .then(message => {
                                this.setState({sent: true});
                                window.location.reload()
                            })
                            .catch(messageErr => {
                                console.log(messageErr)
                            })
                    }
                )
                .catch(
                    conversationErr => {
                        console.log(conversationErr)
                    }
                )
        }
        
        // if not, use the existing one
        else {
            this.props.client.mutate({
                mutation: CREATE_MESSAGE,
                variables: {
                    conversation: this.state.conversation._id,
                    userFrom: this.props.user._id,
                    userTo: this.state.userOther._id,
                    message: this.state.message,
                    date: new Date().toISOString(),
                    read: false,
                }
            })
                .then(message => {
                    this.props.setCurrentUser(message.data.createMessage.token);
                    window.location.reload();
                })
                .catch(messageErr => {
                    console.log(messageErr)
                })
        }

    }

    render() {
        return (
            <div>
                <div className="ui-block">
                    <div className="ui-block-title">
                        <h6 className="title bold">
                            <span>
                                Messages
                            </span>
                        </h6>
                    </div>

                    <div className="ui-block-content">
                        <ul className="widget w-personal-info">
                            {
                                this.props.conversation.messages
                                    ? this.props.conversation.messages.map((message, key) => {
                                        return <li
                                            key={key}
                                            className={classNames({
                                                'align-right': message.userFrom.username === this.props.user.username,
                                                'bold': !message.read,
                                            })}
                                        >
                                            <span>{message.userFrom.firstName}: </span>{message.message}
                                        </li>
                                    })
                                    : <div className="bold" style={{paddingBottom: "20px"}}>Start a new conversation</div>
                            }
                        </ul>
                        <form
                            onSubmit={this.sendMessage.bind(this)}
                            id="inputMessage"
                            ref={elem => {this.elem = elem}}
                        >
                            <input
                                className="form-control taller-input"
                                type="text"
                                placeholder="Reply..."
                                value={this.state.message}
                                onChange={this.onChange.bind(this)}
                            />
                        </form>

                    </div>
                </div>

            </div>
        )
    }
}

MessageList.propTypes = {
    user: PropTypes.object.isRequired,
    userOther: PropTypes.object.isRequired,
    conversation: PropTypes.object.isRequired,
    setCurrentUser: PropTypes.func.isRequired,
};

export default withApollo(MessageList);