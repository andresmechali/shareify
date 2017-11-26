import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import { BrowserRouter, Route} from 'react-router-dom';

import { withApollo } from 'react-apollo';

import USER_QUERY from '../../utils/queries/USER_QUERY';

import { addFlashMessage, deleteFlashMessage } from "../../redux/actions/flashMessages";
import { setCurrentUser } from "../../redux/actions/authActions";

import Loading from '../../components/Loading/Bounce';
import TopHeader from '../../components/Profile/TopHeader';

import Main from './Main';
import Settings from './Settings';
import ChangePassword from "./ChangePassword";
import Offer from '../../containers/Offer';

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
                console.log('error:');
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
            <BrowserRouter>
                <div className="container user-profile">
                    <div className="row">
                        <TopHeader
                            user={this.state.user}
                        />
                    </div>

                    <Route
                        path='/profile/main'
                        exact={true}
                        component={() => <Main
                                            user={this.state.user}
                                         />}
                    />

                    <Route
                        path='/profile/settings'
                        exact={true}
                        component={() => <Settings
                                            user={this.state.user}
                                            auth={this.props.auth}
                                            flashMessages={this.props.flashMessages}
                                            push={this.props.push}
                                            setCurrentUser={this.props.setCurrentUser}
                                            addFlashMessage={this.props.addFlashMessage}
                                            deleteFlashMessage={this.props.deleteFlashMessage}
                                         />}
                    />

                    <Route
                        path='/profile/settings/password'
                        exact={true}
                        component={() => <ChangePassword
                            user={this.state.user}
                            auth={this.props.auth}
                            flashMessages={this.props.flashMessages}
                            push={this.props.push}
                            setCurrentUser={this.props.setCurrentUser}
                            addFlashMessage={this.props.addFlashMessage}
                            deleteFlashMessage={this.props.deleteFlashMessage}
                        />}
                    />

                    <Route
                        path='/offer/new'
                        exact={true}
                        component={() => <Offer />}
                    />

                </div>
            </BrowserRouter>
        )

    }
}

Profile.propTypes = {

};

const mapStateToProps = (state) => {
    return {
        auth: state.auth,
        flashMessages: state.flashMessages,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        push: (path) => dispatch(push(path)),
        setCurrentUser: (user) => dispatch(setCurrentUser(user)),
        addFlashMessage: (msg) => dispatch(addFlashMessage(msg)),
        deleteFlashMessage: () => dispatch(deleteFlashMessage()),
    }
};

export default withApollo(connect(mapStateToProps, mapDispatchToProps)(Profile));