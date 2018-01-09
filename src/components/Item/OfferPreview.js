import React from 'react';
import PropTypes from 'prop-types';

import { withApollo } from 'react-apollo';

import ITEM_QUERY from "../../utils/queries/ITEM_QUERY";

import Loading from '../../components/Loading/Bounce';
import Image from '../Image';

class OfferPreview extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            item: false,
        }
    }

    componentDidMount() {
        this.props.client.query({
            query: ITEM_QUERY,
            variables: {
                _id: this.props.itemId
            }
        })
            .then(item => {
                this.setState({item: item.data.itemById})
            })
            .catch(err => {
                console.log(err);
            })
    }

    componentDidUpdate() {
        if (this.props.itemId !== this.state.item._id) {
            this.props.client.query({
                query: ITEM_QUERY,
                variables: {
                    _id: this.props.itemId
                }
            })
                .then(item => {
                    this.setState({item: item.data.itemById})
                })
                .catch(err => {
                    console.log(err);
                })
        }

    }

    render() {
        if (!this.state.item) {
            return (
                <div className="ui-block">
                    <div className="ui-block-content">
                        <Loading />
                    </div>
                </div>
            )
        }
        else {
            return (
                <div className="ui-block">
                    <div className="ui-block-title">
                        <h5 className="h5 bold">{this.state.item.name}</h5>
                    </div>
                    <div className="ui-block-content">
                        <Image
                            src={this.state.item.picturePath}
                            style={{height:"80%", width: "80%", paddingLeft: "10%", paddingTop: "5%"}}
                        />
                        <div>
                            <span className="bold">Description: </span>
                            <span>{this.state.item.description}</span>
                        </div>
                        <div>
                            <span className="bold">Location: </span>
                            <span>{this.state.item.location}</span>
                        </div>
                        <div>
                            <span className="bold">First time offered: </span>
                            <span>{new Date(this.state.item.created).toDateString()}</span>
                        </div>
                        <div>
                            <span className="bold">Views: </span>
                            <span>{this.state.item.viewCount}</span>
                        </div>
                        <div>
                            <span className="bold">Transactions: </span>
                            <span>{this.state.item.transactions.length}</span>
                        </div>
                        {!this.state.item.active
                            ? <div>
                                <span style={{color: "firebrick", marginRight: "10px"}} className="bold">This item is currently lent</span>
                                <a href={`/profile/transaction/${this.state.item.transactions[this.state.item.transactions.length - 1]._id}`} className="btn btn-blue">Transaction</a>
                            </div>
                            : ""
                        }
                    </div>
                </div>
            )
        }
    }
}

OfferPreview.propTypes = {
    itemId: PropTypes.string.isRequired,
};

export default withApollo(OfferPreview);