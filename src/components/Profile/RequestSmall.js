import React from 'react';
import PropTypes from 'prop-types';

const RequestSmall = (props) => {
    return (
        <div>
            {props.item.name}
        </div>
    )
};

RequestSmall.propTypes = {
    item: PropTypes.object.isRequired,
};

export default RequestSmall;