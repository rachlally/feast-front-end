// Map Geolocation Api lives here
import React, { useMemo } from 'react';
import { render } from 'react-dom';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';
import { MarkerClusterer } from '@googlemaps/markerclusterer';
import '../../styles/DonationList.css'

function MapInit() {
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    });

    if (!isLoaded) return <div>Loading...</div>
    return (
            <Map />
    )
}

function Map() {
    const center = useMemo(() => ({lat: 37.0902, lng: -95.7129}), []);
    return (
        <GoogleMap
            zoom={4}
            center={center}
            mapContainerClassName='map-container'
            >
            <Marker position={{ lat: 37.0902, lng: -95.7129 }} />
        </GoogleMap>
    )
}

export default MapInit;