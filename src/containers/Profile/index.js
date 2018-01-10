import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import { BrowserRouter, Route} from 'react-router-dom';

import { withApollo } from 'react-apollo';

import USER_QUERY from '../../utils/queries/USER_QUERY';

import { addFlashMessage, deleteFlashMessage } from "../../redux/actions/flashMessages";
import { setCurrentUser } from "../../redux/actions/authActions";

import Loading from '../../components/Loading/Bounce';

import Main from './Main';
import Settings from './Settings';
import Activity from '../../components/Profile/Activity';
import ChangePassword from "./ChangePassword";
import Conversation from '../../containers/Conversation';
import Offer from '../../containers/Offer';
import Request from '../../containers/Request';
import ItemRequest from '../../containers/ItemRequest';
import Transaction from '../../containers/Transaction';
import ChangeImage from "./ChangeImage";

class Profile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            user: {},
            loading: true,
            active: 'main',
            lastConversationId: '',
            lastRequestId: '',
            lastTransactionId: '',
            image: '',
        }
    }

    componentWillMount() {
        this.props.client.query({
            query: USER_QUERY,
            variables: {_id: this.props.auth.user._id},
        })
            .then(res => {
                let lastConversationId = res.data.userById.conversations.slice().sort(
                    function compare(a, b) {
                        if (a.lastDate < b.lastDate) return 1;
                        if (a.lastDate > b.lastDate) return -1;
                        return 0;
                    }
                )[0];
                let lastRequestId = res.data.userById.requests.slice().sort(
                    function compare(a, b) {
                        if (a.date < b.date) return 1;
                        if (a.date > b.date) return -1;
                        return 0;
                    }
                )[0];
                let lastTransactionId = res.data.userById.transactions.slice().sort(
                    function compare(a, b) {
                        if (a.dateCreated < b.dateCreated) return 1;
                        if (a.dateCreated > b.dateCreated) return -1;
                        return 0;
                    }
                )[0];
                this.setState({
                    user: res.data.userById,
                    loading: false,
                    lastConversationId: lastConversationId? lastConversationId._id : "",
                    lastRequestId: lastRequestId? lastRequestId._id : "",
                    lastTransactionId: lastTransactionId? lastTransactionId._id : "",
                })
            })
            .catch(err => {
                console.log(err);
                //this.props.push('/login');

            })
    }

    setImage(img) {
        if (typeof img === "object") {
            let reader = new FileReader();
            reader.readAsDataURL(img[0]);
            reader.onloadend = () => {
                this.setState({image: reader.result});
            };
        }
        else {
            this.setState({image: ''});
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
        return (
            <BrowserRouter>
                <div className="container user-profile">

                    <Route
                        path='/profile/main'
                        exact={true}
                        component={() => <Main
                                            user={this.state.user}
                                            auth={this.props.auth}
                                            lastConversationId={this.state.lastConversationId}
                                            lastRequestId={this.state.lastRequestId}
                                            lastTransactionId={this.state.lastTransactionId}
                                         />}
                    />

                    <Route
                        path='/profile/activity'
                        exact={true}
                        component={() => <Activity
                            user={this.state.user}
                            lastConversationId={this.state.lastConversationId}
                            lastRequestId={this.state.lastRequestId}
                            lastTransactionId={this.state.lastTransactionId}
                            auth={this.props.auth}
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
                                            lastConversationId={this.state.lastConversationId}
                                            lastRequestId={this.state.lastRequestId}
                                            lastTransactionId={this.state.lastTransactionId}
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
                            lastConversationId={this.state.lastConversationId}
                            lastRequestId={this.state.lastRequestId}
                            lastTransactionId={this.state.lastTransactionId}
                        />}
                    />

                    <Route
                        path='/profile/settings/picture'
                        exact={true}
                        component={() => <ChangeImage
                            user={this.state.user}
                            auth={this.props.auth}
                            flashMessages={this.props.flashMessages}
                            push={this.props.push}
                            setCurrentUser={this.props.setCurrentUser}
                            addFlashMessage={this.props.addFlashMessage}
                            deleteFlashMessage={this.props.deleteFlashMessage}
                            lastConversationId={this.state.lastConversationId}
                            lastRequestId={this.state.lastRequestId}
                            lastTransactionId={this.state.lastTransactionId}
                            setImage={this.setImage.bind(this)}
                            image={this.state.image}
                        />}
                    />

                    <Route
                        path='/profile/messages/:id'
                        render={(props) => <Conversation
                            {...props}
                            user={this.state.user}
                            auth={this.props.auth}
                            flashMessages={this.props.flashMessages}
                            push={this.props.push}
                            setCurrentUser={this.props.setCurrentUser}
                            addFlashMessage={this.props.addFlashMessage}
                            deleteFlashMessage={this.props.deleteFlashMessage}
                            lastConversationId={this.state.lastConversationId}
                            lastRequestId={this.state.lastRequestId}
                            lastTransactionId={this.state.lastTransactionId}
                        />}
                    />

                    <Route
                        path='/profile/request/:id'
                        render={(props) => <ItemRequest
                            {...props}
                            user={this.state.user}
                            auth={this.props.auth}
                            flashMessages={this.props.flashMessages}
                            push={this.props.push}
                            setCurrentUser={this.props.setCurrentUser}
                            addFlashMessage={this.props.addFlashMessage}
                            deleteFlashMessage={this.props.deleteFlashMessage}
                            lastConversationId={this.state.lastConversationId}
                            lastRequestId={this.state.lastRequestId}
                            lastTransactionId={this.state.lastTransactionId}
                        />}
                    />

                    <Route
                        path='/profile/transaction/:id'
                        render={(props) => <Transaction
                            {...props}
                            user={this.state.user}
                            auth={this.props.auth}
                            flashMessages={this.props.flashMessages}
                            push={this.props.push}
                            setCurrentUser={this.props.setCurrentUser}
                            addFlashMessage={this.props.addFlashMessage}
                            deleteFlashMessage={this.props.deleteFlashMessage}
                            lastConversationId={this.state.lastConversationId}
                            lastRequestId={this.state.lastRequestId}
                            lastTransactionId={this.state.lastTransactionId}
                        />}
                    />

                    <Route
                        path='/offer/new'
                        exact={true}
                        component={() => <Offer />}
                    />

                    <Route
                        path='/ask/new'
                        exact={true}
                        component={() => <Request />}
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
        setCurrentUser: (userToken) => dispatch(setCurrentUser(userToken)),
        addFlashMessage: (msg) => dispatch(addFlashMessage(msg)),
        deleteFlashMessage: () => dispatch(deleteFlashMessage()),
    }
};

export default withApollo(connect(mapStateToProps, mapDispatchToProps)(Profile));