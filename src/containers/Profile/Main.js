import React from 'react';
import PropTypes from 'prop-types';

import About from '../../components/Profile/About';
import LastOffered from '../../components/Profile/LastOffered';
import LastRequested from '../../components/Profile/LastRequested';

const Main = (props) => {
    return (
        <div className="row">

            <div className="col-xl-3 order-xl-3 col-lg-3 order-lg-3 col-md-3 col-sm-12 col-xs-12">
                <About
                    title="Personal"
                    user={props.user}
                />
            </div>

            <div className="col-xl-6 order-xl-2 col-lg-6 order-lg-1 col-md-6 col-sm-12 col-xs-12">
                <div className="newsfeed-items-grid">
                    <div className="ui-block">
                        <div className="ui-block-title">
                            <h6 className="title bold">
                                Main section
                            </h6>
                        </div>
                    </div>
                </div>
            </div>

            <div className="col-xl-3 order-xl-3 col-lg-3 order-lg-3 col-md-3 col-sm-12 col-xs-12">
                <LastOffered
                    user={props.user}
                />

                <LastRequested
                    user={props.user}
                />
            </div>

        </div>
    )
};

Main.propTypes = {
    user: PropTypes.object.isRequired,
};

export default Main;