import React from 'react';
import PropTypes from 'prop-types';

import classNames from 'classnames';

const TransactionList = (props) => {
    return (
        <div className="ui-block">
            <div className="ui-block-title">
                <h6 className="title bold personal">
                    Transactions
                </h6>
            </div>

            <div className="ui-block-content">
                <ul className="widget w-personal-info">
                    {
                        props.transactions.map((transaction, key) => {

                            return (
                                <li key={key}>
                                    <a
                                        onClick = {props.setTransaction}
                                        id={transaction._id}
                                        className={classNames({"bold": transaction.userFrom._id === props.activeTransaction.userFrom._id})}
                                    >
                                        {
                                            transaction.userTo.username === props.user.username
                                                ? `${transaction.userFrom.firstName} ${transaction.userFrom.lastName} (${transaction.item.name})`
                                                : `${transaction.userTo.firstName} ${transaction.userTo.lastName} (${transaction.item.name})`
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

TransactionList.propTypes = {
    user: PropTypes.object.isRequired,
    transactions: PropTypes.array.isRequired,
    setTransaction: PropTypes.func.isRequired,
    activeTransaction: PropTypes.object.isRequired,
};

export default TransactionList;