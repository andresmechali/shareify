import React from 'react';
import PropTypes from 'prop-types';

import About from '../../components/Profile/About';
import OfferedByYou from '../../components/Profile/OfferedByYou';
import RequestedByYou from '../../components/Profile/RequestedByYou';
import Activity from '../../components/Profile/Activity';
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
                <Activity user={props.user}/>

                <LastOffered user={props.user}/>

                <LastRequested user={props.user}/>
            </div>

            <div className="col-xl-3 order-xl-3 col-lg-3 order-lg-3 col-md-3 col-sm-12 col-xs-12">
                <OfferedByYou
                    user={props.user}
                />

                <RequestedByYou
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