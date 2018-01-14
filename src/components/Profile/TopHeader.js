import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import Modal from 'react-responsive-modal';
import 'cropperjs/dist/cropper.css';

import { addFlashMessage, deleteFlashMessage } from "../../redux/actions/flashMessages";

import Li from '../List/Li';
import Image from '../Image';

import runtimeEnv from '@mars/heroku-js-runtime-env';
import aws from 'aws-sdk';

const env = runtimeEnv();

console.log(env);

console.log(process);

const s3 = new aws.S3();
//console.log(s3);

class TopHeader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            active: props.active,
            modal: false,
            changeMenu: false,
            errors: {},
        }
    }

    openModal() {
        this.setState({modal: true});
    }

    closeModal() {
        this.setState({modal: false});
    }

    changeImage() {
        this.props.push('/profile/settings/picture')
    }


    render() {
        return (
            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <Modal
                    open={this.state.modal}
                    onClose={this.closeModal.bind(this)}
                    little
                >
                    <Image
                        src={this.props.user.picturePath}
                        width="100%"
                        height="100%"
                    />

                    {this.props.user._id === this.props.auth.user._id
                        ? <button className="btn btn-submit full-width" onClick={this.changeImage.bind(this)}>Change picture</button>
                        : ""
                    }


                </Modal>
                <div className="ui-block">
                    <div className="top-header">
                        <div className="profile-section">
                            <div className="row">

                                <div className="top-header-author">
                                    <a className="author-thumb header-image" onClick={this.openModal.bind(this)}>
                                        <Image
                                            src={this.props.user.picturePath}
                                            width="124px"
                                            height="124px"
                                        />
                                    </a>
                                    <div className="author-content">
                                        <a className="h4 author-name bold">
                                            {this.props.user.firstName} {this.props.user.lastName}
                                        </a>
                                        <div className="country status">
                                            {this.props.user.status}
                                        </div>
                                    </div>
                                </div>

                                <div className="col-lg-5 col-md-5 ">
                                    <ul className="profile-menu">
                                        <Li link='/profile/main'
                                            text='Main'
                                            className={this.state.active==='main'?'active':''}
                                        />
                                        <Li link='/profile/settings'
                                            text='Settings'
                                            className={this.state.active==='settings'?'active':''}
                                        />
                                        <Li link='/profile/activity'
                                            text='Activity'
                                            className={this.state.active==='activity'?'active':''}
                                        />
                                    </ul>
                                </div>

                                <div className="col-lg-5 ml-auto col-md-5 right-top-menu">
                                    <ul className="profile-menu">
                                        {this.props.lastRequestId !== ""
                                            ? <Li link={`/profile/request/${this.props.lastRequestId}`}
                                                  text='Requests'
                                                  className={this.state.active==='requests'?'active':''}
                                            />
                                            : <li>No requests</li>
                                        }

                                        {this.props.lastTransactionId !== ""
                                            ? <Li link={`/profile/transaction/${this.props.lastTransactionId}`}
                                                  text='Transactions'
                                                  className={this.state.active==='transactions'?'active':''}
                                            />
                                            : <li>No transactions</li>
                                        }

                                        {this.props.lastConversationId !== ""
                                            ? <Li link={`/profile/messages/${this.props.lastConversationId}`}
                                                  text='Messages'
                                                  className={this.state.active==='messages'?'active':''}
                                            />
                                            : <li>No messages</li>
                                        }

                                    </ul>
                                </div>
                            </div>
                        </div>


                    </div>
                </div>
            </div>
        )
    }

}

TopHeader.propTypes = {
    user: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    active: PropTypes.string.isRequired,
    push: PropTypes.func.isRequired,
    lastConversationId: PropTypes.string.isRequired,
    lastTransactionId: PropTypes.string.isRequired,
    lastRequestId: PropTypes.string.isRequired,
    flashMessages: PropTypes.array.isRequired,
    addFlashMessage: PropTypes.func.isRequired,
    deleteFlashMessage: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
    return {
        flashMessages: state.flashMessages,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        addFlashMessage: (m) => dispatch(addFlashMessage(m)),
        deleteFlashMessage: () => dispatch(deleteFlashMessage()),
        push: (path) => dispatch(push(path)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(TopHeader);