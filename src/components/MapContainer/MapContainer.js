import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Map, InfoWindow, Marker, GoogleApiWrapper, Polyline } from 'google-maps-react';
import axios from 'axios';
import {Link} from 'react-router-dom'

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
    };
    this.bounds = {};
  }

  componentDidMount() {
    this.getAllStreets();
  }

  getAllStreets = () => {
    axios.get('/api/street')
      .then(response => {
        console.log(response.data);
        return this.setState({
          streetList: 'test string',
        })
        console.log(this.streetList)
      })
      .catch((error) => {
        console.log('error on get: ', error);
      })
    }

  componentWillReceiveProps(nextProps) {
    this.bounds = new this.props.google.maps.LatLngBounds();
    for (let i = 0; i < nextProps.state.currentMap.allTrackpoint.length; i++) {
      this.bounds.extend(nextProps.state.currentMap.allTrackpoint[i]);
    }
    return true;
  }

  onMapClicked = (props, e) => {
    if (this.state.showingMarkerInfoWindow) {
      this.setState({
        showingMarkerInfoWindow: false,
        activeMarker: null
      })
    } else {
      console.log('this.state.selectedPlace: ', props, 'error: ', e);
    };//end if/else
  };//end onMapClicked
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
    };//end if/else
  };//end onMapClicked

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
        let markers = [
            {
              name: 'Newton Avenue South',
              description: 'Newton Avenue was named for Sir Isaac Newton (1642-1727), a British philosopher and mathematician who wrote the theory of universal gravitation.',
              image_url: 'blah',
              link_url: "wikipedia.org/wiki/Newton",
              lat: 44.8951144,
              lng: -93.3061215
            },
            {
                name: 'Knox Avenue South',
                description: 'Knox Avenue was named for General Henry Knox (1756-1806), an artillery commander in the Revolutionary War and later the U.S. Secretary of War (now Defense) from 1785-1795).  Fort Knox in Kentucky is also named after him.',
                image_url: 'blah',
                link_url: "wikipedia.org/wiki/Knox",
                lat: 44.891792,
                lng: -93.302773
              },
              {
                name: 'Logan Avenue South',
              description: 'Logan Avenue was named for John A. Logan (1826-1886), a Civil War General from Jackson County, Ill. He served with William Tecumseh Sherman on his March to the Sea.  Logan also served in the U.S. House of Representatives and in the U.S. Senate.  At one point he was a Republican vice presidential candidate.',
              image_url: 'blah',
              link_url: "wikipedia.org/wiki/Logan",
              lat: 44.892094,
              lng: -93.303963
            },
            {
            name: 'Oliver Avenue South',
            description: 'Oliver Avenue was named for Deacon A.M. Oliver of the Presbyterian Church in Missouri.  His widow was a generous donor to the (former) Oliver Presbyterian Church in south Minneapolis and to Macalester College.',
            image_url: 'blah',
            link_url: "wikipedia.org/wiki/Logan",
            lat: 44.898643,
            lng: -93.307411
          },
          {
            name: 'Morgan Avenue South',
            description: 'Morgan Avenue was named for Colonel George N. Morgan (1825-1866).  He enlisted in the 1st Minnesota Regiment in 1856 and later became a brigadier general.',
            image_url: 'blah',
            link_url: "wikipedia.org/wiki/Logan",
            lat: 44.8977814,
            lng: -93.3047523
          },
          {
            name: 'Russell Avenue South',
            description: 'Russell Avenue was named for Roswell P. Russell (1820-1896), who came to Fort Snelling in 1839 and who opened the first store in the old city of St. Anthony in 1847.  He was the receiver of the U.S. Land Office from 1854-1857.',
            image_url: 'blah',
            link_url: "wikipedia.org/wiki/Logan",
            lat: 44.894333,
            lng: -93.311211
          },
          {
            name: 'Washburn Avenue South',
            description: 'Washburn Avenue was named for Cadwallader C. Washburn (1818-1882) and/or his brother William D. Washburn.  Both were founders of the Washburn Crosby Company (later General Mills).  C.C. Washburn was governor of Wisconsin from 1872-1873 and built the might Washburn “A” mills in 1874 and 1878.  W.D. Washburn was a senator from Minnesota.  Both men had tremendous influence of the early political and economic life of the City of Minneapolis and the state of Minnesota.',
            image_url: 'blah',
            link_url: "wikipedia.org/wiki/Logan",
            lat: 44.8948829,
            lng: -93.3175638
          },
          {
            name: 'Thomas Avenue South',
            description: 'Thomas Avenue was named for George H. Thomas (1816-1870), a Union general during the Civil War.',
            image_url: 'blah',
            link_url: "wikipedia.org/wiki/Logan",
            lat: 44.9015866,
            lng: -93.3137436
          },
          {
            name: 'Upton Avenue South',
            description: 'Upton Avenue was named for General Emory Upton (1839-1881).  He was a Civil War general for the Union Army and later the commandant of cadets at West Point from 1870-1875.',
            image_url: 'blah',
            link_url: "wikipedia.org/wiki/Logan",
            lat: 44.8948737,
            lng: -93.315023
          },
          {
            name: 'Sheridan Avenue South',
            description: 'Sheridan Avenue was named for General Phillip Henry Sheridan (1831-1888).  Sheridan was a Civil War hero from Albany, N.Y. He helped end the Civil War by cutting off Confederate General Robert E. Lee’s retreat from the battle of Appomattox.  In 1884 her became the commander of the U.S. Army.',
            image_url: 'blah',
            link_url: "wikipedia.org/wiki/Logan",
            lat: 44.897957,
            lng: -93.312477
          },
          {
            name: 'Vincent Avenue South',
            description: 'Vincent Avenue was named for Thomas M. Vincent (1832-1909).  He graduated from West Point in 1853 and was the assistant adjutant general of the United States through the Civil War.',
            image_url: 'blah',
            link_url: <a href="wikipedia.org/wiki/Logan"/>,
            lat: 44.9038658,
            lng: -93.316265
          },
          ];
       let streets = markers.map((item)=>{
        return (<Marker
            key={item.id}
            onClick={this.onMarkerClick}
            title={item.description}
            name={item.name}
            position={{ lat: item.lat, lng: item.lng }}
            link_url={item.link_url} />)
       });//end .map of trackWaypoint
        return (
          <Map onClick={this.onMapClicked}
            google={this.props.google}
            zoom={13}
            style={{ width: '100vw', height: '100vh', position: 'relative' }}
            initialCenter={{ lat: 44.898106, lng: -93.311647}}
            bounds={this.bounds}>
            {streets}
            <InfoWindow marker={this.state.activeMarker}
              visible={this.state.showingMarkerInfoWindow}
              onClose={this.onInfoWindowClose}>
              <div>
                <p>{this.state.selectedPlace.name}</p>
                <p>{this.state.selectedPlace.title}</p>
                <p><a href={this.state.selectedPlace.link_url}/></p>
                <img src="asdfadsfadf"/>
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