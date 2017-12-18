import React from 'react';
import PropTypes from 'prop-types';

import { withApollo } from 'react-apollo';

import classNames from 'classnames';

import CREATE_MESSAGE from "../../utils/queries/CREATE_MESSAGE";
import CREATE_ACTIVITY from "../../utils/queries/CREATE_ACTIVITY";
import {MESSAGE} from "../../utils/activityTypes";

class MessageList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userOther: null,
            message: '',
            conversation: props.conversation,
        }
    }

    componentWillReceiveProps(props) {
        if (props.conversation.userFrom) {
            if (props.conversation.userFrom.username !== props.user.username) {
                this.setState({
                    userOther: props.conversation.userFrom,
                    conversation: props.conversation,
                })
            }
            else {
                this.setState({
                    userOther: props.conversation.userTo,
                    conversation: props.conversation,
                })
            }
        }
    }

    componentDidUpdate() {
        this.elem.scrollIntoView({behavior: "smooth"});
    }

    onChange(e) {
        e.preventDefault();
        this.setState({message: e.target.value})
    }

    sendMessage(e) {
        e.preventDefault();
        this.props.client.mutate({
            mutation: CREATE_MESSAGE,
            variables: {
                conversation: this.state.conversation._id,
                item: this.state.conversation.item._id,
                userFrom: this.props.user._id,
                userTo: this.state.userOther._id,
                message: this.state.message,
                date: new Date().toISOString(),
                read: false,
            }
        })
            .then(message => {
                this.props.client.mutate({
                    mutation: CREATE_ACTIVITY,
                    variables: {
                        type: MESSAGE,
                        user: this.props.user._id,
                        activityId: message.data.createMessage,
                        viewed: false,
                        date: new Date().toISOString(),
                        message: message.data.createMessage,
                    }
                })
                    .then(activity => {
                        window.location.reload();
                    })
                    .catch(activityErr => {
                        console.log(activityErr)
                    })
            })
            .catch(messageErr => {
                console.log(messageErr)
            })
    }

    render() {
        return (
            <div className="ui-block">
                <div className="ui-block-title">
                    <h6 className="title bold personal">
                        {this.state.userOther
                            ?`${this.state.userOther.firstName} ${this.state.userOther.lastName}`
                            : 'Loading...'
                        }
                    </h6>
                </div>

                <div className="ui-block-content">
                    <ul className="widget w-personal-info">
                        {
                            this.props.conversation.messages
                                ?this.props.conversation.messages.map((message, key) => {
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
                                : ''
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
        )
    }
};

MessageList.propTypes = {
    user: PropTypes.object.isRequired,
    conversation: PropTypes.object.isRequired,
};

export default withApollo(MessageList);