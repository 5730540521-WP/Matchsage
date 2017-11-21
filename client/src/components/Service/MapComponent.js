import React from "react"
import { compose, withProps } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"

export default compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key= AIzaSyB_N_h01CgAedMGKPK5JFl1nZXRrp7vawc",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withScriptjs,
  withGoogleMap
)((props) =>
  <GoogleMap
    defaultZoom={8}
    defaultCenter={{ lat: 13.7437789, lng: 100.5173846 }}
  >
    {props.isMarkerShown && <Marker position={{ lat: 13.7437789, lng: 100.5173846 }} onClick={props.onMarkerClick} />}
  </GoogleMap>
)