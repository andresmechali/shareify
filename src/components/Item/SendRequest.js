import React from 'react';
import PropTypes from 'prop-types';

import { withApollo } from 'react-apollo';

import REQUEST_ITEM from "../../utils/queries/REQUEST_ITEM";

class SendRequest extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            message: '',
            sent: false
        };
    }

    onChange(e) {
        this.setState({message: e.target.value})
    }

    requestItem() {
        this.props.client.mutate({
            mutation: REQUEST_ITEM,
            variables: {
                item: this.props.item._id,
                userFrom: this.props.user._id,
                userTo: this.props.item.user._id,
                message: this.state.message,
                date: new Date().toISOString(),
                active: true,
                viewed: false,
                accepted: false,
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

    render() {
        if (this.props.visible) {
            if (!this.state.sent) {
                return(
                    <div className="ui-block-content">
                        <div>
                            <label className="control-label">Message</label>
                            <textarea
                                name="message"
                                className="form-control"
                                value={this.state.message}
                                onChange={this.onChange.bind(this)}
                            />
                            <button className="btn btn-lg btn-green full-width"
                                    onClick={this.requestItem.bind(this)}
                            >
                                Send
                            </button>
                        </div>
                    </div>
                )
            }
            else {
                return (
                    <h5 className="bold">Message sent!</h5>
                )
            }
        }
        else {
            return null
        }
    }
}

SendRequest.propTypes = {
    visible: PropTypes.bool.isRequired,
    item: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    setCurrentUser: PropTypes.func.isRequired,
    setRequested: PropTypes.func.isRequired,
};

export default withApollo(SendRequest);