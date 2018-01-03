import React from 'react';
import PropTypes from 'prop-types';

const Respond = (props) => {
    return (
        <div className="ui-block">
            <div className="ui-block-title">
                <h6 className="title bold personal">
                    Respond
                </h6>
            </div>

            <div className="ui-block-content">
                <button onClick={props.onAccept} id={props.activeRequest._id} className="btn btn-green btn-lg full-width">Accept</button>
            </div>

            <div className="ui-block-content">
                <button onClick={props.onReject} id={props.activeRequest._id} className="btn btn-danger btn-lg full-width">Reject</button>
            </div>
        </div>
    )
};

Respond.propTypes = {
    onAccept: PropTypes.func.isRequired,
    onReject: PropTypes.func.isRequired,
    activeRequest: PropTypes.object.isRequired,
};

export default Respond;