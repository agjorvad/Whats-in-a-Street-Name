import React, { Component } from 'react';
import { connect } from 'react-redux';

import Nav from '../../components/Nav/Nav';
import { USER_ACTIONS } from '../../redux/actions/userActions';

import MapContainer from '../MapContainer/MapContainer'


class MapPage extends Component {
  

  componentDidMount() {
    this.props.dispatch({type: USER_ACTIONS.FETCH_USER});
  };//end componentDidMount

  componentDidUpdate() {
    if (!this.props.user.isLoading && this.props.user.userName === null) {
      this.props.history.push('login');
    }//end if
  };//end componentDidUpdate



  render() {    
    let content = null;
    //end .map of tracklist
    if (this.props.user.userName) {
      content = (
            <MapContainer />
      );//end content
    };//end if statement

    return (
      <div>
        <Nav />
            { content }
      </div>
    );//end return
  };//end render
};//end class

const mapStateToProps = state => ({
  user: state.user,
  state
});
// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(MapPage);
