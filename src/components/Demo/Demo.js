import React from 'react';
import { geolocated } from 'react-geolocated';

import { USER_ACTIONS } from '../../redux/actions/userActions';
import { connect } from 'react-redux';
import MapPage from '../MapPage/MapPage'

class Demo extends React.Component {

  //   componentDidMount() {
  //   this.props.dispatch({type: USER_ACTIONS.FETCH_USER});
  // };

  // componentDidUpdate() {
  //   if (!this.props.user.isLoading && this.props.user.userName === null) {
  //     this.props.history.push('login');
  //   }
  // };

  render() {

    return !this.props.isGeolocationAvailable
      ? <div>Your browser does not support Geolocation</div>
      : !this.props.isGeolocationEnabled
        ? <div>Geolocation is not enabled</div>
        : this.props.coords
          ? <span>
            <table>
              <tbody>
                <tr><td>latitude</td><td>{this.props.coords.latitude}</td></tr>
                <tr><td>longitude</td><td>{this.props.coords.longitude}</td></tr>
              </tbody>
            </table>
            <MapPage longitude={this.props.coords.longitude} latitude={this.props.coords.latitude} />
          </span>
          : <div>Getting your location data&hellip; </div>;
  }
}

export default geolocated({
  positionOptions: {
    enableHighAccuracy: false,
  },
  userDecisionTimeout: 5000,
})(Demo); 