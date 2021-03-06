import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { withApollo } from 'react-apollo'

import TopHeader from '../../components/Profile/TopHeader';
import Historial from '../../components/Conversation/Historial';
import MessageList from "../../components/Conversation/MessageList";
import CONVERSATIONS_QUERY from "../../utils/queries/CONVERSATIONS_QUERY";
import VIEW_MESSAGE from "../../utils/queries/VIEW_MESSAGE";
import {setCurrentUser} from "../../redux/actions/authActions";

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
                res.data.conversationsByUserId.conversations.forEach(conv => {
                    if (conv._id === this.props.match.params.id) {;
                        this.setState(
                            {
                                conversations: res.data.conversationsByUserId.conversations.slice().sort(
                                    function compare(a, b) {
                                        if (a.lastDate < b.lastDate) return 1;
                                        if (a.lastDate > b.lastDate) return -1;
                                        return 0;
                                    }
                                ),
                                conversation: conv,

                            }, () => {
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
                    }
                })
            })
            .catch(error => {
                console.log(error);
            })
    }

    setConversation(e) {
        this.state.conversations.forEach(conv => {
            if (conv._id === e.target.id) {
                this.props.push(`/profile/messages/${conv._id}`)
            }
        });
    }

    render() {
        return (
            <div>
                <div className="row">
                    <TopHeader
                        user={this.props.user}
                        active='messages'
                        lastConversationId={this.props.lastConversationId}
                        lastRequestId={this.props.lastRequestId}
                        lastTransactionId={this.props.lastTransactionId}
                        auth={this.props.auth}
                    />
                </div>

                <div className="row">
                    <div className="col-xl-3 order-xl-3 col-lg-3 order-lg-3 col-md-3 col-sm-12 col-xs-12">
                        <Historial
                            user={this.props.user}
                            conversations = {this.state.conversations}
                            setConversation = {this.setConversation.bind(this)}
                        />
                    </div>

                    <div className="col-xl-9 order-xl-9 col-lg-9 order-lg-9 col-md-9 col-sm-12 col-xs-12">
                        <MessageList
                            user={this.props.user}
                            conversation={this.state.conversation}
                            setCurrentUser={this.props.setCurrentUser}
                        />


                    </div>
                </div>
            </div>
        )
    }
}

Conversation.propTypes = {
    auth: PropTypes.object.isRequired,
    setCurrentUser: PropTypes.func.isRequired,
    lastConversationId: PropTypes.string.isRequired,
    lastTransactionId: PropTypes.string.isRequired,
    lastRequestId: PropTypes.string.isRequired,
};

const mapStateToProps = state => {
    return {
        auth: state.auth,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        setCurrentUser: (userToken) => {dispatch(setCurrentUser(userToken))}
    }
};

export default withApollo(connect(mapStateToProps, mapDispatchToProps)(Conversation));