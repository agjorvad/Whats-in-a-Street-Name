// import React from 'react';

// const Header = ({ title }) => (
//   <div className="instructions">
//     <div>
//       <h1 className="lead">{ title }</h1>
//     </div>
//   </div>
// );

// export default Header;

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import MenuListComposition from '../MenuList/MenuList';
import LogoutButton from '../LogoutButton/LogoutButton';
import './Header.css';

const styles = {
  root: {
    flexGrow: 1,
  },
  flex: {
    flex: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

function Header(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <MenuListComposition />
          <Typography variant="title" className={classes.flex}>
          What's In a (Street) Name?
          {/* <img src="images/yikekp7pT.jpeg" alt="skyline" height="150" className="logo" /> */}
         </Typography>
        <LogoutButton />
        </Toolbar>
      </AppBar>
    </div>
  );
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Header);
