import React from 'react';
import PropTypes from 'prop-types';

const ItemOffered = (props) => {
    return (
        <div className="col-xl-3 order-xl-1 col-lg-3 order-lg-1 col-md-12 order-md-2 col-sm-12 col-xs-12 responsive-display-none">
            <div className="ui-block">
                <div className="ui-block-title">
                    <h4 className="bold">
                        {props.name}
                    </h4>
                </div>
                <img src={require(`../../images/${props.image}`)}
                     style={{height:"80%", width: "80%", paddingLeft: "10%", paddingTop: "5%"}}
                     alt=""
                />
                <div className="ui-block-content" style={{height: "130px"}}>
                    {props.description}
                </div>
                <div className="ui-block-title">
                    {props.location}
                </div>
            </div>
        </div>
    )
};

ItemOffered.propTypes = {
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
}

export default ItemOffered;