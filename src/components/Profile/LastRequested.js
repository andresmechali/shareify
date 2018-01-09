import React from 'react';
import PropTypes from 'prop-types';

import { withApollo } from 'react-apollo';
import LAST_REQUESTED from '../../utils/queries/LAST_REQUESTED';
import Image from '../Image';

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
        if (this.state.lastRequests.length > 0){
            return(
                <div className="ui-block">
                    <div className="ui-block-title">
                        <h6 className="title bold">
                            Last requests
                        </h6>
                    </div>

                    <div className="ui-block-content">
                        <ul className="widget w-last-photo js-zoom-gallery">
                            {this.state.lastRequests.slice(0, 9).map((item, key) => (
                                <li key={key}>
                                    <a href={`/item/${item._id}`}>
                                        <Image
                                            src={item.picturePath}
                                        />
                                    </a>
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

LastRequested.propTypes = {
    user: PropTypes.object.isRequired
};

export default withApollo(LastRequested);