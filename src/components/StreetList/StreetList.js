import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import { connect } from 'react-redux';

const mapStateToProps = reduxState => ({
  reduxState
})

const styles = {
  list: {
    width: '350',
  }
};

class StreetList extends React.Component {
  state = {
    top: false,
    left: false,
    bottom: false,
    right: false,
  };

  componentDidMount() {
    this.props.dispatch({
      type: 'FETCH_STREETS',
    })
  };

  toggleDrawer = (side, open) => () => {
    this.setState({
      [side]: open,
    })
  };

  render() {
    return (
      <div>
        <div className="toggleButton">
          <Button onClick={this.toggleDrawer('right', true)} style={{textAlign: 'right', float: 'right', marginTop:'-37px'}}>Show List</Button>
          </div>
          <Drawer anchor="right" open={this.state.right} onClose={this.toggleDrawer('right', false)}>
            <div
              tabIndex={0}
              role="button"
              onClick={this.toggleDrawer('right', false)}
              onKeyDown={this.toggleDrawer('right', false)}>
            </div>
            <div className="list" style={{width: '250px', textAlign: 'center', zIndex: 9999, divider: 'true'}}>
              {this.props.reduxState.roads.map(item =>
                <List>{item.street_name}</List>
              )}
            </div>
          </Drawer>
      </div>
    ); // end return
  }
}

export default connect(mapStateToProps)(StreetList)
