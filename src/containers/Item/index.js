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
import SendRequest from '../../components/Item/SendRequest';
import SendOffer from '../../components/Item/SendOffer';

import { addFlashMessage, deleteFlashMessage } from "../../redux/actions/flashMessages";
import { setCurrentUser } from "../../redux/actions/authActions";
import CANCEL_REQUEST from "../../utils/queries/CANCEL_REQUEST";
import ReviewStars from "../../components/User/ReviewStars";
import OfferPreview from "../../components/Item/OfferPreview";
import Image from '../../components/Image';
import DELETE_ITEM from "../../utils/queries/DELETE_ITEM";
import ACTIVATE_ITEM from "../../utils/queries/ACTIVATE_ITEM";

class Item extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: props.auth.user,
            item: {},
            loading: true,
            message: '',
            contact: {
                visible: false,
            },
            request: {
                visible: false,
            },
            requested: false,
            requestedId: '',
            activeTransaction: false,
            selected: "",
            selectedIsActive: false,
        };


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
                            loading: false,
                        },
                            () => {

                                // check if there is an active transaction for this user and item
                                this.state.item.transactions.forEach(transactionObj => {
                                    if (transactionObj.userFrom._id === this.props.auth.user._id && transactionObj.active) {
                                        this.setState({activeTransaction: transactionObj._id})
                                    }
                                });

                                if (this.props.auth.user._id !== this.state.item.user._id) {
                                    const itemRequestList = [];
                                    this.state.item.requests.forEach(req => {
                                        itemRequestList.push(req._id)
                                    });
                                    this.props.auth.user.requests.forEach(
                                        requestId => {
                                            if (itemRequestList.indexOf(requestId) > -1) {

                                                this.state.item.requests.forEach(itemReq => {
                                                    if (itemReq._id === requestId) {
                                                        if (itemReq.active) {
                                                            this.setState({
                                                                requested: true,
                                                                requestedId: requestId,
                                                            })
                                                        }
                                                    }
                                                });
                                            }
                                        }
                                    )
                                }
                            }
                        )
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

    onChangeMessage(e) {
        this.setState({message: e.target.value})
    }

    toggleContact() {
        if (this.state.request.visible) {
            this.toggleRequest()
        }
        this.setState({contact: {visible: !this.state.contact.visible}})
    }

    toggleRequest() {
        if (this.state.contact.visible) {
            this.toggleContact()
        }
        this.setState({request: {visible: !this.state.request.visible}})
    }

    cancelRequest() {
        this.props.client.mutate({
            mutation: CANCEL_REQUEST,
            variables: {
                _id: this.state.requestedId,
                userFrom: this.props.auth.user._id,
                userTo: this.state.item.user._id,
                date: new Date().toISOString(),
            }
        })
            .then(
                res => {
                    this.props.setCurrentUser(res.data.cancelRequest.token);
                    this.setState({
                        requested: false,
                        requestedId: "",
                    })
                }
            )
            .catch( err => {
                console.log(err)
            })
    }

    setRequested(requestedId) {
        this.setState({
            requested: true,
            requestedId: requestedId
        })
    }

    setSelected(selectedId, active) {
        this.setState({
            selected: selectedId,
            selectedIsActive: active,
        })
    }

    deleteItem(e) {
        this.props.client.mutate({
            mutation: DELETE_ITEM,
            variables: {
                _id: this.state.item._id,
                date: new Date().toISOString(),
            },
        }).then(res => {
            window.location.reload()
        })
    }

    activateItem(e) {
        this.props.client.mutate({
            mutation: ACTIVATE_ITEM,
            variables: {
                _id: this.state.item._id,
                date: new Date().toISOString(),
            },
        }).then(res => {
            window.location.reload()
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

                        <div className="col-xl-3 order-xl-1 col-lg-3 order-lg-1 col-md-12 order-md-2 col-sm-12 col-xs-12 responsive-display-none">
                            <div className="ui-block">
                                <div className="ui-block-title">
                                    <h5 className="h5 bold">
                                        {this.state.item.name}
                                    </h5>
                                </div>

                                <div className="ui-block-content">
                                    <div>
                                        by <a href={`/user/${this.state.item.user._id}`}>{this.state.item.user.firstName} {this.state.item.user.lastName} </a>
                                        {this.state.item.user.reviews.length > 0
                                            ? <ReviewStars
                                                reviews={this.state.item.user.reviews}
                                                userOtherId={this.state.item.user._id}
                                                ratingLabel={false}
                                            />
                                            : <div>No reviews yet</div>
                                        }
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
                                <div className="ui-block-title bold">
                                    Location
                                </div>
                                <div className="ui-block-content">
                                    <div>
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
                        </div>


                        {this.state.item.type === "offer"
                            ? <div className="col-xl-6 order-xl-1 col-lg-6 order-lg-1 col-md-12 order-md-2 col-sm-12 col-xs-12 responsive-display-none">
                                <div className="ui-block">
                                    <div className="ui-block-content">
                                        <Image
                                            src={this.state.item.picturePath}
                                            width="100%"
                                            height="100%"
                                        />
                                    </div>
                                </div>
                            </div>
                            : <div className="col-xl-3 order-xl-3 col-lg-3 order-lg-3 col-md-12 order-md-2 col-sm-12 col-xs-12 responsive-display-none">
                                {this.state.item.user._id !== this.props.auth.user._id
                                    ? this.state.activeTransaction
                                        ? <div className="ui-block" style={{textAlign: "center"}}>
                                            <div className="ui-block-content bold">
                                                This item is currently lent
                                            </div>
                                            <div className="ui-block-content">
                                                <a href={`/profile/transaction/${this.state.activeTransaction}`} className="btn btn-lg btn-blue full-width">Transaction</a>
                                            </div>
                                        </div>
                                        : <div>
                                            <div className="ui-block">
                                                <div className="ui-block-content">
                                                    <button onClick={this.toggleContact.bind(this)} className="btn btn-lg btn-blue full-width">Ask question</button>
                                                    <Contact
                                                        visible={this.state.contact.visible}
                                                        item={this.state.item}
                                                        auth={this.props.auth}
                                                    />
                                                </div>
                                            </div>
                                            <div className="ui-block">
                                                <div className="ui-block-content" style={{textAlign: "center"}}>
                                                    {this.state.requested
                                                        ? <button onClick={this.cancelRequest.bind(this)} className="btn btn-lg btn-danger full-width">Cancel offer</button>
                                                        : this.state.item.active
                                                            ? <div>
                                                                <button onClick={this.toggleRequest.bind(this)} className="btn btn-lg btn-green full-width">Offer</button>
                                                                <SendOffer
                                                                    visible={this.state.request.visible}
                                                                    item={this.state.item}
                                                                    selected={this.state.selected}
                                                                    user={this.props.auth.user}
                                                                    setCurrentUser={this.props.setCurrentUser}
                                                                    setRequested={this.setRequested.bind(this)}
                                                                    setSelected={this.setSelected.bind(this)}
                                                                    selectedIsActive={this.state.selectedIsActive}
                                                                    push={this.props.push}
                                                                />
                                                            </div>
                                                            : <div className="bold">This item is currently lent</div>
                                                    }
                                                </div>
                                            </div>

                                        </div>
                                    : <div className="ui-block">
                                        <div className="ui-block-content">
                                            {this.state.item.active
                                                ? <button onClick={this.deleteItem.bind(this)} className="btn btn-lg btn-danger full-width">Delete</button>
                                                : <button onClick={this.activateItem.bind(this)} className="btn btn-lg btn-green full-width">Reactivate</button>
                                            }
                                        </div>
                                    </div>
                                }
                            </div>

                        }

                        {this.state.item.type === "offer"
                            ? <div className="col-xl-3 order-xl-3 col-lg-3 order-lg-3 col-md-12 order-md-2 col-sm-12 col-xs-12 responsive-display-none">
                                {this.state.item.user._id !== this.props.auth.user._id
                                    ? this.state.activeTransaction
                                        ? <div className="ui-block" style={{textAlign: "center"}}>
                                            <div className="ui-block-content bold">
                                                This item is currently lent
                                            </div>
                                            <div className="ui-block-content">
                                                <a href={`/profile/transaction/${this.state.activeTransaction}`} className="btn btn-lg btn-blue full-width">Transaction</a>
                                            </div>
                                        </div>
                                        : <div>
                                            <div className="ui-block">
                                                <div className="ui-block-content">
                                                    <button onClick={this.toggleContact.bind(this)} className="btn btn-lg btn-blue full-width">Ask question</button>
                                                    <Contact
                                                        visible={this.state.contact.visible}
                                                        item={this.state.item}
                                                        auth={this.props.auth}
                                                    />
                                                </div>
                                            </div>
                                            <div className="ui-block">
                                                <div className="ui-block-content" style={{textAlign: "center"}}>
                                                    {this.state.requested
                                                        ? <button onClick={this.cancelRequest.bind(this)} className="btn btn-lg btn-danger full-width">Cancel request</button>
                                                        : this.state.item.active
                                                            ? <div>
                                                                <button onClick={this.toggleRequest.bind(this)} className="btn btn-lg btn-green full-width">Request</button>
                                                                <SendRequest
                                                                    visible={this.state.request.visible}
                                                                    item={this.state.item}
                                                                    user={this.props.auth.user}
                                                                    setCurrentUser={this.props.setCurrentUser}
                                                                    setRequested={this.setRequested.bind(this)}
                                                                />
                                                            </div>
                                                            : <div className="bold">This item is currently lent</div>
                                                    }
                                                </div>
                                            </div>

                                        </div>
                                    : <div className="ui-block">
                                        <div className="ui-block-content">
                                            {this.state.item.active
                                                ? <button onClick={this.deleteItem.bind(this)} className="btn btn-lg btn-danger full-width">Delete</button>
                                                : <button onClick={this.activateItem.bind(this)} className="btn btn-lg btn-green full-width">Reactivate</button>
                                            }
                                        </div>
                                    </div>
                                }
                            </div>
                            : this.state.item.user._id !== this.props.auth.user._id
                                ? <div className="col-xl-6 order-xl-1 col-lg-6 order-lg-1 col-md-12 order-md-2 col-sm-12 col-xs-12 responsive-display-none">
                                    {this.state.selected === ""
                                        ? <div className="ui-block">
                                            <div className="ui-block-content">
                                                <div className="ui-block-title">
                                                    <h5 className="h5 bold">Select an item to offer</h5>
                                                </div>
                                            </div>
                                        </div>
                                        : <OfferPreview
                                            itemId={this.state.selected}
                                        />
                                    }
                                </div>
                                : ""

                        }




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
        setCurrentUser: (userToken) => dispatch(setCurrentUser(userToken)),
        addFlashMessage: (msg) => dispatch(addFlashMessage(msg)),
        deleteFlashMessage: () => dispatch(deleteFlashMessage()),
    }
};

export default withApollo(connect(mapStateToProps, mapDispatchToProps)(Item));