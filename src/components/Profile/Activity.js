import React from 'react';
import PropTypes from 'prop-types';

import { IntlProvider } from 'react-intl';
import { FormattedMessage } from 'react-intl';
import moment from 'moment';

import createActivityList from '../../utils/createActivityList';

import { withApollo } from 'react-apollo';

import TopHeader from './TopHeader';

import {ITEM, SIGNUP, REQUEST, MESSAGE, TRANSACTION} from '../../utils/activityTypes';

class Activity extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            activities: createActivityList(props.user),
        }
    }

    render() {
        if (this.state.activities.length > 0){
            return(
                <div>
                    <div className="row">
                        <TopHeader
                            user={this.props.user}
                            active='activity'
                            lastConversationId={this.props.lastConversationId}
                            lastRequestId={this.props.lastRequestId}
                            lastTransactionId={this.props.lastTransactionId}
                        />
                    </div>

                    <div className="row">
                        <div className="col-xl-12 order-xl-12 col-lg-12 order-lg-12 col-md-12 col-sm-12 col-xs-12">
                            <IntlProvider locale='en'>
                                <div className="ui-block">
                                    <div className="ui-block-title">
                                        <h6 className="title bold">
                                            Activity
                                        </h6>
                                    </div>
                                    <div className="ui-block-content">
                                        <ul>
                                            {this.state.activities.map((activity, key) => (
                                                <div key={key}>

                                                    {activity.type === SIGNUP
                                                        ? <li className="activity">
                                                            <FormattedMessage
                                                                id="activityItem"
                                                                defaultMessage='You have signed up'
                                                            />
                                                            <span className="date">{moment(activity.date).fromNow()}</span>
                                                        </li>
                                                        : ""
                                                    }

                                                    {activity.type === ITEM
                                                        ? <li className="activity">
                                                            <FormattedMessage
                                                                id="activityItem"
                                                                defaultMessage='You have {offered} a {item}'
                                                                values={{
                                                                    offered: activity.offered === true? "offered" : "requested",
                                                                    item: <a href={`/item/${activity.item._id}`}>{activity.item.name}</a>
                                                                }}
                                                            />
                                                            <span className="date">{moment(activity.date).fromNow()}</span>
                                                        </li>
                                                        : ""
                                                    }

                                                    {activity.type === MESSAGE && activity.own === true
                                                        ? <li className="activity">
                                                            <FormattedMessage
                                                                id="activityMessage"
                                                                defaultMessage='You sent a {message} to {user}'
                                                                values={{
                                                                    message: <a href={`/profile/messages/${activity.message.conversation._id}`}>message</a>,
                                                                    user: <a href={`/user/${activity.message.userTo._id}`}>{activity.message.userTo.firstName} {activity.message.userTo.lastName}</a>,
                                                                }}
                                                            />
                                                            <span className="date">{moment(activity.message.date).fromNow()}</span>
                                                        </li>
                                                        : ""
                                                    }

                                                    {activity.type === REQUEST
                                                        ? <li className="activity">
                                                            <FormattedMessage
                                                                id="activityRequest"
                                                                defaultMessage='You {received} a {request} {from} {user} for the {item}'
                                                                values={{
                                                                    received: activity.userFrom._id === this.props.user._id ? 'sent' : 'received',
                                                                    request: <a href={`/profile/request/${activity.request._id}`}>request</a>,
                                                                    from: activity.userFrom._id === this.props.user._id ? 'to' : 'from',
                                                                    user: <a href={`/user/${activity.userFrom._id}`}>{activity.userFrom.firstName}</a>,
                                                                    item: <a href={`/item/${activity.item._id}`}>{activity.item.name}</a>,
                                                                }}
                                                            />
                                                            <span className="date">{moment(activity.date).fromNow()}</span>
                                                        </li>
                                                        : ""
                                                    }

                                                    {activity.type === TRANSACTION
                                                        ? <li className="activity">
                                                            <FormattedMessage
                                                                id="activityTransaction"
                                                                defaultMessage='You {borrowed} a {item} {from} {user}'
                                                                values={{
                                                                    borrowed: activity.item.user._id === this.props.user._id ? 'lent' : 'borrowed',
                                                                    item: <a href={`/item/${activity.item._id}`}>{activity.item.name}</a>,
                                                                    from: activity.item.user._id === this.props.user._id ? 'to' : 'from',
                                                                    user: activity.transaction.userFrom._id === this.props.user._id
                                                                        ? <a href={`/user/${activity.transaction.userTo._id}`}>{activity.transaction.userTo.firstName}</a>
                                                                        : <a href={`/user/${activity.transaction.userFrom._id}`}>{activity.transaction.userFrom.firstName}</a>,

                                                                }}
                                                            />
                                                            <span className="date">{moment(activity.date).fromNow()}</span>
                                                        </li>
                                                        : ""
                                                    }

                                                    {activity.type === MESSAGE && activity.own === false
                                                        ? <li className="activity">
                                                            <FormattedMessage
                                                                id="activityMessage"
                                                                defaultMessage='{user} sent you a {message}'
                                                                values={{
                                                                    message: <a href={`/profile/messages/${activity.message.conversation._id}`}>message</a>,
                                                                    user: <a href={`/user/${activity.message.userFrom._id}`}>{activity.message.userFrom.firstName} {activity.message.userFrom.lastName}</a>,
                                                                }}
                                                            />
                                                            <span className="date">{moment(activity.message.date).fromNow()}</span>
                                                        </li>
                                                        : ""
                                                    }


                                                </div>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </IntlProvider>
                        </div>
                    </div>
                </div>

            )
        }
        else {
            return null
        }

    }
}

Activity.propTypes = {
    user: PropTypes.object.isRequired,
    lastTransactionId: PropTypes.string.isRequired,
    lastRequestId: PropTypes.string.isRequired,
};

export default withApollo(Activity);