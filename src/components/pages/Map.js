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

import "../../styles/DonationList.css";

function MapInit({ lat, lng, foodBanks }) {
  console.log(foodBanks);
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

  const clusterImage = {
    imagePath:
      "https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m5.png", // so you must have m1.png, m2.png, m3.png, m4.png, m5.png and m6.png in that folder
  };

  function createKey(location) {
    return location.lat + location.lng;
  }

  let iconMarker= new window.google.maps.MarkerImage(
    "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png",
    null, /* size is determined at runtime */
    null, /* origin is 0,0 */
    null, /* anchor is bottom center of the scaled image */
    new window.google.maps.Size(32, 32)
);

  return (
    <GoogleMap zoom={10} center={center} mapContainerClassName="map-container">
      <Marker
        icon={iconMarker}
        position={{ lat: centerLatCoordinates, lng: centerLongCoordinates }}
      />

      <MarkerClusterer clusterImage={clusterImage}>
        {(clusterer) =>
          foodBanks.map((fb) => (
            <Marker
              title={`${fb.name} - ${fb.vicinity}`}
              key={createKey(fb.geometry.location)}
              position={fb.geometry.location}
              clusterer={clusterer}
            />
          ))
        }
      </MarkerClusterer>
    </GoogleMap>
  );
}

export default MapInit;
