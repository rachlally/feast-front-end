// import '../../styles/DonationList.css'
// Map Geolocation Api lives here
import { render } from "react-dom";
import React, { useState, useMemo } from "react";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  Autocomplete,
  MarkerClusterer,
} from "@react-google-maps/api";
// import { MarkerClusterer } from "@googlemaps/markerclusterer";
// import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';

import "../../styles/DonationList.css";

function MapInit({ lat, lng, foodBanks }) {
  // console.log(foodBanks);
  <script
    src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBVq588qSxiAVHeDMayN1kY-qnHdVMF6CQ&libraries=places&callback=initAutocomplete"
    async
    defer
  ></script>;
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_KEY,
    libraries: ["places"],
  });

  if (!isLoaded) return <div>Loading...</div>;
  return <Map lat={lat} lng={lng} foodBanks={foodBanks} />;
}

function Map({ lat, lng, foodBanks }) {
  // console.log(lat, lng);
  // console.log(foodBanks);

  const [centerLatCoordinates, setCenterLatCoordinates] = useState(lat);
  const [centerLongCoordinates, setCenterLongCoordinates] = useState(lng);

  let center = useMemo(
    () => ({ lat: centerLatCoordinates, lng: centerLongCoordinates }),
    []
  );
  let searchLat;
  let searchLong;

  center = useMemo(
    () => ({ lat: centerLatCoordinates, lng: centerLongCoordinates }),
    [centerLatCoordinates, centerLongCoordinates]
  );

  let locations = foodBanks.map((f) => {
    return f.geometry.location;
  });
  console.log(locations);

  const clusterImage = {
    imagePath:
      "https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m5.png", // so you must have m1.png, m2.png, m3.png, m4.png, m5.png and m6.png in that folder
  };

  function createKey(location) {
    return location.lat + location.lng;
  }

  return (
    <GoogleMap zoom={10} center={center} mapContainerClassName="map-container">
      <Marker
        position={{ lat: centerLatCoordinates, lng: centerLongCoordinates }}
      />

      <MarkerClusterer clusterImage={clusterImage}>
        {(clusterer) =>
          locations.map((location) => (
            <Marker
              key={createKey(location)}
              position={location}
              clusterer={clusterer}
            />
          ))
        }
      </MarkerClusterer>
    </GoogleMap>
  );
}

export default MapInit;
