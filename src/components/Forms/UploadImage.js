import React from 'react';
import PropTypes from 'prop-types';
import Dropzone from 'react-dropzone';

import classNames from 'classnames';

const MB = 1024 * 1024;
const MAX_SIZE = 3 * MB;

class UploadImage extends React.Component {
    constructor() {
        super();
        this.state = {
            accepted: [],
            rejected: []
        }
    }

    render() {
        return (
            <section>
                <div>
                    <Dropzone
                        className={classNames("dropzone", {"dropzone-missing": this.props.missing})}
                        accept="image/jpeg, image/png"
                        maxSize={MAX_SIZE}
                        multiple={false}
                        onDrop={(accepted, rejected) => {
                            this.props.setImage(false);
                            this.props.deleteFlashMessage();
                            this.setState({ accepted, rejected });
                            if (accepted.length > 0) {
                                this.props.setImage(accepted)
                                console.log(accepted[0]);
                            }
                            if (rejected.length > 0) {
                                if (rejected[0].size > MAX_SIZE) {
                                    this.props.addFlashMessage({
                                        type: 'error',
                                        text: "Pictures can't be larger than 3 MB"
                                    });
                                }
                                else {
                                    this.props.addFlashMessage({
                                        type: 'error',
                                        text: 'Only JPEG and PNG files are accepted'
                                    })
                                }
                            }
                        }}
                    >
                        <p>Drop an image here, or click to select file</p>
                        <p>Only JPEG and PNG images will be accepted</p>
                        <p>Maximum size: 3 MB</p>
                    </Dropzone>
                </div>


            </section>
        );
    }
}

UploadImage.propTypes = {
    setImage: PropTypes.func.isRequired,
    addFlashMessage: PropTypes.func.isRequired,
    deleteFlashMessage: PropTypes.func.isRequired,
    flashMessages: PropTypes.array.isRequired,
    missing: PropTypes.bool.isRequired,
};

export default UploadImage;