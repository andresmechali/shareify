import React from 'react';
import PropTypes from 'prop-types';

import moment from 'moment';


const TransactionItem = (props) => {
    return (
        <div className="ui-block">
            <div className="ui-block-title">
                <h6 className="title bold personal">
                    {props.activeTransaction.item.name}
                </h6>
            </div>

            <div className="ui-block-content">
                <ul className="widget w-personal-info">
                    <img src={require(`../../images/${props.activeTransaction.item.picturePath}`)} width="100%" height="100%" alt=""/>

                    {props.activeTransaction.item.description
                        ? <div><span className="bold">Description:</span> {props.activeTransaction.item.description}</div>
                        : ""
                    }

                    <div><span className="bold">Location:</span> {props.activeTransaction.item.location}</div>
                    <div><span className="bold">Published:</span> {moment(props.activeTransaction.item.created).fromNow()}</div>
                    <a href={`/item/${props.activeTransaction.item._id}`}>See more</a>
                </ul>
            </div>
        </div>
    )
};

TransactionItem.propTypes = {
    activeTransaction: PropTypes.object.isRequired,
};

export default TransactionItem;