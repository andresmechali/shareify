import React from 'react';
import PropTypes from 'prop-types';

import Li from '../List/Li';
import Image from '../Image';

class TopHeader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            active: props.active
        }
    }
    render() {
        return (
            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <div className="ui-block">
                    <div className="top-header">
                        <div className="profile-section">
                            <div className="row">

                                <div className="top-header-author">
                                    <a className="author-thumb">
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
    active: PropTypes.string.isRequired,
    lastConversationId: PropTypes.string.isRequired,
    lastTransactionId: PropTypes.string.isRequired,
    lastRequestId: PropTypes.string.isRequired,
};

export default TopHeader