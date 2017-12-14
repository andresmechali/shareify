import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { push } from 'react-router-redux';

import { withApollo } from 'react-apollo';
import ITEM_QUERY from '../../utils/queries/ITEM_QUERY';
import CREATE_VIEW from '../../utils/queries/CREATE_VIEW';

import Loading from '../../components/Loading/Bounce';
import Map from '../../components/Maps/Map';

import Contact from '../../components/Item/Contact';

import { addFlashMessage, deleteFlashMessage } from "../../redux/actions/flashMessages";
import { setCurrentUser } from "../../redux/actions/authActions";

class Item extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: props.auth.user,
            item: {},
            loading: true,
            contact: {
                visible: false,
            }
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

    showContact(e) {
        this.setState({contact: {visible: true}})
    }

    render() {
        if (this.state.loading) {
            return <Loading />
        }
        else {
            return (
                <div className="container">
                    <div className="row">
                        <div className="col-xl-8 order-xl-1 col-lg-8 order-lg-1 col-md-12 order-md-2 col-sm-12 col-xs-12 responsive-display-none">
                            <div className="ui-block">
                                <div className="ui-block-content">
                                    <img src={require(`../../images/${this.state.item.picturePath}`)}
                                         alt='item'
                                         width="100%"
                                         height="100%"
                                    />
                                </div>

                            </div>
                        </div>
                        <div className="col-xl-4 order-xl-1 col-lg-4 order-lg-1 col-md-12 order-md-2 col-sm-12 col-xs-12 responsive-display-none">
                            <div className="ui-block">
                                <div className="ui-block-title">
                                    <h4 className="title bold">
                                        {this.state.item.name}
                                    </h4>
                                </div>

                                <div className="ui-block-content">
                                    <div>
                                        by <a href={`/user/${this.state.item.user._id}`}>{this.state.item.user.firstName} {this.state.item.user.lastName} </a>
                                        <span className="fa fa-star checked" />
                                        <span className="fa fa-star checked" />
                                        <span className="fa fa-star checked" />
                                        <span className="fa fa-star checked" />
                                        <span className="fa fa-star" />
                                    </div>
                                    <div>
                                        <span className="bold">Created: </span>
                                        {new Date(this.state.item.created).toLocaleDateString("en-GB")}
                                    </div>
                                    <div>
                                        <span className="bold">Views: </span>
                                        {this.state.item.viewCount}
                                    </div>
                                    <br/>
                                    <div>
                                        <h4>
                                            {this.state.item.description}
                                        </h4>
                                    </div>
                                </div>
                            </div>
                            <div className="ui-block">
                                <div className="ui-block-content">
                                    <div>
                                        <span className="bold">Location: </span>
                                        {this.state.item.location}
                                    </div>
                                    <Map
                                        googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyA8zfwWQ-K9UXLe64adjv_dn8ELzk6yLdA&libraries=geometry,drawing,places"
                                        loadingElement={<div></div>}
                                        containerElement={<div style={{ height: `300px`, verticalAlign:`inherit`}} />}
                                        mapElement={<div style={{ height: `100%` }} />}
                                        latitude={this.state.item.latitude}
                                        longitude={this.state.item.longitude}
                                        radiusOfSearch={15 * 1000}
                                    />
                                </div>
                            </div>
                            {this.state.item.user._id !== this.props.auth.user._id?
                                <div className="ui-block">
                                    <div className="ui-block-content">
                                        <button onClick={this.showContact.bind(this)} className="btn btn-lg btn-blue full-width">Contact</button>
                                        <Contact
                                            visible={this.state.contact.visible}
                                            item={this.state.item}
                                            auth={this.props.auth}
                                        />
                                    </div>
                                </div> : ""
                            }

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