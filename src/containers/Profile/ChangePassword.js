import React from 'react';
import PropTypes from 'prop-types';

import TopHeader from '../../components/Profile/TopHeader';
import About from '../../components/Profile/About';
import Password from '../../components/Profile/Password';

const ChangePassword = props => {
    return (
        <div>
            <div className="row">
                <TopHeader
                    user={props.user}
                    auth={props.auth}
                    active='settings'
                    lastConversationId={props.lastConversationId}
                    lastRequestId={props.lastRequestId}
                    lastTransactionId={props.lastTransactionId}
                />
            </div>
            <div className="row">
                <div className="col-xl-3 order-xl-3 col-lg-3 order-lg-3 col-md-3 col-sm-12 order-sm-3 col-xs-12 order-xs-3">
                    <About
                        title="Personal"
                        user={props.user}
                        completeButton={true}
                    />
                </div>

                <div className="col-xl-9 order-xl-1 col-lg-9 order-lg-1 col-md-9 col-sm-12 order-sm-1 col-xs-12 order-xs-1">
                    <Password
                        user={props.user}
                        flashMessages={props.flashMessages}
                        addFlashMessage={props.addFlashMessage}
                        deleteFlashMessage={props.deleteFlashMessage}
                    />
                </div>
            </div>
        </div>
    )
};

ChangePassword.propTypes = {
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
};

export default ChangePassword;