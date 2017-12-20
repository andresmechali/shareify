import React from 'react';
import PropTypes from 'prop-types';

import Li from '../List/Li';

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
                                        <img src={require(`../../images/${this.props.user.picturePath}`)}
                                             alt="profile"
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
                                        <Li link='/profile/offered'
                                            text='Offered'
                                            className={this.state.active==='offered'?'active':''}
                                        />
                                        <Li link='/profile/requested'
                                            text='Requested'
                                            className={this.state.active==='requested'?'active':''}
                                        />
                                        {this.props.lastConversationId !== ""
                                            ? <Li link={`/profile/messages/${this.props.lastConversationId}`}
                                                  text='Messages'
                                                  className={this.state.active==='messages'?'active':''}
                                            />
                                            : 'Messages'
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
};

export default TopHeader