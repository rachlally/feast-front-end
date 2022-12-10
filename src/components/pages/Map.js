//  import React, { useMemo } from 'react';
// import { render } from 'react-dom';
// import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';
// import { MarkerClusterer } from '@googlemaps/markerclusterer';
// // import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';

// import '../../styles/DonationList.css'

// Map Geolocation Api lives here
import { render } from "react-dom";
import React, { useState, useMemo } from "react";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  Autocomplete,
} from "@react-google-maps/api";
import { MarkerClusterer } from "@googlemaps/markerclusterer";
// import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';

import "../../styles/DonationList.css";

// let autocomplete;
// function initAutocomplete(){
//     autocomplete= new google.maps.places.Autocomplete(
//         document.getElementById('autocomplete'),
//         {
//             types:['establishment'],
//             componentRestrictions:{'country': ['AU']},
//             fields:['places_id', 'geometry', 'name']
//         });
//         autocomplete.addListener('place_changed', onPlaceChanged);
// }
// function onPlaceChanged(){
//     var place = autocomplete.getPlace();

//     if(!place.geometry){
//         document.getElementById('autocomplete').placeholder='Enter a place';
//     } else {
//         document.getElementById('details').innerHTML=place.name;
//     }
// }

function MapInit() {
  <script
    src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBVq588qSxiAVHeDMayN1kY-qnHdVMF6CQ&libraries=places&callback=initAutocomplete"
    async
    defer
  ></script>;
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyBVq588qSxiAVHeDMayN1kY-qnHdVMF6CQ", libraries:["places"]
  });

  if (!isLoaded) return <div>Loading...</div>;
  return (
      <Map />
  );
}

function Map() {
    // let autocomplete;
    const [autocomplete, setautocomplete ] = useState(null)
    function onLoad (a) {
        console.log('autocomplete: ', a)
    
        setautocomplete(a)
      }
    
      function onPlaceChanged () {
        console.log(autocomplete)
        if (autocomplete !== null) {
          console.log(autocomplete.getPlace())
        } else {
          console.log('Autocomplete is not loaded yet!')
        }
      }
  const center = useMemo(() => ({ lat: 47.606209, lng: -122.332069 }), []);
  return (
    <GoogleMap zoom={10} center={center} mapContainerClassName="map-container">
      <Marker position={{ lat: 47.606209, lng: -122.332069 }} />

      <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
        <input
          type="text"
          placeholder="Customized your placeholder"
          style={{
            boxSizing: `border-box`,
            border: `1px solid transparent`,
            width: `240px`,
            height: `32px`,
            padding: `0 12px`,
            borderRadius: `3px`,
            boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
            fontSize: `14px`,
            outline: `none`,
            textOverflow: `ellipses`,
            position: "absolute",
            left: "50%",
            marginLeft: "-120px",
          }}
        />
      </Autocomplete>
    </GoogleMap>
  );
}

// ======================================================================
// import React from "react";
// import {
//   InfoWindow,
//   GoogleMap,
//   withScriptjs,
//   withGoogleMap,
//   Marker,
// } from "react-google-maps";
// import Geocode from "react-geocode";
// import { Descriptions } from "antd";
// import SearchBox from "react-google-autocomplete";
// Geocode.setApiKey("AIzaSyBVq588qSxiAVHeDMayN1kY-qnHdVMF6CQ");
// // import {} from "google-map-react";

// class Map extends React.Component {
//   state = {
//     address: "",
//     city: "",
//     area: "",
//     state: "",
//     zoom: 15,
//     height: 400,
//     mapPosition: {
//       lat: 0,
//       lng: 0,
//     },
//     markerPosition: {
//       lat: 0,
//       lng: 0,
//     },
//   };

//   componentDidMount() {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition((position) => {
//         this.setState({
//           mapPosition: {
//             lat: position.coords.latitude,
//             lng: position.coords.longitude,
//           },
//           markerPosition: {
//             lat: position.coords.latitude,
//             lng: position.coords.longitude,
//         }
//     },
//         () => {
//             Geocode.fromLatLng(position.coords.latitude, position.coords.longitude).then(
//                 response => {
//                     console.log(response)
//                     const address = response.results[0].formatted_address,
//                         addressArray = response.results[0].address_components,
//                         city = this.getCity(addressArray),
//                         area = this.getArea(addressArray),
//                         state = this.getState(addressArray);
//                     console.log('city', city, area, state);
//                     this.setState({
//                         address: (address) ? address : '',
//                         area: (area) ? area : '',
//                         city: (city) ? city : '',
//                         state: (state) ? state : '',
//                     })
//                 },
//                 error => {
//                     console.error(error);
//                 }
//             );

//         })
// });
// } else {
// console.error("Geolocation is not supported by this browser!");
// }
// };

//   getCity = (addressArray) => {
//     let city = "";
//     for (let i = 0; i < addressArray.length; i++) {
//       if (
//         addressArray[i].types[0] &&
//         "administrative_area_level_2" === addressArray[i].types[0]
//       ) {
//         city = addressArray[i].longName;
//         return city;
//       }
//     }
//   };

//   getArea = (addressArray) => {
//     let area = "";
//     for (let i = 0; i < addressArray.length; i++) {
//       if (addressArray[i].types[0]) {
//         for (let j = 0; j < addressArray[i].types.length; j++) {
//           if (
//             "sublocality_level_1" === addressArray[i].types[j] ||
//             "locality" === addressArray[i].types[j]
//           ) {
//             area = addressArray[i].long_name;
//             return area;
//           }
//         }
//       }
//     }
//   };

//   getState = (addressArray) => {
//     let state = "";
//     for (let i = 0; i < addressArray.length; i++) {
//       for (let i = 0; i < addressArray.length; i++) {
//         if (
//           addressArray[i].types[0] &&
//           "administrative_area_level_1" === addressArray[i].types[0]
//         ) {
//           state = addressArray[i].long_name;
//           return state;
//         }
//       }
//     }
//   };

//   onMarkerDragEnd = (event) => {
//     let newLat = event.latLng.lat();
//     let newLng = event.latLng.lng();

//     Geocode.fromLatLng(newLat, newLng).then(
//       (response) => {
//         const address = response.results[0].formatted_address,
//           addressArray = response.results[0].address_components,
//           city = this.getCity(addressArray),
//           area = this.getArea(addressArray),
//           state = this.getState(addressArray);
//         this.setState({
//           address: address ? address : "",
//           area: area ? area : "",
//           city: city ? city : "",
//           state: state ? state : "",
//           markerPosition: {
//             lat: newLat,
//             lng: newLng,
//           },
//           mapPosition: {
//             lat: newLat,
//             lng: newLng,
//           },
//         });
//       },
//       (error) => {
//         console.error(error);
//       }
//     );
//   };

//   onPlaceSelected = (place) => {
//     console.log("plc", place);
//     const address = place.formatted_address,
//       addressArray = place.address_components,
//       city = this.getCity(addressArray),
//       area = this.getArea(addressArray),
//       state = this.getState(addressArray),
//       latValue = place.geometry.location.lat(),
//       lngValue = place.geometry.location.lng();

//     console.log("latvalue", latValue);
//     console.log("lngValue", lngValue);

//     // Set these values in the state.
//     this.setState({
//       address: address ? address : "",
//       area: area ? area : "",
//       city: city ? city : "",
//       state: state ? state : "",
//       markerPosition: {
//         lat: latValue,
//         lng: lngValue,
//       },
//       mapPosition: {
//         lat: latValue,
//         lng: lngValue,
//       },
//     });
//   };

//   render() {
//     const MapWithAMarker = withScriptjs(
//       withGoogleMap((props) => (
//         <GoogleMap
//           defaultZoom={8}
//           defaultCenter={{
//             lat: this.state.mapPosition.lat,
//             lng: this.state.mapPosition.lng,
//           }}
//         >
//           <Marker
//             draggable={true}
//             onDragEnd={this.onMarkerDragEnd}
//             position={{
//               lat: this.state.markerPosition.lat,
//               lng: this.state.markerPosition.lng,
//             }}
//           >
//             <InfoWindow>
//               <div>Current Location Search!</div>
//             </InfoWindow>
//           </Marker>

//           <SearchBox
//             style={{
//               width: "100%",
//               height: "40px",
//               paddingLeft: 16,
//               marginTop: 2,
//               marginBottom: "2rem",
//             }}
//             onPlaceSelected={this.onPlaceSelected}
//             types={["(food)"]}
//           />
//         </GoogleMap>
//       ))
//     );

//     return (
//       <div style={{ padding: "1rem", margin: "0 auto", maxWidth: 1000 }}>
//         <h1>Search for food banks near you!</h1>
//         <Descriptions bordered>
//           <Descriptions.Item label="City">{this.state.city}</Descriptions.Item>
//           <Descriptions.Item label="Area">{this.state.area}</Descriptions.Item>
//           <Descriptions.Item label="State">
//             {this.state.state}
//           </Descriptions.Item>
//           <Descriptions.Item label="Address">
//             {this.state.address}
//           </Descriptions.Item>
//         </Descriptions>

//         <MapWithAMarker
//           googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyBVq588qSxiAVHeDMayN1kY-qnHdVMF6CQ&v=3.exp&libraries=geometry,drawing,places"
//           loadingElement={<div style={{ height: `100%` }} />}
//           containerElement={<div style={{ height: `400px` }} />}
//           mapElement={<div style={{ height: `80%` }} />}
//         />
//       </div>
//     );
//   }
// }
// ==================================================================
// function Map() {
//   return (

//     <GoogleMap
//       defaultZoom={10}
//       defaultCenter={{ lat: 47.606209, lng: -122.332069 }}

//     />
//   );
// }

// const WrappedMap = withScriptjs(withGoogleMap(Map));

// export default function App() {
//   return (
//     <div style={{width: '100vw', height: '100vh'}}>
//       <WrappedMap
//         googleMapURL={`https://maps.googleapis.com/maps/api/js?key=AIzaSyBVq588qSxiAVHeDMayN1kY-qnHdVMF6CQ&v=3.exp&libraries=geometry,drawing,places&`}
//         loadingElement={<div style={{ height: "100%" }} />}
//         containerElement={<div style={{ height: "80%", width: "50%" }} />}
//         mapElement={<div style={{ height: "100%" }} />}
//       />
//     </div>
//   );
// }

export default MapInit;
