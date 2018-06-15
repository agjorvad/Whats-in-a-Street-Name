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
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
  toggleButton: {
    // marginLeft: -12,
    // marginRight: 'auto',
    float: 'right',
    marginTop: -40

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
  }

  toggleDrawer = (side, open) => () => {
    this.setState({
      [side]: open,
    });
  };

  render() {
    // console.log('street list render reduxState: ', this.props.reduxState);
    const { classes } = this.props;

    // const roads = this.props.reduxState.roads.map(item =>
    //     <List>{item.street_name}</List>
    //   );

    return (
      <div>
      
        <div className={classes.toggleButton}>
          {/* <Button onClick={this.toggleDrawer('left', true)}>Open Left</Button> */}
          <Button onClick={this.toggleDrawer('right', true)}>Open Right</Button>
          <Drawer anchor="right" open={this.state.right} onClose={this.toggleDrawer('right', false)}>
            <div
              tabIndex={0}
              role="button"
              onClick={this.toggleDrawer('right', false)}
              onKeyDown={this.toggleDrawer('right', false)}
            >
            </div>
            <div className={classes.list}>
              {/* {roads} */}
              {this.props.reduxState.roads.map(item =>
                <List>{item.street_name}</List>
              )}
              }
            </div>

          </Drawer>
        </div>
      </div>
    ); // end return
  }
}

StreetList.propTypes = {
  // classes: PropTypes.object.isRequired,
};

const styling = withStyles({ styles })(StreetList)
export default connect(mapStateToProps)(styling)
