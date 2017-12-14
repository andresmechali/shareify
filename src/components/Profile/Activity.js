import React from 'react';
import PropTypes from 'prop-types';

import { IntlProvider } from 'react-intl';
import { FormattedMessage } from 'react-intl';
import moment from 'moment';

import { withApollo } from 'react-apollo';
import ACTIVITY_QUERY from '../../utils/queries/ACTIVITY_QUERY';

import { ITEM } from '../../utils/activityTypes';

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
                _id: this.props.user._id
            }
        })
            .then(res => {
                    console.log(res);
                    this.setState({activities: res.data.activityByUserId})
                }
            )
            .catch(err => {
                console.log(err);
            })
    }

    render() {
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
                                {this.state.activities.slice(0, 9).map((activity, key) => (
                                    <li key={key} className="activity">
                                        {activity.type === ITEM
                                            ? <FormattedMessage
                                                id="activityItem"
                                                defaultMessage='You have published a {item}'
                                                values={{
                                                    item: <a href={`/item/${activity.item._id}`}>{activity.item.name}</a>
                                                }}
                                            />
                                            : "no item"
                                        }
                                        <span className="date">{moment(activity.date).fromNow()}</span>
                                    </li>
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