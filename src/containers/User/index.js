import React from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { withApollo } from 'react-apollo';

import Loading from '../../components/Loading/Bounce';

import About from '../../components/User/About';
import Reviews from '../../components/User/Reviews';
import MessageList from "../../components/Conversation/MessageList";

import USER_QUERY from '../../utils/queries/USER_QUERY';
import LastOffered from "../../components/User/LastOffered";
import LastRequested from "../../components/User/LastRequested";

class User extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            thisUser: {},
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
                })
            })
            .catch(err => {
                this.setState({
                    loading: false,
                    thisUser: false,
                })
            })
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
                            <Reviews
                                user={this.state.thisUser}
                                reviews={this.state.thisUser.reviews}
                            />
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

export default withApollo(connect(mapStateToProps)(User));