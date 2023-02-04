// import '../../styles/DonationList.css'
// Map Geolocation Api lives here
import { render } from "react-dom";
import React, { useState, useMemo } from "react";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  Autocomplete,
  SearchBox,
  MarkerClusterer,
} from "@react-google-maps/api";
// import { MarkerClusterer } from "@googlemaps/markerclusterer";
// import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';

import "../../styles/DonationList.css";

function MapInit({ lat, lng }) {
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
  return <Map lat={lat} lng={lng} />;
}

function Map({ lat, lng }) {
  // console.log(lat, lng);
  // let autocomplete;
  const [autocomplete, setautocomplete] = useState(null);
  const [centerLatCoordinates, setCenterLatCoordinates] = useState(lat);
  const [centerLongCoordinates, setCenterLongCoordinates] = useState(lng);

  function onLoad(a) {
    console.log("autocomplete: ", a);

    setautocomplete(a);
  }
  let center = useMemo(
    () => ({ lat: centerLatCoordinates, lng: centerLongCoordinates }),
    []
  );
  let searchLat;
  let searchLong;


  //onPlaceChange may not be necessary anymore since we have the maps rendering how we want it.
  function onPlaceChanged() {
    console.log(autocomplete);
    console.log(autocomplete.gm_accessors_.place.jj.predictions);
    if (autocomplete !== null) {
      console.log(autocomplete.getPlace());
      //search coordinates logging
      console.log(
        (autocomplete.getPlace().geometry.viewport.Wa.hi +
          autocomplete.getPlace().geometry.viewport.Wa.lo) /
          2
      );
      searchLat =
        (autocomplete.getPlace().geometry.viewport.Wa.hi +
          autocomplete.getPlace().geometry.viewport.Wa.lo) /
        2;
      //search coordinates logging
      console.log(
        (autocomplete.getPlace().geometry.viewport.Ia.hi +
          autocomplete.getPlace().geometry.viewport.Ia.lo) /
          2
      );
      searchLong =
        (autocomplete.getPlace().geometry.viewport.Ia.hi +
          autocomplete.getPlace().geometry.viewport.Ia.lo) /
        2;
      console.log(autocomplete.getPlace().formatted_address);

      setCenterLatCoordinates(searchLat);
      setCenterLongCoordinates(searchLong);
      console.log(centerLatCoordinates, centerLongCoordinates);
    } else {
      console.log("Autocomplete is not loaded yet!");
    }
  }
  center = useMemo(
    () => ({ lat: centerLatCoordinates, lng: centerLongCoordinates }),
    [centerLatCoordinates, centerLongCoordinates]
  );
  return (
    <GoogleMap zoom={10} center={center} mapContainerClassName="map-container">
      <Marker
        position={{ lat: centerLatCoordinates, lng: centerLongCoordinates }}
      />

      <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
        <input
          type="text"
          placeholder="Search for a place"
          style={{
            boxSizing: `border-box`,
            border: `1px solid transparent`,
            width: `200px`,
            height: `32px`,
            padding: `0 12px`,
            borderRadius: `3px`,
            boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
            fontSize: `14px`,
            outline: `none`,
            textOverflow: `ellipses`,
            position: "absolute",
            left: "50%",
            top: "90%",
            marginLeft: "-120px",
          }}
        />
      </Autocomplete>
    </GoogleMap>
  );
}

export default MapInit;
