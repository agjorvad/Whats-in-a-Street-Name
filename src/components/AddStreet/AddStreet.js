import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import axios from 'axios';

const styles = theme => ({
    container: {
        justifyContent: 'center',
        
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
        <div className={classes.root}>
              <Grid container spacing={32}>
        <form  className={classes.container} noValidate autoComplete="off" onSubmit={this.handleSubmit}>
        <Grid item xs={12}>

            <TextField
                  label="Street Name"
                  value={this.state.streetInfo.street_name}
                  onChange={this.handleChangeFor('street_name') }
                  margin="normal"
            />
            </Grid>
            <Grid item xs={12}>
            <TextField
            label="Street History"
            value={this.state.streetInfo.street_history}
            onChange={this.handleChangeFor("street_history")}
            margin="normal" />
            </Grid>

            <Grid item xs={12}>
            <TextField
            label="Latitude"
            value={this.state.streetInfo.latitude}
            onChange={this.handleChangeFor("latitude")}
            margin="normal"
            />
            </Grid>
            <Grid item xs={12}>
            <TextField
                 name="title"
                 label="Longitude"
                 value={this.state.streetInfo.longitude}
                 onChange={this.handleChangeFor("longitude")}
                 margin="normal"
            />
            </Grid>
            <Grid item xs={12}>
            <TextField 
            label="Image Url"
            value={this.state.streetInfo.image_url}
            onChange={this.handleChangeFor("image_url")}
            margin="normal"
            />
            </Grid>
            <Grid item xs={12}>
            <TextField
                 label="Link Url"
            value={this.state.streetInfo.link_url}
            onChange={this.handleChangeFor("link_url")}
            margin="normal"
            />
            </Grid>

                <FormControl>
                    <Button variant="raised" size="small" color="primary" type="submit">
                        Submit Street History
            </Button>
                </FormControl>

        </form>
        </Grid>
        </div>
    );
}
  }


AddStreet.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AddStreet);

