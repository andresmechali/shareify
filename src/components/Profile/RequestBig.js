import React from 'react';
import PropTypes from 'prop-types';

import moment from 'moment';

const RequestBig = (props) => {
    console.log(props);
    return (
        <div>
            <div>
                <span className="request-title bold">
                    {props.item.name}
                </span>
                <span className="request-date float-right">
                    {moment(props.item.created).fromNow()}
                </span>
            </div>
            <div>
                <span className="request-description">
                    {props.item.description}
                </span>
                <span className="request-distance float-right">
                    N km away
                </span>
            </div>
        </div>
    )
};

RequestBig.propTypes = {
    item: PropTypes.object.isRequired,
};

export default RequestBig;