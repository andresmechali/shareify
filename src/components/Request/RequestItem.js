import React from 'react';
import PropTypes from 'prop-types';

import moment from 'moment';
import Image from '../Image';

const RequestItem = (props) => {
    if (props.activeRequest.item.type === 'request') {
        console.log(props.activeRequest);
    }
    return (
        <div className="ui-block">
            <div className="ui-block-title">
                <h6 className="title bold personal">
                    {props.activeRequest.item.name}
                </h6>
            </div>

            <div className="ui-block-content">
                <ul className="widget w-personal-info">
                    <Image
                        src={props.activeRequest.item.picturePath}
                        width="100%"
                        height="100%"
                    />

                    {props.activeRequest.item.description
                        ? <div><span className="bold">Description:</span> {props.activeRequest.item.description}</div>
                        : ""
                    }

                    <div><span className="bold">Location:</span> {props.activeRequest.item.location}</div>
                    <div><span className="bold">Published:</span> {moment(props.activeRequest.item.created).fromNow()}</div>
                    <a href={`/item/${props.activeRequest.item._id}`}>See more</a>
                </ul>
            </div>
        </div>
    )
};

RequestItem.propTypes = {
    activeRequest: PropTypes.object.isRequired,
};

export default RequestItem;