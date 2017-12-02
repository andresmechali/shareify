import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { push } from 'react-router-redux';

import { withApollo } from 'react-apollo';
import ITEM_QUERY from '../../utils/queries/ITEM_QUERY';
import CREATE_VIEW from '../../utils/queries/CREATE_VIEW';

import Loading from '../../components/Loading/Bounce';

import { addFlashMessage, deleteFlashMessage } from "../../redux/actions/flashMessages";
import { setCurrentUser } from "../../redux/actions/authActions";

class Item extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: props.auth.user,
            item: {},
            loading: true
        }
    }

    componentWillMount() {

        this.props.client.mutate({
            mutation: CREATE_VIEW,
            variables: {
                user: this.props.auth.user._id,
                item: this.props.match.params.id,
                date: new Date().toISOString(),
            },
        })
            .then(viewCreated => {
                this.props.client.query({
                    query: ITEM_QUERY,
                    variables: {
                        _id: this.props.match.params.id,
                    },
                })
                    .then(res => {
                        this.setState({
                            item: res.data.itemById,
                            loading: false
                        })
                    })
                    .catch(err => {
                        console.log('error:');
                        console.log(err)
                    });
            })
            .catch(err => {
                console.log('error:');
                console.log(err)
            })


    }



    render() {
        if (this.state.loading) {
            return <Loading />
        }
        else {
            return (
                <div className="container">
                    <div className="row">
                        <div className="ui-block">
                            <div className="ui-block-title">
                                <h6 className="title bold">
                                    Item
                                </h6>
                            </div>

                            <div className="ui-block-content">
                                <div>
                                    <span className="bold">Item: </span>
                                    {this.state.item.name}
                                </div>
                                <div>
                                    <span className="bold">Description: </span>
                                    {this.state.item.description}
                                </div>
                                <div>
                                    <span className="bold">Created: </span>
                                    {new Date(this.state.item.created).toDateString()}
                                </div>
                                <div>
                                    <span className="bold">Location: </span>
                                    {this.state.item.location} ({this.state.item.latitude}, {this.state.item.longitude})
                                </div>
                                <div>
                                    <span className="bold">User: </span>
                                    {this.state.item.user.firstName} {this.state.item.user.lastName}
                                </div>

                                <div>
                                    <span className="bold">Views: </span>
                                    {this.state.item.viewCount}
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            )
        }

    }
}

Item.propTypes = {
    auth: PropTypes.object.isRequired,
    flashMessages: PropTypes.array.isRequired,
    push: PropTypes.func.isRequired,
    setCurrentUser: PropTypes.func.isRequired,
    addFlashMessage: PropTypes.func.isRequired,
    deleteFlashMessage: PropTypes.func.isRequired
};

const mapStateToProps = state => {
    return {
        auth: state.auth,
        flashMessages: state.flashMessages,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        push: (path) => dispatch(push(path)),
        setCurrentUser: (user) => dispatch(setCurrentUser(user)),
        addFlashMessage: (msg) => dispatch(addFlashMessage(msg)),
        deleteFlashMessage: () => dispatch(deleteFlashMessage()),
    }
};

export default withApollo(connect(mapStateToProps, mapDispatchToProps)(Item));