import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { withApollo } from 'react-apollo'

import TopHeader from '../../components/Profile/TopHeader';
import Historial from '../../components/Conversation/Historial';
import MessageList from "../../components/Conversation/MessageList";
import CONVERSATIONS_QUERY from "../../utils/queries/CONVERSATIONS_QUERY";
import VIEW_MESSAGE from "../../utils/queries/VIEW_MESSAGE";

class Conversation extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            conversations: [],
            conversation: {}
        }
    }

    componentWillMount() {
        this.props.client.query({
            query: CONVERSATIONS_QUERY,
            variables: {
                _id: this.props.user._id
            }
        })
            .then(res => {
                this.setState(
                    {
                        conversations: res.data.conversationsByUserId.conversations,
                        conversation: res.data.conversationsByUserId.conversations[0]

                    }, r => {
                        this.props.client.mutate({
                            mutation: VIEW_MESSAGE,
                            variables: {
                                conversationId: this.state.conversation._id,
                                userId: this.props.user._id,
                                userFrom: this.state.conversation.messages[this.state.conversation.messages.length - 1].userFrom._id,
                            }
                        })
                            .catch(err => {
                                console.log(err)
                            })
                        })
            })
            .catch(error => {
                console.log(error);
            })
    }
    render() {
        return (
            <div>
                <div className="row">
                    <TopHeader
                        user={this.props.user}
                        active='messages'
                    />
                </div>

                <div className="row">
                    <div className="col-xl-3 order-xl-3 col-lg-3 order-lg-3 col-md-3 col-sm-12 col-xs-12">
                        <Historial
                            user={this.props.user}
                            conversations = {this.state.conversations}
                        />
                    </div>

                    <div className="col-xl-9 order-xl-9 col-lg-9 order-lg-9 col-md-9 col-sm-12 col-xs-12">
                        <MessageList
                            user={this.props.user}
                            conversation={this.state.conversation}
                        />
                    </div>
                </div>
            </div>
        )
    }
}

Conversation.propTypes = {
    auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
    return {
        auth: state.auth,
    };
};

export default withApollo(connect(mapStateToProps)(Conversation));