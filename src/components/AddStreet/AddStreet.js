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
import Select from '@material-ui/core/Select';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import { USER_ACTIONS } from '../../redux/actions/userActions';
import {connect} from 'react-redux'
import swal from 'sweetalert'

const styles = theme => ({
    container: {
        justifyContent: 'center',
        
    },
});

const mapStateToProps = state => ({
  user: state.user,
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

  componentDidMount() {
    this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
}

componentDidUpdate() {
    if (!this.props.user.isLoading && this.props.user.userName === null) {
        this.props.history.push('home');
    }
}

  handleClickOpen = () => {
    this.setState({ open: true });
};

handleClose = () => {
    this.setState({ open: false })
    this.props.get()
};


  handleChangeFor = propertyName => event => {
    console.log(event.target.value);
    this.setState({
      streetInfo: {
        ...this.state.streetInfo,
        [propertyName]: event.target.value,
      }
    });
  }

  addNewStreet = (event) => {
    event.preventDefault();
    console.log(this.state.streetInfo);
    this.postStreet();
    this.handleClose();
    window.location.reload();
  }

  postStreet = () => {
    axios.post('/api/street', this.state.streetInfo)
      .then((response) => {
        console.log('success');
        swal({
            title: 'You have successfully added a new street!',
            icon: 'success'
            
        });
      })
      .catch((error) => {
        swal('There was a problem.',  'Please fill out all fields.');
      })
  }
  
  render() {
    let content = null;
    const { classes } = this.props;

    if (this.props.user.userName) {
        content = (
            <div>
                <Button style={{display: 'block', marginLeft: 'auto', marginRight: 'auto', marginTop: '-40px'}} onClick={this.handleClickOpen}>Add New Street</Button>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="form-dialog-title"
                >
   
                    <DialogContent>
                        <TextField required="true" margin="dense" style={{width: '500px'}} autoFocus fullWidth className="input" onChange={this.handleChangeFor('street_name')} value={this.state.streetInfo.street_name} placeholder='Street Name' />
                        <br />
                        <TextField className="input" style={{width: '500px'}} onChange={this.handleChangeFor('street_history')}   multiline={true}
                            rows={4} required='true' value={this.state.streetInfo.street_history} placeholder='Street History' />
                        <br />
                        <TextField
                            className="input" style={{width: '500px'}} onChange={this.handleChangeFor('latitude')} value={this.state.streetInfo.latitude} placeholder='Latitude' required="true"/>
                        <br />
                        <TextField className="input" style={{width: '500px'}} onChange={this.handleChangeFor('longitude')} value={this.state.streetInfo.longitude} placeholder='Longitude' required="true"/>
                        <br />
                        <TextField className="input" style={{width: '500px'}} onChange={this.handleChangeFor('image_url')} value={this.state.streetInfo.image_url} placeholder='Image URL' />
                        <br />
                        <TextField className="input" style={{width: '500px'}} onChange={this.handleChangeFor('link_url')} value={this.state.streetInfo.link_url} placeholder='Link URL' />
                        <br />
                    </DialogContent>
                    <DialogActions>
                        <Button variant="contained" onClick={this.handleClose}>
                            Cancel
                        </Button>
                        <Button variant="raised" size="small" color="primary" onClick={this.addNewStreet}>Submit Street History</Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }

    return (
        <div>
            {content}
        </div>
    );
}
}


AddStreet.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps)(withStyles(styles)(AddStreet));

