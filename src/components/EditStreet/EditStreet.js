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
            streetList: [],
            spacing: '16',
        }
    }

    componentDidMount() {
        this.props.dispatch({type: USER_ACTIONS.FETCH_USER});
        this.getAllStreets();
      };
    
      componentDidUpdate() {
        if (!this.props.user.isLoading && this.props.user.userName === null) {
          this.props.history.push('login');
        }
      };
// Get request
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
// Delete request
    deleteStreet = (entryToDelete) => {
        console.log(entryToDelete)
        axios({
            method: 'DELETE',
            url: `/api/street/${entryToDelete}`,

        })
            .then((response) => {
                console.log('success', response);
                this.getAllStreets();
            })
            .catch((error) => {
                console.log('There was a problem', error);
            })
    }

    // editStreet = street => {
    //     console.log
    //     axios.put(`/api/street`, street)
    //       .then(response => {
    //         console.log(response);
    //         this.getAllStreets();
    //         this.handleEditToggle();
    //       }).catch(error => {
    //         console.log(error);
    //       })
    //   }

    //   handleChangeEdit = propertyName => event => {
    //     this.setState({
    //       newStreetInfo: {
    //         ...this.state.newStreetInfo,
    //         propertyName: event.target.value,
    //       }
    //     });
    //     console.log(event.target.value);
    //   }

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
                    onClick: () => alert('Delete cancelled')
                }
            ]
        })
    };

    // updateStreetInfo = street => {
    //     console.log('updatedStreet:', street);
    //     axios.put('/api/street', street)
    //     .then((response) => {
    //         console.log('put request success!', response);
    //         this.getAllStreets();
    //     })
    //     // .catch((error) => {
    //     //     console.log('error on put hiit article:', error);
    //     //     swal({
    //     //         title: 'You can only edit articles you added!',
    //     //         icon: 'warning',
    //     //     });
    //     // })    
    // }

    // render() {
    //     return (
    //         <div className="Admin">
    //             <Table>
    //                 <TableHead>
    //                     <TableRow>
    //                         <TableCell>Street Name</TableCell>
    //                         <TableCell>Street History</TableCell>
    //                         <TableCell>Latitude</TableCell>
    //                         <TableCell>Longitude</TableCell>
    //                         <TableCell>Link Url</TableCell>
    //                         <TableCell>Delete</TableCell>
    //                     </TableRow>
    //                 </TableHead>
    //                 <TableBody>
    //                     {this.state.streetList.map(item =>
    //                         <StreetItem key={item.id}
    //                             item={item}
    //                             delete={this.confirmDelete}
    //                          />
    //                     )}
    //                 </TableBody>
    //             </Table>
    //         </div>
    //     );
    // }
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
                                        {this.state.streetList.map(item =>
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