import React from 'react';
import PropTypes from 'prop-types';

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
        console.log(this.state)
        if (this.state.activities.length > 0){
            return(
                <div className="ui-block">
                    <div className="ui-block-title">
                        <h6 className="title bold">
                            Activities
                        </h6>
                    </div>

                    <div className="ui-block-content">
                        <ul>
                            {this.state.activities.slice(0, 9).sort(-1).map((activity, key) => (
                                <li key={key}>
                                    {activity.type === ITEM
                                        ? `You have published a ${activity.item.name}`
                                        : "no item"
                                    }
                                </li>
                            ))}
                        </ul>
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
    user: PropTypes.object.isRequired
};

export default withApollo(Activity);