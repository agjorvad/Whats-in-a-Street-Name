
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { Link, browserHistory, withRouter } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { USER_ACTIONS } from '../../redux/actions/userActions';
import { connect } from 'react-redux';
import { triggerLogout } from '../../redux/actions/loginActions';
import LogoutButton from '../LogoutButton/LogoutButton';

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
});

class Nav extends React.Component{

  logout = () => {
    this.props.dispatch(triggerLogout());
    this.props.history.push('login');
  }

render() {
  const { classes } = this.props;
  return (
    <div className={classes.root}>
      <List component="nav">
        <ListItem button component='a' href="/user">
          <ListItemText primary="User Home" />
        </ListItem>
        <ListItem button component='a' href="/info">
          <ListItemText primary="Info Page" />
        </ListItem>
        <ListItem button component='a' href="/editstreet">
          <ListItemText primary="Edit Streets" />
        </ListItem>
        <ListItem button component='a' href="/map">
          <ListItemText primary="Map" />
        </ListItem>
        <ListItem button component='nav'>
          <ListItemText primary="Logout" />
          <LogoutButton />
        </ListItem>
      </List>
    </div>
  );
}
}

Nav.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Nav);

