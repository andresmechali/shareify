import React from 'react';
import PropTypes from 'prop-types';

import RemoteImage from 'react-remote-image';
import Loading from '../../components/Loading/Bounce';
import IMG_PATH from "../../utils/IMG_PATH";

const LastOffered = (props) => {
    return (
        <div className="ui-block">
            <div className="ui-block-title">
                <h6 className="title bold">
                    Offered by you
                </h6>
            </div>

            <div className="ui-block-content">
                {props.user.offered.length > 0?
                    <div>
                        <ul className="widget w-last-photo js-zoom-gallery">
                            {props.user.offered.slice(0, 9).map((item, key) => (
                                <li key={key}>
                                    <a href={`/item/${item._id}`}>
                                        {
                                            //<img src={require(`http://localhost:3001/images/${item.picturePath}`)}
                                            //alt=""
                                            //    />
                                        }
                                        <RemoteImage
                                            //src={`http://localhost:3001/images/${item.picturePath}`}
                                            src={`${IMG_PATH}/images/${item.picturePath}`}
                                            renderLoading= {() => (
                                                <div className="image--loading">
                                                    <Loading />
                                                </div>
                                            )}
                                            renderFetched={image => {
                                                return (
                                                    <div className="image-container">
                                                        <img src={image.src} alt=""/>
                                                    </div>
                                                )
                                            }}
                                            renderFailure={(error, retry) => {
                                                return (
                                                    <div className="image-container">
                                                        <img src={require(`../../images/no-image.png`)} alt=""/>
                                                    </div>
                                                )
                                            }}
                                            alt="asd"
                                        />

                                    </a>
                                </li>
                            ))}
                        </ul>
                        {props.user.offered.length > 9?
                            "View all" : ""
                        }
                    </div>
                    :
                    <div>
                        No items offered yet
                        <a href='/offer/new'>
                            <button className="btn btn-lg-2 btn-blue full-width" style={{marginTop: "15px"}}>Start offering</button>
                        </a>
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