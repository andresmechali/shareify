import React from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';

import TopHeader from '../../components/Profile/TopHeader';
import About from '../../components/Profile/About';
import ProfilePicture from '../../components/Profile/ProfilePicture';

class ChangeImage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            image: false,
        }
    }

    render() {
        return (
            <div>
                <div className="row">
                    <TopHeader
                        user={this.props.user}
                        auth={this.props.auth}
                        active='settings'
                        lastConversationId={this.props.lastConversationId}
                        lastRequestId={this.props.lastRequestId}
                        lastTransactionId={this.props.lastTransactionId}
                    />
                </div>
                <div className="row">
                    <div className="col-xl-3 order-xl-3 col-lg-3 order-lg-3 col-md-3 col-sm-12 order-sm-3 col-xs-12 order-xs-3">
                        <About
                            title="Personal"
                            user={this.props.user}
                            completeButton={true}
                        />

                        <div className="ui-block">
                            <div className="ui-block-content">
                                <Link to="/profile/settings/password"
                                      className="btn btn-change-password btn-lg full-width"
                                >
                                    Personal settings
                                </Link>
                            </div>
                        </div>

                        <div className="ui-block">
                            <div className="ui-block-content">
                                <Link to="/profile/settings/picture"
                                      className="btn btn-green btn-lg full-width"
                                >
                                    Change password
                                </Link>
                            </div>
                        </div>

                    </div>

                    <ProfilePicture
                        user={this.props.user}
                        flashMessages={this.props.flashMessages}
                        addFlashMessage={this.props.addFlashMessage}
                        deleteFlashMessage={this.props.deleteFlashMessage}
                        setImage={this.props.setImage}
                        image={this.props.image}
                    />
                </div>
            </div>
        )
    }
}

ChangeImage.propTypes = {
    user: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    push: PropTypes.func.isRequired,
    setCurrentUser: PropTypes.func.isRequired,
    addFlashMessage: PropTypes.func.isRequired,
    deleteFlashMessage: PropTypes.func.isRequired,
    flashMessages: PropTypes.array.isRequired,
    lastConversationId: PropTypes.string.isRequired,
    lastTransactionId: PropTypes.string.isRequired,
    lastRequestId: PropTypes.string.isRequired,
    setImage: PropTypes.func.isRequired,
    image: PropTypes.string.isRequired,
};

export default ChangeImage;