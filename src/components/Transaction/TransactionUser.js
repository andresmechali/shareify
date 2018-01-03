import React from 'react';
import PropTypes from 'prop-types';

import ReviewStars from '../../components/User/ReviewStars';

const TransactionUser = (props) => {
    const userOther = props.user._id === props.activeTransaction.userFrom._id ? props.activeTransaction.userTo : props.activeTransaction.userFrom;

    return (
        <div>
            <div className="ui-block">
                <div className="ui-block-title">
                    <h6 className="title bold personal">
                        {userOther.firstName} {userOther.lastName}
                    </h6>
                </div>

                <div className="ui-block-content">
                    <ul className="widget w-personal-info">
                        <img src={require(`../../images/${userOther.picturePath}`)} width="100%" height="100%" alt=""/>

                        {userOther.description
                            ? <div><span className="bold">Description:</span> {userOther.description}</div>
                            : ""
                        }
                        {userOther.reviews.length === 0
                            ? <div><span className="bold">No reviews yet</span></div>
                            : <div>
                                <ReviewStars
                                    reviews={userOther.reviews}
                                    userOtherId={userOther._id}
                                />
                                <a href={`/profile/user/${userOther._id}`}>See more</a>
                            </div>
                        }
                    </ul>
                </div>
            </div>
        </div>
    )
};

TransactionUser.propTypes = {
    user: PropTypes.object.isRequired,
    activeTransaction: PropTypes.object.isRequired,
};

export default TransactionUser;