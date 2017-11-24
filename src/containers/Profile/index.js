import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import { withApollo } from 'react-apollo';

import USER_QUERY from '../../utils/queries/USER_QUERY';

import { addFlashMessage, deleteFlashMessage } from "../../redux/actions/flashMessages";

import Loading from '../../components/Loading/Bounce';
import TopHeader from '../../components/Profile/TopHeader';
import About from '../../components/Profile/About';
import LastOffered from '../../components/Profile/LastOffered';
import LastRequested from '../../components/Profile/LastRequested';

class Profile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            user: {},
            loading: true
        }
    }

    componentWillMount() {
        this.props.client.query({
            query: USER_QUERY,
            variables: {_id: this.props.auth.user._id},
        })
            .then(res => {
                this.setState({
                    user: res.data.userById,
                    loading: false
                })
            })
            .catch(err => {
                console.log('error:')
                console.log(err)
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
        return (
            <div>
                <div className="container user-profile">
                    <div className="row">
                        <TopHeader
                            user={this.state.user}
                        />
                    </div>
                    
                    <div className="row">

                        <div className="col-xl-3 order-xl-3 col-lg-3 order-lg-3 col-md-3 col-sm-12 col-xs-12">
                            <About
                                title="Personal"
                                user={this.state.user}
                            />
                        </div>

                        <div className="col-xl-6 order-xl-2 col-lg-6 order-lg-1 col-md-6 col-sm-12 col-xs-12">
                            <div className="newsfeed-items-grid">
                                <div className="ui-block">
                                    <div className="ui-block-title">
                                        <h6 className="title bold">
                                            Asaadssadsad
                                        </h6>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-xl-3 order-xl-3 col-lg-3 order-lg-3 col-md-3 col-sm-12 col-xs-12">
                            <LastOffered
                                user={this.state.user}
                            />

                            <LastRequested
                                user={this.state.user}
                            />
                        </div>

                    </div>
                </div>
            </div>
        )

    }
}

Profile.propTypes = {

};

const mapStateToProps = (state) => {
    return {
        auth: state.auth
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        push: (path) => dispatch(push(path)),
        addFlashMessage: (msg) => dispatch(addFlashMessage(msg)),
        deleteFlashMessage: () => dispatch(deleteFlashMessage()),
    }
};

export default withApollo(connect(mapStateToProps, mapDispatchToProps)(Profile));