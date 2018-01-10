import React from 'react';
import PropTypes from 'prop-types';

import { withApollo } from 'react-apollo';

import classNames from 'classnames';

import REQUEST_ITEM from "../../utils/queries/REQUEST_ITEM";
import USER_QUERY from "../../utils/queries/USER_QUERY";

import Loading from '../../components/Loading/Bounce';
import Image from "../Image/index";

class SendOffer extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            message: '',
            sent: false,
            items: false,
            selected: '',
        };
    }

    onChange(e) {
        this.setState({message: e.target.value})
    }

    componentWillMount() {
        this.props.client.query({
            query: USER_QUERY,
            variables: {
                _id: this.props.user._id
            }
        })
            .then(res => {
                this.setState({items: res.data.userById.offered})
            })
            .catch(err => {
                //
            })
    }

    offerItem() {
        this.props.client.mutate({
            mutation: REQUEST_ITEM,
            variables: {
                item: this.props.selected,
                userFrom: this.props.user._id,
                userTo: this.props.item.user._id,
                message: this.state.message,
                date: new Date().toISOString(),
                active: true,
                viewed: false,
                accepted: false,
                responseDate: "",
                responseMessage: "",
            },
        })
            .then(res => {
                this.setState({sent: true});
                this.props.setCurrentUser(res.data.createRequest.token);
                this.props.setRequested(res.data.createRequest.user.requests[res.data.createRequest.user.requests.length - 1]._id);
            })
            .catch(err => {
                console.log(err)
            })
    }

    selectItem(e) {
        e.preventDefault();
        const split = e.target.id.split(" ");
        const id = split[0];
        const active = Boolean(split[1]);
        this.setState({selected: id});
        this.props.setSelected(id, active);
    }

    newOffer() {
        this.props.push('/offer/new')
    }

    render() {
        if (this.props.visible) {
            if (!this.state.sent) {
                return(
                    <div className="ui-block-content">
                        <div>
                            {!this.state.items
                                ? <Loading />
                                : <ul className="widget w-playlist">
                                    {this.state.items.map((item, key) => {
                                        return <li
                                                    key={key}
                                                    id={`${item._id} ${item.active}`}
                                                    onClick={this.selectItem.bind(this)}
                                                    className={classNames({'selected-item': item._id === this.state.selected})}
                                                    style={{paddingBottom: "10px", paddingTop: "10px"}}
                                        >
                                                <div className="playlist-thumb" id={`${item._id} ${item.active}`} onClick={this.selectItem.bind(this)}>
                                                    <Image
                                                        src={item.picturePath}
                                                        width="30px"
                                                        height="30px"
                                                        id={`${item._id} ${item.active}`}
                                                        onClick={this.selectItem.bind(this)}
                                                    />
                                                </div>
                                                <div className="composition" id={`${item._id} ${item.active}`} onClick={this.selectItem.bind(this)}>
                                                    {item.name}
                                                </div>
                                        </li>
                                    })}
                                    <li
                                        id='newOffer'
                                        onClick={this.newOffer.bind(this)}
                                        className={classNames({'selected-item': this.state.selected === "newOffer"})}
                                        style={{paddingBottom: "10px", paddingTop: "10px"}}
                                    >
                                        <div className="composition" onClick={this.newOffer.bind(this)}>
                                            <span className="bold h4">+ </span> Add new item
                                        </div>
                                    </li>
                                </ul>
                            }


                            <label className="control-label">Message</label>
                            <textarea
                                name="message"
                                className="form-control"
                                value={this.state.message}
                                onChange={this.onChange.bind(this)}
                            />
                            <button className={classNames("btn btn-lg btn-green full-width",
                                {
                                    "disabled": !this.state.selected || this.state.message === "" || !this.props.selectedIsActive
                                })}
                                    onClick={this.offerItem.bind(this)}
                                    style={{marginTop: "13px"}}
                            >
                                Send
                            </button>
                        </div>
                    </div>
                )
            }
            else {
                return (
                    <h5 className="bold">Item offered!</h5>
                )
            }
        }
        else {
            return null
        }
    }
}

SendOffer.propTypes = {
    visible: PropTypes.bool.isRequired,
    item: PropTypes.object.isRequired,
    selected: PropTypes.string.isRequired,
    user: PropTypes.object.isRequired,
    setCurrentUser: PropTypes.func.isRequired,
    setRequested: PropTypes.func.isRequired,
    setSelected: PropTypes.func.isRequired,
    selectedIsActive: PropTypes.bool.isRequired,
    push: PropTypes.func.isRequired,
};

export default withApollo(SendOffer);