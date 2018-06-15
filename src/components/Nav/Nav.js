
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
});

function Nav(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <List component="nav">
        <ListItem button component='a' href="/user">
          <ListItemText primary="User Home" />
        </ListItem>
        <ListItem button component='a' href="/info">
          <ListItemText primary="Info Page" />
        </ListItem>
        <ListItem button component='a' href="/addstreet">
          <ListItemText primary="Add streets" />
        </ListItem>
        <ListItem button component='a' href="/editstreet">
          <ListItemText primary="Edit streets" />
        </ListItem>
        <ListItem button component='a' href="/map">
          <ListItemText primary="Map" />
        </ListItem>
      </List>
    </div>
  );
}

Nav.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Nav);

// const Nav = () => (
//   <div className="navbar">
  
//     <div>
//       <ul>
//         <li>
//           <Link to="/user">
//             User Home
//           </Link>
//         </li>
//         <li>
//           <Link to="/info">
//             Info Page
//           </Link>
//         </li>
//         <li>
//           <Link to="/map">
//             Map Page
//           </Link>
//           <Link to="/addstreet">
//            Add Street
//           </Link>
//         </li>
//       </ul>
//     </div>
//   </div>
// );
