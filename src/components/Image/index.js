import React from 'react';
import PropTypes from 'prop-types';

import RemoteImage from 'react-remote-image';
import Loading from '../../components/Loading/Bounce';
import IMG_PATH from "../../utils/IMG_PATH";

const Image = (props) => {
    return (
        <RemoteImage
            src={`${IMG_PATH}/images/${props.src}`}
            renderLoading= {() => (
                <div className="image--loading">
                    <Loading />
                </div>
            )}
            renderFetched={image => {
                return (
                    <div className="image-container">
                        <img
                            src={image.src}
                            alt=""
                            width={props.width}
                            height={props.height}
                            style={props.style}
                        />
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
            alt="No image"
        />
    )
};

Image.propTypes = {
    src: PropTypes.string.isRequired,
};

export default Image;