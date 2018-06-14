import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Map, InfoWindow, Marker, GoogleApiWrapper, Polyline } from 'google-maps-react';
import axios from 'axios';
import PlacesAutocomplete from 'react-places-autocomplete'
import { geocodeByAddress, geocodeByPlaceId, getLatLng } from 'react-places-autocomplete'
import MediaCard from '../MediaCard/MediaCard'
import './MapContainer.css'
import StreetList from '../StreetList/StreetList'

const mapStateToProps = state => ({
    user: state.user,
});

class MapContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // currentLocation: {
            //     lat: 44.898106,
            //     lng: -93.311647
            // },
            showingMarkerInfoWindow: false,
            activeMarker: {},
            selectedPlace: {},
            streetList: [],
            address: '',
            latLng: '',
        };
        this.bounds = {};
    }
  
    handleChange = (address) => {
        this.setState({ address })
      }

      handleSelect = (address) => {
        geocodeByAddress(address)
          .then(results => getLatLng(results[0]))
          .then(latLng => {
              console.log('Success', latLng)
              this.setState({
                  latLng: latLng
              })
          })
          .catch(error => console.error('Error', error))
      }

componentDidMount() {
    this.getAllStreets();
    // if (this.props.centerAroundCurrentLocation) {

}

    getAllStreets = () => {
        axios.get('/api/street')
            .then(response => {
                console.log(response.data);
                this.setState({
                    streetList: response.data,
                })
                console.log(this.state.streetList)
            })
            .catch((error) => {
                console.log('error on get: ', error);
            })
    }

    onMarkerClick = (props, marker, e) => {
        this.setState({
            selectedPlace: props,
            activeMarker: marker,
            showingMarkerInfoWindow: true
        });
        console.log('props: selectedPlace: ', this.state.selectedPlace);
        console.log('props: activeMarker: ', this.state.activeMarker);
    }

    onMapClicked = (props, e) => {
        if (this.state.showingMarkerInfoWindow) {
            this.setState({
                showingMarkerInfoWindow: false,
                activeMarker: null
            })
        } else {
            console.log('this.state.selectedPlace: ', props, 'error: ', e);
        };
    };

    // onInfoWindowClose = () => {
    //     this.setState({
    //         showingInfoWindow: false,
    //         activeMarker: null
    //     })
    // }
    
    render() {
        if (!this.props.loaded) {
            return (
                <div>Loading...</div>
            )
        } else {
            let markers = this.state.streetList;
            console.log(this.state.streetList);
            let streets = markers.map(item => {
                return (<Marker
                    key={item.id}
                    onClick={this.onMarkerClick}
                    history={item.street_history}
                    name={item.street_name}
                    position={{ lat: item.latitude, lng: item.longitude }}
                    link_url={item.link_url}
                    icon={{
                        url: "http://maps.google.com/mapfiles/ms/micons/man.png",
                        // anchor: (32,32),
                        // scaledSize: [64,64]
                      }} />)
            });
                return (
                    <div>
                        <StreetList />
                <Map 
                onClick={this.onMapClicked}
                    google={this.props.google}
                    zoom={14}
                    style={{ height: '90vh', width: '80%', position: 'fixed', bottom: '30px', right: '10px', top: '50vh'}}
                    initialCenter={{ lat: 44.89179, lng: -93.302773 }}
                    center={this.state.latLng}
                    /* // map={this.map} */
                    bounds={this.bounds}>
                    {streets}
        
                    <PlacesAutocomplete
                      value={this.state.address}
                      onChange={this.handleChange}
                      onSelect={this.handleSelect}
                    >
                      {({ getInputProps, suggestions, getSuggestionItemProps, options }) => (
                        <div className="flexWrapper">
                          <input
                            {...getInputProps({
                              placeholder: 'Search Places ...',
                              className: 'location-search-input',
                            })}
                          />
                          <div className="autocomplete-dropdown-container">
                            {suggestions.map(suggestion => {
                              const className = suggestion.active ? 'suggestion-item--active' : 'suggestion-item';
                              // inline style for demonstration purpose
                              const style = suggestion.active
                                          ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                                          : { backgroundColor: '#ffffff', cursor: 'pointer' };
                              return (
                                <div {...getSuggestionItemProps(suggestion, { className, style })}>
                                  {/* <span>{suggestion.description}</span> */}
                                </div>
                              )
                            })}
                          </div>
                        </div>
                      )}
                    </PlacesAutocomplete>
                    <InfoWindow marker={this.state.activeMarker}
                        visible={this.state.showingMarkerInfoWindow}>
                        {/* // onClose={this.onInfoWindowClose}> */}
                  <MediaCard selectedPlace = {this.state.selectedPlace} />
                    </InfoWindow>
                </Map>
                         </div>
               )
        }
    }
}


const connectToGoogleMaps = GoogleApiWrapper({
    apiKey: ('AIzaSyDzaU7KsHW6rhxRrbkgLe34uyTYZ0FSpQU'),
    libraries: ['places']
})(MapContainer)

export default connect(mapStateToProps)(connectToGoogleMaps)


 // Map.propTypes = {
        //     google: React.PropTypes.object,
        //     zoom: React.PropTypes.number,
        //     initialCenter: React.PropTypes.object,
        //     centerAroundCurrentLocation: React.PropTypes.bool
        //   }
        //   Map.defaultProps = {
        //     zoom: 13,
        //     // San Francisco, by default
        //     initialCenter: {
        //       lat: 37.774929,
        //       lng: -122.419416
        //     },
        //     centerAroundCurrentLocation: React.PropTypes.bool
        //   }
    // recenterMap() {
    //     const map = this.map;
    //     const curr = this.state.currentLocation;
    
    //     const google = this.props.google;
    //     const maps = google.maps;
    
    //     if (map) {
    //         let center = new maps.LatLng(curr.lat, curr.lng)
    //         map.panTo(center)
    //     }
    //   }








//     value={this.state.address}
//     onChange={this.handleChange}
//     onSelect={this.handleSelect}
//   >
//     {({ getInputProps, suggestions, getSuggestionItemProps }) => (
//       <div>
//         <input
//           {...getInputProps({
//             placeholder: 'Search Places ...',
//             className: 'location-search-input'
//           })}
//         />
//         <div className="autocomplete-dropdown-container">
//           {suggestions.map(suggestion => {
//             const className = suggestion.active ? 'suggestion-item--active' : 'suggestion-item';
//             // inline style for demonstration purpose
//             const style = suggestion.active
//                         ? { backgroundColor: '#fafafa', cursor: 'pointer' }
//                         : { backgroundColor: '#ffffff', cursor: 'pointer' };
//             return (
//               <div {...getSuggestionItemProps(suggestion, { className, style })}>
//                 <span>{suggestion.description}</span>
//               </div>
//             )
//           })}
//         </div>
//       </div>
//     )}
//   </PlacesAutocomplete>


/* <InfoWindow visible={this.state.showingNewWaypointWindow}>

                </InfoWindow> */
/* <Polyline
                onClick={this.onPolylineClicked}
          path={polyline}
          strokeColor="#0000FF"
          strokeOpacity={0.8}
          strokeWeight={2} />
             <InfoWindow polyline={this.state.activePolyline}visible={this.state.showingPolylineInfoWindow}>
                    <div>
                        <p>{this.state.polylinePlace.path}</p>

                    </div>
                </InfoWindow> */

                    //   recenterMap =() => {
    //     var map = this.state.map;

    //     var google = this.props.google;


    //     if (!google) return;
    //     var maps = google.maps;

    //     if (map) {
    //       var center = this.state.latLng;
    //     //   if (!(center instanceof google.maps.LatLng)) {
    //     //     center = new google.maps.LatLng(center.lat, center.lng);
    //       }
    //       this.state.map.panTo(center)
    //       this.state.map.setCenter(center);
    //       this.state.maps.event.trigger(map, 'recenter');
    //     }

    // componentDidMount() {
    //     this.getAllStreets();
        // Map.propTypes = {
        //     google: React.PropTypes.object,
        //     zoom: React.PropTypes.number,
        //     initialCenter: React.PropTypes.object,
        //     centerAroundCurrentLocation: React.PropTypes.bool
        //   }
    // }

    // handleChange = (address) => {
    //     this.setState({ address })
    // }

    //   handleSelect = (address) => {
    //     geocodeByAddress(address)
    //       .then(results => getLatLng(results[0]))
    //       .then(latLng => console.log('Success', latLng))
    //       .catch(error => console.error('Error', error))
    //   }
//     loadMap = () => {
//         if (this.props && this.props.google) {
//           // google is available
//           const {google} = this.props;
//           const maps = google.maps;
//           const mapRef = this.refs.map;
//         //   const node = ReactDOM.findDOMNode(mapRef);
//           let zoom = 14;
//           let lat = 44.898106;
//           let lng = -93.311647;
//           const center = new maps.LatLng(lat, lng);
//           const mapConfig = Object.assign({}, {
//             center: center,
//             zoom: zoom
//         })
//         this.setState({
//             map: new maps.Map(mapRef, mapConfig)
//         })
//     }
// }

// componentDidUpdate(prevProps, prevState) {
//     if (prevState.currentLocation !== this.state.currentLocation) {
//       this.recenterMap();
//     }
// }
    // geolocate = () => {
    //     if (navigator.geolocation) {
    //       navigator.geolocation.getCurrentPosition(function(address) {
    //         var geolocation = {
    //           lat: address.coords.latitude,
    //           lng: address.coords.longitude
    //         };
    //         var circle = new Marker({
    //           center: geolocation,
    //           radius: address.coords.accuracy
    //         });
    //         this.handleSelect.setBounds(circle.getBounds());
    //       });
    //     }
    //   }