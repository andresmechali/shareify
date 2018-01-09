import React from 'react';
import PropTypes from 'prop-types';
import Image from '../Image';

const LastOffered = (props) => {
    return (
        <div className="ui-block">
            <div className="ui-block-title">
                <h6 className="title bold">
                    Offered by {props.user.firstName}
                </h6>
            </div>

            <div className="ui-block-content">
                {props.user.offered.length > 0?
                    <div>
                        <ul className="widget w-last-photo js-zoom-gallery">
                            {props.user.offered.map((item, key) => (
                                <li key={key}>
                                    <a href={`/item/${item._id}`}>
                                        <Image
                                            src={item.picturePath}
                                        />
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                    :
                    <div>
                        No items offered yet
                    </div>
                }
            </div>
        </div>
    )
};

LastOffered.propTypes = {
    user: PropTypes.object.isRequired,
};

export default LastOffered;