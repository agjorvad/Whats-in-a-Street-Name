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

class MapContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showingMarkerInfoWindow: false,
            activeMarker: {},
            selectedPlace: {},
            streetList: [],
            address: '',
        };
        this.bounds = {};
    }

    componentDidMount() {
        this.getAllStreets();
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

    onInfoWindowClose = () => {
        this.setState({
            showingInfoWindow: false,
            activeMarker: null
        })
    }

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
                    link_url={item.link_url} />)
            });
            return (
                <Map onClick={this.onMapClicked}
                    google={this.props.google}
                    zoom={14}
                    style={{ width: '100vw', height: '100vh', position: 'relative' }}
                    initialCenter={{ lat: 44.898106, lng: -93.311647 }}
                    bounds={this.bounds}>
                    {streets}
                    <InfoWindow marker={this.state.activeMarker}
                        visible={this.state.showingMarkerInfoWindow}
                        onClose={this.onInfoWindowClose}>
                        <div className="my-card-class">
                            <Card style={{ maxWidth: "400px", margin: "0 auto" }}>
                                <CardMedia
                                    style={{ height: "250px" }}
                                    image="images/sir-isaac-newton-9422656-1-402.jpg" />
                                <CardContent>
                                    <Typography gutterBottom variant="headline" component="h2">
                                        {this.state.selectedPlace.name}
                                    </Typography>
                                    <Typography component="p">
                                        {this.state.selectedPlace.history}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button size="small" color="primary">
                                        <a href={this.state.selectedPlace.link_url} target="_blank">{this.state.selectedPlace.link_url}</a>
                                    </Button>
                                </CardActions>
                            </Card>
                        </div>
                    </InfoWindow>
                </Map>
            );
        }
    }
}

const connectToGoogleMaps = GoogleApiWrapper({
    apiKey: ('AIzaSyDzaU7KsHW6rhxRrbkgLe34uyTYZ0FSpQU')
})(MapContainer)

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