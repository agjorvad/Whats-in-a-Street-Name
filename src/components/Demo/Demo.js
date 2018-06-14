import React from 'react';
import {geolocated} from 'react-geolocated';
import MapContainer from '../MapContainer/MapContainer'

class Demo extends React.Component {
render() {

return !this.props.isGeolocationAvailable
  ? <div>Your browser does not support Geolocation</div>
  : !this.props.isGeolocationEnabled
    ? <div>Geolocation is not enabled</div>
    : this.props.coords
      ? <table>
        <tbody>
          <tr><td>latitude</td><td>{this.props.coords.latitude}</td></tr>
          <tr><td>longitude</td><td>{this.props.coords.longitude}</td></tr>
        </tbody>
      </table>
      : <div>Getting the location data&hellip; </div>;
      <MapContainer latitude={this.props.coords.latitude} longitude={this.props.coords.longitude}/>
  }
}

export default geolocated({
 positionOptions: {
enableHighAccuracy: false,
},
 userDecisionTimeout: 5000,
})(Demo); 