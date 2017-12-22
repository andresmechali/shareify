import React from 'react';
import PropTypes from 'prop-types';

import { withApollo } from 'react-apollo';

import classNames from 'classnames';

import REQUEST_ITEM from "../../utils/queries/REQUEST_ITEM";

class RequestItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    onRequestItem() {

        this.props.client.mutate({
            query: REQUEST_ITEM,
            variables: {
                _id: this.props.user._id
            }
        })
            .then(res => {
                const activityIdList = [];
                res.data.activityByUserIdMessage.forEach(act => {activityIdList.push(act._id)});
                this.props.client.mutate({
                    mutation: VIEW_ACTIVITY,
                    variables: {
                        activityId: activityIdList,
                    }
                })
            })
            .catch(activityErr => {
                console.log(activityErr)
            });
    }

    render() {
        return (
            <div className="ui-block">
                <div className="ui-block-content">
                    <button className="btn btn-green btn-lg" onClick={this.onRequestItem.bind(this)}>Request item</button>
                </div>
            </div>
        )
    }
}

MessageList.propTypes = {
    user: PropTypes.object.isRequired,
    conversation: PropTypes.object.isRequired,
};

export default withApollo(MessageList);