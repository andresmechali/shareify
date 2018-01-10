import React from 'react';
import PropTypes from 'prop-types';

import { IntlProvider } from 'react-intl';
import { FormattedMessage } from 'react-intl';
import moment from 'moment';

import createNotificationList from '../../utils/createNotificationList';

import {MESSAGE, REQUEST} from '../../utils/activityTypes';

class Notifications extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            notifications: createNotificationList(props.user),
        }
    }

    render() {
        if (this.state.notifications.length > 0){
            return(
                <IntlProvider locale='en'>
                    <div className="ui-block">
                        <div className="ui-block-title">
                            <h6 className="title bold">
                                Notifications
                            </h6>
                        </div>
                        <div className="ui-block-content">
                            <ul>
                                {this.state.notifications.map((notification, key) => (

                                    <div key={key}
                                         className="bold"
                                    >
                                        {notification.type === MESSAGE
                                            ? <li className="activity">
                                                <FormattedMessage
                                                    id="activityMessage"
                                                    defaultMessage='You have {quantity} new {message} from {user}'
                                                    values={{
                                                        quantity: notification.unread,
                                                        message: <a href={`/profile/messages/${notification.conversation}`}>{notification.unread === 1? "message" : "messages"}</a>,
                                                        user: <a href={`/user/${notification.userOther._id}`}>{notification.userOther.firstName} {notification.userOther.lastName}</a>
                                                    }}
                                                />
                                                <span className="date">{moment(notification.date).fromNow()}</span>
                                            </li>
                                            : ""
                                        }

                                        {notification.type === REQUEST
                                            ? <li className="activity">
                                                {console.log(notification)}
                                                <FormattedMessage
                                                    id="activityRequest"
                                                    defaultMessage='You have a new {request} for your {item}'
                                                    values={{
                                                        request: <a href={`/profile/request/${notification.request}`}>{notification.item.type === 'offer' ? "request" : "offer"}</a>,
                                                        item: <a href={`/item/${notification.item._id}`}>{notification.item.name}</a>
                                                    }}
                                                />
                                                <span className="date">{moment(notification.date).fromNow()}</span>
                                            </li>
                                            : ""
                                        }


                                    </div>
                                ))}
                            </ul>
                        </div>
                    </div>
                </IntlProvider>
            )
        }
        else {
            return (
                <div className="ui-block">
                    <div className="ui-block-content">
                        No new notifications
                    </div>
                </div>
            )
        }

    }
}

Notifications.propTypes = {
    user: PropTypes.object.isRequired
};

export default Notifications;