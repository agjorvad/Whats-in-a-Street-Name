import React, { Component } from 'react';
import { connect } from 'react-redux';
import Nav from '../../components/Nav/Nav';
import { USER_ACTIONS } from '../../redux/actions/userActions';
import MapContainer from '../MapContainer/MapContainer'


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
    let content = null;
    if (this.props.user.userName) {
      content = (
            <MapContainer />
      );
    };

    return (
      <div>
        <Nav />
            { content }
      </div>
    );
  };
};

const mapStateToProps = state => ({
  user: state.user,
  state
});

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(MapPage);
