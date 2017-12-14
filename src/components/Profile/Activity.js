import React from 'react';
import PropTypes from 'prop-types';

import { IntlProvider } from 'react-intl';
import { FormattedMessage } from 'react-intl';
import moment from 'moment';

import { withApollo } from 'react-apollo';
import ACTIVITY_QUERY from '../../utils/queries/ACTIVITY_QUERY';

import { ITEM } from '../../utils/activityTypes';
import { MESSAGE } from '../../utils/activityTypes';

class Activity extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activities: [],
        }
    }

    componentWillMount() {
        this.props.client.query({
            query: ACTIVITY_QUERY,
            variables: {
                _id: this.props.user._id,
            }
        })
            .then(res => {
                console.log(res.data)
                    this.setState({activities: res.data.activityByUserIdItem.concat(res.data.activityByUserIdMessage)})
                }
            )
            .catch(err => {
                console.log(err);
            })
    }

    render() {
        console.log(this.state.activities)
        if (this.state.activities.length > 0){
            return(
                <IntlProvider locale='en'>
                    <div className="ui-block">
                        <div className="ui-block-title">
                            <h6 className="title bold">
                                Activities
                            </h6>
                        </div>
                        <div className="ui-block-content">
                            <ul>
                                {this.state.activities.slice(0, 9).sort(
                                    function(a, b) {
                                        if (a.date < b.date) return 1;
                                        else if (a.date > b.date) return -1;
                                        else return 0;
                                    }
                                ).map((activity, key) => (
                                    <div key={key}>
                                        {activity.type === ITEM
                                            ? <li className="activity">
                                                <FormattedMessage
                                                    id="activityItem"
                                                    defaultMessage='You have published a {item}'
                                                    values={{
                                                        item: <a href={`/item/${activity.item._id}`}>{activity.item.name}</a>
                                                    }}
                                                />
                                                <span className="date">{moment(activity.date).fromNow()}</span>
                                            </li>
                                            : ""
                                        }


                                        {activity.type === MESSAGE
                                            ? <li className="activity">
                                                <FormattedMessage
                                                    id="activityMessage"
                                                    defaultMessage='You have a new {message} from {user}'
                                                    values={{
                                                        message: <a href='/'>message</a>,
                                                        user: <a href={`/user/${activity.message.userFrom._id}`}>{activity.message.userFrom.firstName} {activity.message.userFrom.lastName}</a>
                                                    }}
                                                />
                                                <span className="date">{moment(activity.date).fromNow()}</span>
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
            return null
        }

    }
}

Activity.propTypes = {
    user: PropTypes.object.isRequired
};

export default withApollo(Activity);