import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Map, InfoWindow, Marker, GoogleApiWrapper, Polyline } from 'google-maps-react';
import axios from 'axios';
import PlacesAutocomplete from 'react-places-autocomplete'
import { geocodeByAddress, geocodeByPlaceId, getLatLng } from 'react-places-autocomplete'
import MediaCard from '../MediaCard/MediaCard'
import './MapContainer.css'
import StreetList from '../StreetList/StreetList'
// import {geolocated} from 'react-geolocated';

const mapStateToProps = state => ({
    user: state.user,
});

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
            console.log(this.state.streetList)
            return (
                <div>
                    <StreetList />
                    <div className="wrapper">
                        <div className="main">
                            <div className="container">
                                <div className="row">
                                    {/* <div className="col-xs-5 title-container">
                  Nothing
                </div> */}
                                    <div className="col-xs-7 form-container">
                                        <Map
                                            onClick={this.onMapClicked}
                                            google={this.props.google}
                                            zoom={16}
                                            style={{ height: '620px', width: '1140px', position: 'absolute', top: '100px' }}
                                            initialCenter={{ lat: this.props.latitude, lng: this.props.longitude }}
                                            center={this.state.latLng}
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
                                                <MediaCard selectedPlace={this.state.selectedPlace} />
                                            </InfoWindow>
                                        </Map>
                                        />
                </div>
                                </div>
                            </div>
                        </div>
                    </div>
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
