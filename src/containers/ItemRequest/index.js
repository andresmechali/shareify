import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withApollo } from 'react-apollo';
import { push } from 'react-router-redux';

import { addFlashMessage, deleteFlashMessage } from "../../redux/actions/flashMessages";
import { setCurrentUser } from "../../redux/actions/authActions";

import TopHeader from '../../components/Profile/TopHeader';
import RequestList from "../../components/Request/RequestList";
import RequestUser from "../../components/Request/RequestUser";
import RequestItem from "../../components/Request/RequestItem";
import Respond from "../../components/Request/Respond";
import ACCEPT_REQUEST from "../../utils/queries/ACCEPT_REQUEST";
import REJECT_REQUEST from "../../utils/queries/REJECT_REQUEST";
import CREATE_TRANSACTION from "../../utils/queries/CREATE_TRANSACTION";

class ItemRequest extends React.Component {

    constructor(props) {
        super(props);
        let activeRequest = {};
        props.user.requests.forEach(request => {
                if (request._id === props.match.params.id) {
                    activeRequest = request
                }
            }
        );
        let activeTransaction = '';
        props.user.transactions.forEach(transaction => {
            if (transaction.request._id === activeRequest._id) {
                activeTransaction = transaction._id
            }
        });
        this.state = {
            requests: props.user.requests,
            request: activeRequest,
            transaction: activeTransaction,
        }
    }

    onAccept(e) {
        this.props.client.mutate({
            mutation: ACCEPT_REQUEST,
            variables: {
                _id: e.target.id,
                item: this.state.request.item._id,
                date: new Date().toISOString(),
                user: this.props.auth.user._id,
                userFrom: this.state.request.userFrom._id,
                userTo: this.state.request.userTo._id,
                message: "",
            }
        })
            .then(acceptRequest => {
                this.props.client.mutate({
                    mutation: CREATE_TRANSACTION,
                    variables: {
                        item: this.state.request.item._id,
                        user: this.props.auth.user._id,
                        userFrom: this.state.request.userFrom._id,
                        userTo: this.state.request.userTo._id,
                        dateCreated: new Date().toISOString(),
                        dateFinished: '',
                        active: true,
                        request: acceptRequest.data.acceptRequest,
                    }
                })
                    .then(newTransaction => {
                        this.props.setCurrentUser(newTransaction.data.createTransaction.token);
                        this.props.push('/profile/transaction/' + newTransaction.data.createTransaction.user.transactions[newTransaction.data.createTransaction.user.transactions.length - 1]._id)
                    })
                    .catch(err => {
                        console.log(err)
                    })
            })
            .catch(err => {
                console.log(err)
            });
    }

    onReject(e) {
        this.props.client.mutate({
            mutation: REJECT_REQUEST,
            variables: {
                _id: e.target.id,
                item: this.state.request.item._id,
                date: new Date().toISOString(),
                user: this.props.auth.user._id,
                userFrom: this.state.request.userFrom._id,
                userTo: this.state.request.userTo._id,
                message: "",
            }
        })
            .then(res => {
                this.props.setCurrentUser(res.data.rejectRequest.token);
                this.props.push('/profile/main')
            })
            .catch(err => {
                console.log(err)
            });
    }

    setRequest(e) {
        this.state.requests.forEach(request => {
            if (request._id === e.target.id) {
                this.props.push(`/profile/request/${request._id}`)
            }
        });
    }

    render() {
        return (
            <div>
                <div className="row">
                    <TopHeader
                        user={this.props.user}
                        active='requests'
                        lastConversationId={this.props.lastConversationId}
                        lastRequestId={this.props.lastRequestId}
                        lastTransactionId={this.props.lastTransactionId}
                    />
                </div>

                <div className="row">
                    <div className="col-xl-3 order-xl-3 col-lg-3 order-lg-3 col-md-3 col-sm-12 col-xs-12">
                        <RequestList
                            user={this.props.user}
                            requests={this.state.requests}
                            setRequest={this.setRequest.bind(this)}
                            activeRequest={this.state.request}
                        />
                    </div>

                    <div className="col-xl-3 order-xl-3 col-lg-3 order-lg-3 col-md-3 col-sm-12 col-xs-12">
                        <RequestUser
                            user={this.props.user}
                            activeRequest={this.state.request}
                        />
                    </div>

                    <div className="col-xl-3 order-xl-3 col-lg-3 order-lg-3 col-md-3 col-sm-12 col-xs-12">
                        <RequestItem
                            activeRequest={this.state.request}
                        />
                    </div>

                    <div className="col-xl-3 order-xl-3 col-lg-3 order-lg-3 col-md-3 col-sm-12 col-xs-12">
                        {console.log(this.state.request)}
                        {this.state.request.active
                            ? <Respond
                                onAccept={this.onAccept.bind(this)}
                                onReject={this.onReject.bind(this)}
                                activeRequest={this.state.request}
                            />
                            : this.state.request.accepted
                                ? <div className="ui-block" style={{textAlign: "center"}}>
                                    <div className="ui-block-content bold">
                                        This request has been <span style={{color: "green"}}>accepted</span>
                                    </div>
                                    <div className="ui-block-content">
                                        <a href={`/profile/transaction/${this.state.transaction}`} className="btn btn-lg btn-blue full-width">Transaction</a>
                                    </div>
                                </div>
                                : <div className="ui-block" style={{textAlign: "center"}}>
                                    <div className="ui-block-content bold">
                                        This request has been <span style={{color: "red"}}>rejected</span>
                                    </div>
                                </div>
                        }

                    </div>
                </div>
            </div>
        )
    }
}

ItemRequest.propTypes = {
    auth: PropTypes.object.isRequired,
    push: PropTypes.func.isRequired,
    addFlashMessage: PropTypes.func.isRequired,
    deleteFlashMessage: PropTypes.func.isRequired,
    setCurrentUser: PropTypes.func.isRequired,
    lastConversationId: PropTypes.string.isRequired,
    lastTransactionId: PropTypes.string.isRequired,
    lastRequestId: PropTypes.string.isRequired,
};

const mapStateToProps = state => {
    return {
        auth: state.auth
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

export default withApollo(connect(mapStateToProps, mapDispatchToProps)(ItemRequest));