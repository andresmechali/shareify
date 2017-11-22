import React from 'react';
import PropTypes from 'prop-types';

import Map from '../../components/Maps/Map';

class OfferPreview extends React.Component {
    render() {
        return (
            <div className="col-xl-4 order-xl-1 col-lg-4 order-lg-1 col-md-12 order-md-2 col-sm-12 col-xs-12 responsive-display-none">
                <div className="ui-block">
                    <div className="ui-block-title">
                        <h5 className="bold">Preview</h5>
                    </div>
                    <div className="ui-block-title" style={{borderBottom:"none"}}>
                        <h6>
                            <span className="bold">Item:</span> {this.props.name}
                        </h6>
                    </div>
                    <div className="ui-block-title" style={{borderBottom:"none", borderTop:"none"}}>
                        <h6>
                            <span className="bold">Description:</span> {this.props.description}
                        </h6>
                    </div>
                    <div className="ui-block-title" style={{borderTop:"none"}}>
                        <h6>
                            <span className="bold">Location:</span> {this.props.location}
                        </h6>
                    </div>
                    <div className="ui-block-title">
                        <Map
                            googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyA8zfwWQ-K9UXLe64adjv_dn8ELzk6yLdA&libraries=geometry,drawing,places"
                            loadingElement={<div></div>}
                            containerElement={<div style={{ height: `300px`, verticalAlign:`inherit`}} />}
                            mapElement={<div style={{ height: `100%` }} />}
                            latitude={this.props.latitude}
                            longitude={this.props.longitude}
                            radiusOfSearch={this.props.radiusOfSearch * 1000}
                        />
                    </div>
                    <div className="ui-block-title">
                        <h5 className="bold">
                            <button type="submit"
                                    className="btn btn-lg btn-green"
                                    style={{width: "100%"}}
                                    onClick={this.props.onSubmit}
                            >
                                Offer
                            </button>
                        </h5>
                    </div>
                </div>
            </div>
        )
    }
}

OfferPreview.propTypes = {
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    latitude: PropTypes.number.isRequired,
    longitude: PropTypes.number.isRequired,
    radiusOfSearch: PropTypes.number.isRequired,
    onSubmit: PropTypes.func.isRequired,
};

export default OfferPreview;
