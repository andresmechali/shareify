import React from 'react';
import PropTypes from 'prop-types';

import classNames from 'classnames';

const RequestList = (props) => {
    return (
        <div className="ui-block">
            <div className="ui-block-title">
                <h6 className="title bold personal">
                    Requests
                </h6>
            </div>

            <div className="ui-block-content">
                <ul className="widget w-personal-info">
                    {
                        props.requests.map((request, key) => {

                            return (
                                <li key={key}>
                                    <a
                                        onClick = {props.setRequest}
                                        id={request._id}
                                        className={classNames({"bold": request.userFrom._id === props.activeRequest.userFrom._id})}
                                    >
                                        {
                                            request.userTo.username === props.user.username
                                                ? `${request.userFrom.firstName} ${request.userFrom.lastName} (${request.item.name})`
                                                : `${request.userTo.firstName} ${request.userTo.lastName} (${request.item.name})`
                                        }
                                    </a>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        </div>
    )
};

RequestList.propTypes = {
    user: PropTypes.object.isRequired,
    requests: PropTypes.array.isRequired,
    setRequest: PropTypes.func.isRequired,
    activeRequest: PropTypes.object.isRequired,
};

export default RequestList;