import React, { Component } from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Delete from '@material-ui/icons/Delete';

import axios from 'axios';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
// import classNames from 'classnames';
import moment from 'moment';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/ModeEdit';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
// import DialogContentText from '@material-ui/core/DialogContentText';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
// import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import {connect} from 'react-redux'
import swal from 'sweetalert'

const styles = {
card: {
    width: 395,
    height: 600,
    marginBottom: 12,
},
title: {
    marginBottom: 16,
    fontSize: 14,
},
pos: {
    marginBottom: 12,
},
media: {
    height: 200,
    paddingTop: '56.25%', // 16:9
},
// dialog: {
//     minHeight: 200,
//     minWidth: 100,
// }
};
const customContentStyle = {
    width: '100%',
    maxWidth: 'none',
  };

const mapStateToProps = state => ({
    user: state.user,
});

class StreetItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            newStreetInfo: {
            street_name: this.props.item.street_name,
            street_history: this.props.item.street_history,
            image_url: this.props.item.image_url,
            link_url: this.props.item.link_url,
            person_id: this.props.item.person_id,
            street_id: this.props.item.street_id
            }
        }
    }

    handleClickOpen = () => {
        this.setState({ open: true });
      };
    
      handleClose = () => {
        this.setState({ open: false });
        this.getAllMediaCards();
      };

      getAllStreets = () => {
        axios.get('/api/street')
            .then(response => {
                console.log(response.data);
                this.setState({
                    streetList: response.data,
                })
                console.log(this.state.streetList)
            })
            .catch((error) => {
                console.log('error on get: ', error);
            })
        }

    getAllMediaCards = () => {
        axios.get('/api/mediacard')
            .then(response => {
                console.log(response.data);
                this.setState({
                    mediaCardList: response.data,
                })
                console.log(this.state.mediaCardList)
            })
            .catch((error) => {
                console.log('error on get: ', error);
            })
    }

    editStreet = street => {
        console.log
        axios.put(`/api/mediacard`, street)
          .then(response => {
            console.log('this is after an EDIT', response);
            this.handleClose();
            // swal({
            //     title: 'You have successfully edited the street',
            //     icon: 'success',
            // });
            this.getAllMediaCards();
            window.location.reload();
          }).catch(error => {
            console.log(error);
          })
      }

      handleChangeEdit = propertyName => event => {
        this.setState({
          newStreetInfo: {
            ...this.state.newStreetInfo,
            [propertyName]: event.target.value,
          }
        });
        console.log(event.target.value);
      }

    //   handleEditToggle = (street) => {
    //     console.log('edit button clicked');
    //     this.setState({
    //       editable: !this.state.editable,
    //     });
    //     console.log(this.state.editable);
    //   }
    
    //   handleEdit = (street) => {
    //     console.log('edit button clicked');
    //     console.log(this.state.editable);
    //     this.editStreet(street);
    //   }

    render() {
        const { classes } = this.props;
        return (
            <div>
            <Card className={classes.card} style={{maxHeight: 1000, overflow: 'auto', margin: 8}}>
                <CardMedia
                    className={classes.media}
                    image= {this.props.item.image_url}
                    title="Image"
                />
                <CardContent>
                    <Typography variant="headline" component="h1">
                        {this.props.item.street_name}
                    </Typography>
                    <Typography component="p">
                        {this.props.item.street_history}
                    </Typography>
                    {/* <Typography component="p">
                        Latitude: {this.props.item.latitude}
                    </Typography>
                    <Typography component="p">
                        Longitude: {this.props.item.longitude}
                    </Typography> */}
                    <Typography component="p">
                        Link URL: <a href={this.props.item.link_url} target="_blank">{this.props.item.link_url}</a>
                        </Typography>
                </CardContent>
                <CardActions>
                    <Button variant="fab" mini color="secondary" aria-label="delete" onClick={() => this.props.delete(this.props.item)}><DeleteIcon /></Button>
                    <Button variant="fab" mini color="secondary" aria-label="edit" onClick={this.handleClickOpen}><EditIcon /></Button>
                </CardActions>
            </Card>
            <Dialog
            contentStyle={customContentStyle}
      open={this.state.open}
      onClose={this.handleClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogContent>
        <TextField margin="dense" style={{width: 500}} autoFocus className="input" onChange={this.handleChangeEdit('street_name')} defaultValue={this.props.item.street_name} placeholder='Street Name' />
        <br />
        <TextField 
        multiline={true}
        rows={4}
        className="input" style={{width: 500}} onChange={this.handleChangeEdit('street_history')} defaultValue={this.props.item.street_history} placeholder='Street History' />
        <br />
        {/* <TextField className="input" style={{width: 500}} onChange={this.handleChangeEdit('latitude')} defaultValue={this.props.item.latitude} placeholder='Latitude' />
        <br /> */}
        <TextField className="input" style={{width: 500}} onChange={this.handleChangeEdit('image_url')} defaultValue={this.props.item.image_url} placeholder='Image URL' />
        <br />
        <TextField className="input" style={{width: 500}} onChange={this.handleChangeEdit('link_url')} defaultValue={this.props.item.link_url} placeholder='Link URL' />
        <br />
        {/* <FormControl> */}

          {/* <Select
            value={this.state.updateHiitArticle.article_type}
            onChange={this.handleChangeEdit('article_type')}
            displayEmpty
          >
            <MenuItem value={'strength training'}>Strength Training</MenuItem>
            <MenuItem value={'aerobic training'}>Aerobic Training</MenuItem>
            <MenuItem value={'high intensity interval training'}>High Intensity Interval Training</MenuItem>
            <MenuItem value={'yoga'}>Yoga</MenuItem>
          </Select> */}
        {/* </FormControl> */}
        </DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={this.handleClose}>
          Cancel
        </Button>
        <Button variant="raised" color="primary" onClick={() => this.editStreet(this.state.newStreetInfo)}>Save Changes</Button>
      </DialogActions>
    </Dialog>
        {/* <br />
        <TextField
          multiline={true}
          rows={4}
          className="input" onChange={this.handleChangeEdit('study_details')} value={this.state.updateHiitArticle.study_details} placeholder='Study details here' />
        <br />
        <TextField type="date" className="input" onChange={this.handleChangeEdit('date_posted')} value={this.state.updateHiitArticle.date_posted} placeholder='Date posted' /> */}

     
        </div>
//             < TableRow>
//                 <TableCell>
//                 <TextField
//                   defaultValue={this.props.item.street_name}
//                   onChange={this.handleChangeEdit('street_name') }
//                     />
//                        <Button onClick={() => this.handleEdit(this.state.newStreetInfo)}>Save</Button>
//                     <Button onClick={this.handleEditToggle}>Cancel</Button>
//                 </TableCell>
//                 <TableCell>
//                     {this.props.item.street_history}
//                 </TableCell>
//                 <TableCell>
//                     {this.props.item.latitude}
//                 </TableCell>
//                 <TableCell>
//                     {this.props.item.longitude}
//                 </TableCell>
//                 <TableCell>
//                     {this.props.item.link_url}
//                 </TableCell>
//                 <TableCell>
//                     <Button onClick={this.handleEditToggle}>Edit</Button>
//                     <Button onClick={() => { this.props.delete(this.props.item.id) }} variant="raised" color="secondary">
//                         Delete
// <Delete />
//                     </Button>
        
//                 </TableCell>
//             </TableRow>
        )
    }
}

StreetItem.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps)(withStyles(styles)(StreetItem));