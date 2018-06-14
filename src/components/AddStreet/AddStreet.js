import React, { Component } from "react";
import {
  Paper,
  Typography,
  TextField,
  Button,
  IconButton,
  FormControl,
  Select
} from "@material-ui/core";
import List, {
  ListItem,
  ListItemText,
  ListItemSecondaryAction
} from "@material-ui/core/List";
import { MenuItem } from "@material-ui/core/Menu";
import { withStyles } from "@material-ui/core/styles";
import axios from 'axios';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const mapReduxStateToProps = (reduxState) => (
  { reduxState }
);

const styles = theme => ({
  container: {
   display: "flex",
   flexWrap: 'wrap',
   height: 500
  },
  header: {
    display: "flex",
  },
  form: {
    minWidth: 120,
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
  },
});

class AddStreet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      streetInfo: {
        street_name: '',
        street_history: '',
        latitude: '',
        longitude: '',
        image_url: '',
        link_url: '',
      }
    }
  }

  handleChangeFor = propertyName => event => {
    console.log(event.target.value);
    this.setState({
      streetInfo: {
        ...this.state.streetInfo,
        [propertyName]: event.target.value,
      }
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    console.log(this.state.streetInfo);
    this.postStreet();
  }
  //     this.setState({
  //       userList: [...this.state.userList, this.state.user],
  //     user: {
  //       name: '',
  //       city: '',
  //       zip: '',
  //     }
  //   });
  //   }

  postStreet = () => {
    axios.post('/api/street', this.state.streetInfo)
      .then((response) => {
        console.log('success');
      })
      .catch((error) => {
        alert('There was a problem');
      })
  }

  render() {
    const { classes } = this.props;

    return (
      <Paper className={classes.container}>
        <Typography variant="display1" align="center" gutterBottom>
          Exercises
        </Typography>
        <form onSubmit={this.handleSubmit} className={classes.form}>
        <FormControl className={classes.formControl}>
          <TextField
            name="title"
            label="Street Name"
            value={this.state.streetInfo.street_name}
            onChange={this.handleChangeFor("street_name") }
            margin="normal"
          />
          </FormControl>
          <FormControl className={classes.formControl}>
          <TextField
            name="title"
            label="Street Name"
            value={this.state.streetInfo.street_history}
            onChange={this.handleChangeFor("street_history")}
            margin="normal"
          />
          </FormControl>
          <FormControl className={classes.formControl}>
          <TextField
            name="title"
            label="Latitude"
            value={this.state.streetInfo.latitude}
            onChange={this.handleChangeFor("latitude")}
            margin="normal"
          />
          </FormControl>
          <FormControl className={classes.formControl}>
          <TextField
            name="title"
            label="Longitude"
            value={this.state.streetInfo.longitude}
            onChange={this.handleChangeFor("longitude")}
            margin="normal"
          />
          </FormControl>
          <FormControl className={classes.formControl}>
          <TextField
            name="title"
            label="Image Url"
            value={this.state.streetInfo.image_url}
            onChange={this.handleChangeFor("image_url")}
            margin="normal"
          />
          </FormControl>
          <FormControl className={classes.formControl}>
          <TextField
            name="title"
            label="Link Url"
            value={this.state.streetInfo.link_url}
            onChange={this.handleChangeFor("link_url")}
            margin="normal"
          />
          </FormControl>
          <Button type="submit" color="primary" variant="raised">
            Submit Street History
          </Button>
        </form>
      </Paper>
    );
  }
}

AddStreet.propTypes = {
    classes: PropTypes.object.isRequired,
  };
export default withStyles(styles)(AddStreet);

