import React from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { withApollo } from 'react-apollo';

import Loading from '../../components/Loading/Bounce';

import About from '../../components/User/About';
import Reviews from '../../components/User/Reviews';
import Conversation from "../../components/User/Conversation";

import USER_QUERY from '../../utils/queries/USER_QUERY';
import LastOffered from "../../components/User/LastOffered";
import LastRequested from "../../components/User/LastRequested";

import { setCurrentUser } from "../../redux/actions/authActions";

class User extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            thisUser: {},
            thisConversation: null,
        }
    }

    componentWillMount() {
        this.props.client.query({
            query: USER_QUERY,
            variables: {
                _id: this.props.match.params.id
            }
        })
            .then(user => {
                this.setState({
                    loading: false,
                    thisUser: user.data.userById
                });
            })
            .catch(err => {
                this.setState({
                    loading: false,
                    thisUser: false,
                })
            })

    }

    componentDidUpdate() {
        // check if there is a conversation between these users
        if (this.state.thisConversation === null) {
            let thisConversation = false;
            if (!this.state.thisConversation) {
                this.state.thisUser.conversations.forEach(conversation => {
                    if (conversation.userFrom._id === this.props.user._id || conversation.userTo._id === this.props.user._id) {
                        thisConversation = conversation
                    }
                })
            }
            this.setState({thisConversation: thisConversation})
        }
    }

    render() {
        if (this.state.loading) {
            return (
                <div className="container">
                    <Loading />
                </div>
            )
        }
        if (this.state.thisUser) {
            return (
                <div className="container">
                    <div className="row">
                        <div className="col-xl-3 order-xl-3 col-lg-3 order-lg-3 col-md-3 col-sm-12 col-xs-12">
                            <About
                                title={`${this.state.thisUser.firstName} ${this.state.thisUser.lastName}`}
                                user={this.state.thisUser}
                            />
                        </div>

                        <div className="col-xl-3 order-xl-3 col-lg-3 order-lg-3 col-md-3 col-sm-12 col-xs-12">
                            {this.state.thisUser.reviews.length > 0
                                ? <Reviews
                                    user={this.state.thisUser}
                                    reviews={this.state.thisUser.reviews}
                                />
                                : <div className="ui-block">
                                    <div className="ui-block-title">
                                        <h6 className="title bold">
                                            No reviews yet
                                        </h6>
                                    </div>
                                </div>
                            }
                        </div>

                        <div className="col-xl-3 order-xl-3 col-lg-3 order-lg-3 col-md-3 col-sm-12 col-xs-12">
                            <LastOffered
                                user={this.state.thisUser}
                            />
                            <LastRequested
                                user={this.state.thisUser}
                            />
                        </div>

                        <div className="col-xl-3 order-xl-3 col-lg-3 order-lg-3 col-md-3 col-sm-12 col-xs-12">
                            {this.state.thisConversation === null
                                ? <Loading/>
                                : this.state.thisConversation === false
                                    ? <Conversation
                                        user={this.props.user}
                                        userOther={this.state.thisUser}
                                        conversation={{}}
                                        setCurrentUser={this.props.setCurrentUser}
                                    />
                                    : <Conversation
                                        user={this.props.user}
                                        userOther={this.state.thisUser}
                                        conversation={this.state.thisConversation}
                                        setCurrentUser={this.props.setCurrentUser}
                                    />
                            }
                        </div>

                    </div>
                </div>
            )
        }
        return (
            <div className="container">
                <div className="row bold">
                    This user doesn't exist
                </div>
            </div>
        )

    }
}

User.propTypes = {
    user: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
    return {
        user: state.auth.user,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        setCurrentUser: (userToken) => dispatch(setCurrentUser(userToken)),
    }
};

export default withApollo(connect(mapStateToProps, mapDispatchToProps)(User));