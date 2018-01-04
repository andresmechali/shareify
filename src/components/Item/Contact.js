import React from 'react';
import PropTypes from 'prop-types';

import { withApollo } from 'react-apollo';

import CREATE_CONVERSATION from '../../utils/queries/CREATE_CONVERSATION';
import CREATE_MESSAGE from '../../utils/queries/CREATE_MESSAGE';

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
                userFrom: this.props.auth.user._id,
                userTo: this.props.item.user._id,
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
                            userFrom: this.props.auth.user._id,
                            userTo: this.props.item.user._id,
                            message: this.state.message,
                            date: new Date().toISOString(),
                            read: false,
                        }
                    })
                        .then(message => {
                            this.setState({sent: true});
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
                            <button className="btn btn-lg btn-blue full-width"
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