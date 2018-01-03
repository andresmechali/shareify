import React from 'react';
import PropTypes from 'prop-types';

const ReviewStars = (props) => {
    let reviews = [];
    console.log(props.userOtherId);
    props.reviews.forEach(review => {
        if (review.userTo._id === props.userOtherId) {
            reviews.push(review);
        }
    });
    let reviewSum = 0;
    reviews.forEach(review => {
        reviewSum = reviewSum + review.rate;
    });
    const reviewAverage = reviewSum / reviews.length;

    console.log(reviewAverage);
    return (
        <div>
            {props.ratingLabel
                ? <span className="bold">Rating: </span>
                : ''
            }
            {reviewAverage >= 1.0
                ? <span className="fa fa-star checked"/>
                : <span className="fa fa-star"/>
            }
            {reviewAverage >= 2.0
                ? <span className="fa fa-star checked"/>
                : <span className="fa fa-star"/>
            }
            {reviewAverage >= 3.0
                ? <span className="fa fa-star checked"/>
                : <span className="fa fa-star"/>
            }
            {reviewAverage >= 4.0
                ? <span className="fa fa-star checked"/>
                : <span className="fa fa-star"/>
            }
            {reviewAverage >= 5.0
                ? <span className="fa fa-star checked"/>
                : <span className="fa fa-star"/>
            }
            <span style={{paddingLeft: "10px"}}>{Math.round(reviewAverage * 10) / 10}</span>
        </div>
    )
};

ReviewStars.propTypes = {
    reviews: PropTypes.array.isRequired,
    userOtherId: PropTypes.string.isRequired,
};

export default ReviewStars;