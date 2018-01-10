import React from 'react';
import PropTypes from 'prop-types';

import axios from 'axios';
import { withApollo } from 'react-apollo';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';
import dataUriToBlob from '../../utils/dataUriToBlob';

import UploadImage from "../Forms/UploadImage";

import FlashMessageList from '../../components/FlashMessages/FlashMessageList';
import IMG_PATH from "../../utils/IMG_PATH";
import CHANGE_USER_PICTURE from "../../utils/queries/CHANGE_USER_PICTURE";
import Image from "../Image/index";


class ProfilePicture extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            errors: {},
        };
    }

    onSubmit(e) {
        e.preventDefault();
        this.props.deleteFlashMessage();
        if (this.props.image === '') {
            let errors = {};
            errors.image = 'Invalid picture';
            this.setState({errors})
        }
        else {
            this.props.deleteFlashMessage();
            this.setState({loading: true})

            const blobImage = dataUriToBlob(this.refs.cropper.getCroppedCanvas().toDataURL());
            let fd = new FormData();
            fd.append("image", blobImage);
            axios.post(IMG_PATH + '/upload/photo',
                fd, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Access-Control-Allow-Origin': '*',
                    }
                }
            )
                .then(res => {
                    this.props.client.mutate({
                        mutation: CHANGE_USER_PICTURE,
                        variables: {
                            userId: this.props.user._id,
                            picturePath: res.data.filename
                        }
                    })
                        .then(updated => {
                            this.props.setCurrentUser(updated.data.changeUserPicture.token);
                            window.location.reload();
                        })
                        .catch(e => {
                            window.location.reload();
                        })
                })
        }

    }

    render() {
        return (
            <div>
                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12">
                    <div className="ui-block">
                        <div className="ui-block-title">
                            <h6 className="title bold">
                                Current picture
                            </h6>
                        </div>
                        <div className="ui-block-content">
                            <Image
                                src={this.props.user.picturePath}
                                width="100%"
                                height="100%"
                            />
                        </div>

                    </div>
                </div>

                <div className="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-xs-12">
                    <div className="ui-block">
                        <div className="ui-block-title">
                            <h6 className="title bold">
                                Choose picture
                            </h6>
                        </div>
                        <div className="ui-block-content">
                            <UploadImage
                                setImage={this.props.setImage}
                                addFlashMessage={this.props.addFlashMessage}
                                deleteFlashMessage={this.props.deleteFlashMessage}
                                flashMessages={this.props.flashMessages}
                                missing={!!this.state.errors.image}
                            />
                            {this.props.image !== ''
                                ? <section>
                                    <Cropper
                                        src={this.props.image}
                                        style={{height:"300px", width: "100%"}}
                                        ref='cropper'
                                        aspectRatio={1}
                                        guides={false}
                                    />
                                    <button
                                        className="btn btn-lg btn-submit full-width"
                                        onClick={this.onSubmit.bind(this)}
                                    >
                                        Change picture
                                    </button>
                                    {this.props.flashMessages?
                                        <FlashMessageList
                                            messages={this.props.flashMessages}
                                            deleteFlashMessage={this.props.deleteFlashMessage}
                                        /> : ''
                                    }
                                </section>
                                : ""
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

ProfilePicture.propTypes = {
    user: PropTypes.object.isRequired,
    addFlashMessage: PropTypes.func.isRequired,
    deleteFlashMessage: PropTypes.func.isRequired,
    flashMessages: PropTypes.array.isRequired,
    setImage: PropTypes.func.isRequired,
    image: PropTypes.string.isRequired,
    setCurrentUser: PropTypes.func.isRequired,
};

export default withApollo(ProfilePicture);