import React from 'react';
import PropTypes from 'prop-types';

import { withApollo } from 'react-apollo';
import LAST_OFFERED from '../../utils/queries/LAST_OFFERED';

class LastOffered extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            lastOffers: [],
        }
    }

    componentWillMount() {
        this.props.client.query({
            query: LAST_OFFERED,
            variables: {
                _id: this.props.user._id
            }
        })
            .then(res => {
                this.setState({lastOffers: res.data.lastOffers})
                }
            )
            .catch(err => {
                console.log(err);
            })
    }

    render() {
        if (this.state.lastOffers.length > 0){
            return(
                <div className="ui-block">
                    <div className="ui-block-title">
                        <h6 className="title bold">
                            Last offers
                        </h6>
                    </div>

                    <div className="ui-block-content">
                        <ul className="widget w-last-photo js-zoom-gallery">
                            {this.state.lastOffers.slice(0, 9).map((item, key) => (
                                <li key={key}>
                                    <a href={`/item/${item._id}`}>
                                        <img src={require(`../../images/${item.picturePath}`)}
                                             alt=""
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

LastOffered.propTypes = {
    user: PropTypes.object.isRequired
};

export default withApollo(LastOffered);