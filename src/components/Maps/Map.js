import React from 'react';

import {
    compose,
} from 'recompose';

import {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    Circle
} from 'react-google-maps';

const Map = compose(
    withScriptjs,
    withGoogleMap
) (props =>

    <div>
        <GoogleMap
            key={Math.random()}
            defaultZoom={9}
            defaultCenter={{
                lat: Number(props.latitude),
                lng: Number(props.longitude),
            }}
            options={{
                zoomControl:false,
                mapTypeControl: false,
                scaleControl: false,
                streetViewControl: false,
                rotateControl: false,
                fullscreenControl: false
            }}
        >
            <Circle
                center={{
                    lat: Number(props.latitude),
                    lng: Number(props.longitude)
                }}
                radius={props.radiusOfSearch}
            />

        </GoogleMap>
    </div>

);

export default Map