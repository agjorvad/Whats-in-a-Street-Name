import React, { Component } from 'react';
import { connect } from 'react-redux';
import Nav from '../../components/Nav/Nav';
import MapContainer from '../MapContainer/MapContainer'
import { geolocated } from 'react-geolocated';

class MapPage extends Component {

  render() {
    let coords = {
      lat: 44.898106,
      lng: -93.311647,
    }
    let content = (
        <MapContainer longitude={this.props.longitude} latitude={this.props.latitude} />
      );

    return (
      <div>
        {content}
      </div>
    )
  }
};

const mapStateToProps = state => ({
  user: state.user,
  state
});

export default connect(mapStateToProps)(MapPage);
