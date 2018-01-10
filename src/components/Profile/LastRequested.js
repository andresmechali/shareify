import React from 'react';
import PropTypes from 'prop-types';

import { withApollo } from 'react-apollo';
import LAST_REQUESTED from '../../utils/queries/LAST_REQUESTED';
import RequestBig from "./RequestBig";

class LastRequested extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            lastRequests: [],
        }
    }

    componentWillMount() {
        this.props.client.query({
            query: LAST_REQUESTED,
            variables: {
                _id: this.props.user._id
            }
        })
            .then(res => {
                    this.setState({lastRequests: res.data.lastRequests})
                }
            )
            .catch(err => {
                console.log(err);
            })
    }

    render() {
        let activeLength = 0;
        this.state.lastRequests.forEach(item => {
            if (item.active) {
                activeLength ++;
            }
        });
        if (activeLength > 0){
            return(
                <div className="ui-block">
                    <div className="ui-block-title">
                        <h6 className="title bold">
                            Last requests
                        </h6>
                    </div>

                    <div className="ui-block-content">
                        <ul className="single-request big">
                            {this.state.lastRequests.map((item, key) => {
                                if (item.active) {
                                    return (
                                        <li key={key}>
                                            <a href={`/item/${item._id}`}>
                                                <RequestBig item={item}/>
                                            </a>
                                        </li>
                                    )
                                }
                                return null;
                            })}
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

LastRequested.propTypes = {
    user: PropTypes.object.isRequired
};

export default withApollo(LastRequested);