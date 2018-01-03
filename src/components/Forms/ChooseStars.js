import React from 'react';
import PropTypes from 'prop-types';

import classNames from 'classnames';

const ChooseStars = (props) => {
    return (
        <div className="star-selection">
            <span className={classNames('star-icon', {'full': props.rate >= 5})} id="5" onClick={props.onChangeRate}>☆</span>
            <span className={classNames('star-icon', {'full': props.rate >= 4})} id="4" onClick={props.onChangeRate}>☆</span>
            <span className={classNames('star-icon', {'full': props.rate >= 3})} id="3" onClick={props.onChangeRate}>☆</span>
            <span className={classNames('star-icon', {'full': props.rate >= 2})} id="2" onClick={props.onChangeRate}>☆</span>
            <span className={classNames('star-icon', {'full': props.rate >= 1})} id="1" onClick={props.onChangeRate}>☆</span>
        </div>
    )
};

ChooseStars.propTypes = {
    rate: PropTypes.number.isRequired,
    onChangeRate: PropTypes.func.isRequired,
};

export default ChooseStars;