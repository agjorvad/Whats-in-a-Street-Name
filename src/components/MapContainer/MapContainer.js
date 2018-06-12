import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Map, InfoWindow, Marker, GoogleApiWrapper, Polyline } from 'google-maps-react';
import axios from 'axios';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import PlacesAutocomplete from 'react-places-autocomplete'
import { geocodeByAddress, geocodeByPlaceId, getLatLng } from 'react-places-autocomplete'
import Contents from '../AutoComplete/AutoComplete'
import MediaCard from '../MediaCard/MediaCard'

const mapStateToProps = state => ({
    user: state.user,
});

const styles = {
    card: {
        maxWidth: 345,
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
};

// const {lat,lng} = this.props.initialCenter
class MapContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showingMarkerInfoWindow: false,
            activeMarker: {},
            selectedPlace: {},
            streetList: [],
            address: '',
            latLng: '',
            map: '',
        };
        this.bounds = {};
    }

    geolocate = () => {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(address) {
            var geolocation = {
              lat: address.coords.latitude,
              lng: address.coords.longitude
            };
            var circle = new Marker({
              center: geolocation,
              radius: address.coords.accuracy
            });
            this.handleSelect.setBounds(circle.getBounds());
          });
        }
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

    //   recenterMap =() => {
    //     var map = this.map;

    //     var google = this.props.google;


    //     if (!google) return;
    //     var maps = google.maps;

    //     if (map) {
    //       var center = this.state.latLng;
    //     //   if (!(center instanceof google.maps.LatLng)) {
    //     //     center = new google.maps.LatLng(center.lat, center.lng);
    //       }
    //       map.panTo(center)
    //       map.setCenter(center);
    //       maps.event.trigger(map, 'recenter');
        // }

    componentDidMount() {
        this.getAllStreets();
        // Map.propTypes = {
        //     google: React.PropTypes.object,
        //     zoom: React.PropTypes.number,
        //     initialCenter: React.PropTypes.object,
        //     centerAroundCurrentLocation: React.PropTypes.bool
        //   }
    }

    // handleChange = (address) => {
    //     this.setState({ address })
    // }

    //   handleSelect = (address) => {
    //     geocodeByAddress(address)
    //       .then(results => getLatLng(results[0]))
    //       .then(latLng => console.log('Success', latLng))
    //       .catch(error => console.error('Error', error))
    //   }

   

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
                        <div id="alphaList" className="opened">
                        <span id="filterCurrent">Alta California</span>
                        <br></br>
                        <span id="clearFilter">Show All</span>
                        </div>
                        <div id="alphaListInner" className="allStreets">
                        <a href="#1">{markers.name}</a>
                        </div>
                <Map 
                onClick={this.onMapClicked}
                    google={this.props.google}
                    zoom={14}
                    style={{ width: '40vw', height: '40vh', position: 'relative' }}
                    initialCenter={{ lat: 44.898106, lng: -93.311647 }}
                    center={this.state.latLng}
                    bounds={this.bounds}>
                    {streets}
                    <PlacesAutocomplete
                      value={this.state.address}
                      onChange={this.handleChange}
                      onSelect={this.handleSelect}
                    >
                      {({ getInputProps, suggestions, getSuggestionItemProps, options }) => (
                        <div>
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
                                  <span>{suggestion.description}</span>
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
                < Contents />
                         </div>
               )
        }
    }
}


const connectToGoogleMaps = GoogleApiWrapper({
    apiKey: ('AIzaSyDzaU7KsHW6rhxRrbkgLe34uyTYZ0FSpQU'),
    libraries: ['places']
})(MapContainer)

// GoogleApi({
//     apiKey: 'AIzaSyDzaU7KsHW6rhxRrbkgLe34uyTYZ0FSpQU',
//     libraries: ['places']
//   });
export default connect(mapStateToProps)(connectToGoogleMaps)











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


{/* <InfoWindow visible={this.state.showingNewWaypointWindow}>

                </InfoWindow> */}
{/* <Polyline
                onClick={this.onPolylineClicked}
          path={polyline}
          strokeColor="#0000FF"
          strokeOpacity={0.8}
          strokeWeight={2} />
             <InfoWindow polyline={this.state.activePolyline}visible={this.state.showingPolylineInfoWindow}>
                    <div>
                        <p>{this.state.polylinePlace.path}</p>

                    </div>
                </InfoWindow> */}