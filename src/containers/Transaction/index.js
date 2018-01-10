import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withApollo } from 'react-apollo';
import { push } from 'react-router-redux';

import { addFlashMessage, deleteFlashMessage } from "../../redux/actions/flashMessages";
import { setCurrentUser } from "../../redux/actions/authActions";

import TopHeader from '../../components/Profile/TopHeader';
import TransactionList from "../../components/Transaction/TransactionList";
import TransactionUser from "../../components/Transaction/TransactionUser";
import TransactionItem from "../../components/Transaction/TransactionItem";
import Menu from "../../components/Transaction/Menu";

//import filterActive from '../../utils/filterActive';
import RETURN_ITEM from "../../utils/queries/RETURN_ITEM";
import REVIEW_QUERY from "../../utils/queries/REVIEW_QUERY";
import Review from "../../components/Transaction/Review";

class Transaction extends React.Component {

    constructor(props) {
        super(props);
        let activeTransaction = {};
        //console.log(filterActive(props.user.transactions));
        //console.log(filterActive(props.user.requests));
        props.user.transactions.forEach(transaction => {
                if (transaction._id === props.match.params.id) {
                    activeTransaction = transaction
                }
            }
        );
        let activeReview = false;
        props.client.query({
            query: REVIEW_QUERY,
            variables: {
                transaction: activeTransaction._id,
                userFrom: props.auth.user._id,
            }
        })
            .then(res => {
                this.setState({activeReview: res.data.reviewByTransactionAndUserFrom})
            })
            .catch(err => {
                this.setState({activeReview: false})
            });
        this.state = {
            transactions: props.user.transactions,
            transaction: activeTransaction,
            visibleReturn: false,
            rate: 0,
            comment: '',
            activeReview: activeReview,
        }
    }

    onReturn(e) {
        this.props.client.mutate({
            mutation: RETURN_ITEM,
            variables: {
                transaction: e.target.id,
                item: this.state.transaction.item._id,
                date: new Date().toISOString(),
                user: this.props.auth.user._id,
                userFrom: this.state.transaction.userFrom._id,
                userTo: this.state.transaction.userTo._id,
                comment: this.state.comment,
                rate: this.state.rate,
            }
        })
            .then(res => {
                this.props.setCurrentUser(res.data.returnItem.token);
                this.props.push('/profile/main')
            })
            .catch(err => {
                console.log(err)
            });
    }

    toggleReturn() {
        this.setState({
            visibleReturn: true,
        })
    }

    onChangeRate(e) {
        const value = parseInt(e.target.id, 10);
        if (value !== this.state.rate) {
            this.setState({rate: value})
        }
        else {
            this.setState({rate: 0})
        }
    }

    onChangeComment(e) {
        this.setState({comment: e.target.value});
    }

    setTransaction(e) {
        this.state.transactions.forEach(transaction => {
            if (transaction._id === e.target.id) {
                this.props.push(`/profile/transaction/${transaction._id}`)
            }
        });
    }

    render() {
        return (
            <div>
                <div className="row">
                    <TopHeader
                        user={this.props.user}
                        auth={this.props.auth}
                        active='transactions'
                        lastConversationId={this.props.lastConversationId}
                        lastRequestId={this.props.lastRequestId}
                        lastTransactionId={this.props.lastTransactionId}
                    />
                </div>

                <div className="row">
                    <div className="col-xl-3 order-xl-3 col-lg-3 order-lg-3 col-md-3 col-sm-12 col-xs-12">
                        <TransactionList
                            user={this.props.user}
                            transactions={this.state.transactions}
                            setTransaction={this.setTransaction.bind(this)}
                            activeTransaction={this.state.transaction}
                        />
                    </div>

                    <div className="col-xl-3 order-xl-3 col-lg-3 order-lg-3 col-md-3 col-sm-12 col-xs-12">
                        <TransactionUser
                            user={this.props.user}
                            activeTransaction={this.state.transaction}
                        />
                    </div>

                    <div className="col-xl-3 order-xl-3 col-lg-3 order-lg-3 col-md-3 col-sm-12 col-xs-12">
                        <TransactionItem
                            activeTransaction={this.state.transaction}
                        />
                    </div>

                    <div className="col-xl-3 order-xl-3 col-lg-3 order-lg-3 col-md-3 col-sm-12 col-xs-12">

                        {this.state.activeReview
                            ? <Review
                                user={this.props.auth.user}
                                review={this.state.activeReview}
                            />
                            : <Menu
                                user={this.props.auth.user}
                                visible={this.state.visibleReturn}
                                onReturn={this.onReturn.bind(this)}
                                toggleReturn={this.toggleReturn.bind(this)}
                                activeTransaction={this.state.transaction}
                                onChangeRate={this.onChangeRate.bind(this)}
                                rate={this.state.rate}
                                comment={this.state.comment}
                                onChangeComment={this.onChangeComment.bind(this)}
                            />
                        }

                    </div>
                </div>
            </div>
        )
    }
}

Transaction.propTypes = {
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

export default withApollo(connect(mapStateToProps, mapDispatchToProps)(Transaction));