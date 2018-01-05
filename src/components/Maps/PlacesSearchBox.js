import React from 'react';

import {
    withScriptjs
} from 'react-google-maps';

import {
    compose,
    withProps,
    lifecycle
} from 'recompose';

import StandaloneSearchBox from "react-google-maps/lib/components/places/StandaloneSearchBox";

/*class PlacesSearchBox extends React.Component {

    componentWillMount() {
        const refs = {};

        this.setState({
            places: [],
            onSearchBoxMounted: ref => {
                refs.searchBox = ref;
            },
            onPlacesChanged: () => {
                const places = refs.searchBox.getPlaces();
                this.setState({
                    places,
                });
                console.log(this.state);
                //this.props.dispatch(setPlaces("newOffer", places))
            },
        })
    }

    componentWillReceiveProps() {
        console.log(this.props)
    }

    render() {
        return (
            <div data-standalone-searchbox="">
                <StandaloneSearchBox
                    ref={this.props.onSearchBoxMounted}
                    bounds={this.props.bounds}
                    onPlacesChanged={this.props.onPlacesChanged}
                >
                    <Input name='location'
                           label= 'Where do you have it?'
                           type='text'
                           errors={this.props.errors}
                           focus={this.props.focus}
                           value={this.props.value}
                           onChange={this.props.onChange}
                           onFocus={this.props.onFocus}
                           onBlur={this.props.onBlur}
                    />
                </StandaloneSearchBox>
            </div>
        )
    }
}

PlacesSearchBox.propTypes = {
    googleMapURL: PropTypes.string.isRequired,
    loadingElement: PropTypes.string.isRequired,
    containerElement: PropTypes.string.isRequired,
    errors: PropTypes.object.isRequired,
    focus: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    onFocus: PropTypes.func.isRequired,
    onBlur: PropTypes.func.isRequired,
};*/





const PlacesSearchBox = compose(
    withProps({
        googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyA8zfwWQ-K9UXLe64adjv_dn8ELzk6yLdA&libraries=geometry,drawing,places",
        loadingElement: <div style={{ height: `100%` }} />,
        containerElement: <div style={{ height: `400px` }} />,
    }),
    lifecycle({

        componentWillMount() {
            const refs = {};



            this.setState({
                places: [],
                onSearchBoxMounted: ref => {
                    refs.searchBox = ref;
                },
                onPlacesChanged: () => {
                    const places = refs.searchBox.getPlaces();
                    console.log(places);
                    this.setState({
                        places,
                    });
                    this.props.setState({
                        latitude: this.state.places[1].geometry.location.lat(),
                        longitude: this.state.places[1].geometry.location.lng(),
                        location: this.state.places[1].formatted_address,
                        validLocation: true,
                    });

                },

            })

        },
    })
)(props =>
    <div data-standalone-searchbox="">
        <StandaloneSearchBox
            ref={props.onSearchBoxMounted}
            bounds={props.bounds}
            onPlacesChanged={props.onPlacesChanged}
            onLocate={props.onLocate}
        >
            <input
                type="text"
                name="location"
                className="form-control taller-input input-location"
                placeholder="Where do you have it?"
                onChange={props.onChange}
                value={props.value || ''}

            />
        </StandaloneSearchBox>
    </div>
);

export default withScriptjs(PlacesSearchBox);
