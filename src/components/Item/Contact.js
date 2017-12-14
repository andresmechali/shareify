import React from 'react';
import PropTypes from 'prop-types';

import { withApollo } from 'react-apollo';

import CREATE_CONVERSATION from '../../utils/queries/CREATE_CONVERSATION';
import CREATE_MESSAGE from '../../utils/queries/CREATE_MESSAGE';
import CREATE_ACTIVITY from '../../utils/queries/CREATE_ACTIVITY';

import { MESSAGE } from '../../utils/activityTypes';

class Contact extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            message: '',
            sent: false
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(e) {
        this.setState({message: e.target.value})
    }

    onSubmit(e) {
        e.preventDefault();
        this.props.client.mutate({
            mutation: CREATE_CONVERSATION,
            variables: {
                item: this.props.item._id,
                userFrom: this.props.auth.user._id,
                userTo: this.props.item.user._id,
                messages: [],
            }
        })
            .then(
                conversation => {
                    console.log(conversation.data);

                    this.props.client.mutate({
                        mutation: CREATE_MESSAGE,
                        variables: {
                            conversation: conversation.data.createConversation,
                            item: this.props.item._id,
                            userFrom: this.props.auth.user._id,
                            userTo: this.props.item.user._id,
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
                                    user: this.props.auth.user._id,
                                    activityId: message.data.createMessage,
                                    viewed: false,
                                    date: new Date().toISOString(),
                                    message: message.data.createMessage,
                                }
                            })
                                .then(activity => {
                                    this.setState({sent: true});
                                })
                                .catch(activityErr => {
                                    console.log(activityErr)
                                })
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

    render() {
        if (this.props.visible) {
            if (!this.state.sent) {
                return(
                    <div className="ui-block-content">
                        <div>
                            <label className="control-label">Message</label>
                            <textarea
                                name="message"
                                className="form-control"
                                value={this.state.message}
                                onChange={this.onChange}
                            />
                            <button className="btn btn-lg btn-green full-width"
                                    onClick={this.onSubmit}
                            >
                                Send
                            </button>
                        </div>
                    </div>
                )
            }
            else {
                return (
                    <h5 className="bold">Message sent!</h5>
                )
            }
        }
        else {
            return null
        }
    }
}

Contact.propTypes = {
    visible: PropTypes.bool.isRequired,
    item: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
};

export default withApollo(Contact);