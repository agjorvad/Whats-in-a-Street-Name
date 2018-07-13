import React, { Component } from 'react';
import axios from 'axios';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import StreetItem from '../StreetItem/StreetItem';
import { USER_ACTIONS } from '../../redux/actions/userActions';
import {connect} from 'react-redux';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import TextField from '@material-ui/core/TextField';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import swal from 'sweetalert'
// import swal from 'sweetalert';

const mapStateToProps = state => ({
    user: state.user,
});

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    control: {
        padding: theme.spacing.unit * 2,
    },
});


class EditStreet extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mediaCardList: [],
            spacing: '16',
        }
    }

    componentDidMount() {
        this.props.dispatch({type: USER_ACTIONS.FETCH_USER});
        this.getAllMediaCards();
      };
    
      componentDidUpdate() {
        if (!this.props.user.isLoading && this.props.user.userName === null) {
          this.props.history.push('login');
        }
      };
// Get request
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
// Delete request
    deleteStreet = (entryToDelete) => {
        console.log(entryToDelete)
        axios({
            method: 'DELETE',
            url: '/api/mediacard',
            params: entryToDelete 
           

        })
            .then((response) => {
                console.log('success', response);
                this.getAllMediaCards();
                swal({
                    title: 'Street was deleted successfully',
                
                });
                window.location.reload();
            })
            .catch((error) => {
                console.log('There was a problem', error);
            })
    }
    
// Get feedback runs on page load

// Dialog box to confirm delete
    confirmDelete = (entryToDelete) => {
        confirmAlert({
            title: 'Confirm Delete',
            message: 'Are you sure you want to delete this street?',
            buttons: [
                {
// If yes, run delete request
                    label: 'Yes',
                    onClick: () => this.deleteStreet(entryToDelete)
                },
                {
                    label: 'No',
                    onClick: () =>  swal({
                        title: 'Delete cancelled',
                    
                    })
                }
            ]
        })
    };

    render() {
        let content = null;
        const { classes } = this.props;

        if (this.props.user.userName) {
            content = (
                
                    <div>
                        <ul>
                            <Grid container className={classes.root} spacing={16}>
                                <Grid item xs={12}>
                                    <Grid container className={classes.demo} justify="flex-start">
                                        {this.state.mediaCardList.map(item =>
                                            <StreetItem key={item.id}
                                                item={item}
                                                delete={this.confirmDelete}
                                            />
                                        )}
                                    </Grid>
                                </Grid>
                            </Grid>
                        </ul>
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

export default connect(mapStateToProps)(withStyles(styles)(EditStreet));