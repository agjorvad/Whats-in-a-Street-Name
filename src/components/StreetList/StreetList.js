import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
// import { mailFolderListItems, otherMailFolderListItems } from './tileData';
import { connect } from 'react-redux';

const mapStateToProps = reduxState => ({
  reduxState
})

const styles = {
  // list: {
  //   width: 250,
  // },
  list: {
    width: '350',
  },
  // toggleButton: {
  //   // marginLeft: -12,
  //   // marginRight: 'auto',
  //   float: 'right',
  //   marginTop: -40

  // }
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
  }

  toggleDrawer = (side, open) => () => {
    this.setState({
      [side]: open,
    });
  };



  render() {
    // console.log('street list render reduxState: ', this.props.reduxState);
    // const { classes } = this.props;

    // const roads = this.props.reduxState.roads.map(item =>
    //     <List>{item.street_name}</List>
    //   );
   
    return (

      <div>
        <div className="toggleButton">
          {/* <Button onClick={this.toggleDrawer('left', true)}>Open Left</Button> */}
          <Button onClick={this.toggleDrawer('right', true)} style={{textAlign: 'right', float: 'right', marginTop:'-40px'}}>Show List</Button>
          </div>
          <Drawer anchor="right" open={this.state.right} onClose={this.toggleDrawer('right', false)}>
          
            <div
              tabIndex={0}
              role="button"
              onClick={this.toggleDrawer('right', false)}
              onKeyDown={this.toggleDrawer('right', false)}
            >
            </div>
            <div className="list" style={{width: '250px', textAlign: 'center', zIndex: 9999, divider: 'true'}}>
              {/* {roads} */}
              {this.props.reduxState.roads.map(item =>
                <List>{item.street_name}</List>
              )}
            </div>

          </Drawer>
        
      </div>
    ); // end return
  }
}

// StreetList.propTypes = {
//   classes: PropTypes.object.isRequired,
// };

export default connect(mapStateToProps)(StreetList)
