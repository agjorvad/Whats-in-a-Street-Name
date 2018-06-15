import React, { Component } from 'react';
import { connect } from 'react-redux';
import Nav from '../../components/Nav/Nav';
import { USER_ACTIONS } from '../../redux/actions/userActions';
import MapContainer from '../MapContainer/MapContainer'
import { geolocated } from 'react-geolocated';


class MapPage extends Component {


  componentDidMount() {
    this.props.dispatch({type: USER_ACTIONS.FETCH_USER});
  };

  componentDidUpdate() {
    if (!this.props.user.isLoading && this.props.user.userName === null) {
      this.props.history.push('login');
    }
  };

  render() {
    let coords = {
      lat: 44.898106,
      lng: -93.311647,
    }
    let content = (
        <MapContainer longitude={this.props.longitude} latitude={this.props.latitude} />
      );
    // };

    // if (!this.props.isGeolocationEnabled) {
    //   content = "not enabled";
    // }

    return (
    // !this.props.isGeolocationAvailable
    //   ? <div>Your browser does not support Geolocation</div>
    //   : !this.props.isGeolocationEnabled
    //     ? <div>Geolocation is not enabled</div>
    //     : this.props.coords
    //       ? 
      <div>
        {/* <Nav /> */}
        {content}
      </div>
              // : <div>Getting your location data&hellip; </div>;
    )
  }
};

const mapStateToProps = state => ({
  user: state.user,
  state
});

// this allows us to use <App /> in index.js
// const geo = geolocated(
//   {
//     positionOptions: {
//       enableHighAccuracy: false,
//     },
//     userDecisionTimeout: 50000,
//   }
// )(MapPage)

export default connect(mapStateToProps)(MapPage);
