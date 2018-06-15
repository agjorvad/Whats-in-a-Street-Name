import React, { Component } from 'react';
import axios from 'axios';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import StreetItem from '../StreetItem/StreetItem';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

class EditStreet extends Component {
    constructor(props) {
        super(props);
        this.state = {
            streetList: [],
        }
    }
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
// Get feedback runs on page load
    componentDidMount = () => {
        this.getAllStreets();
    }

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

    render() {
        return (
            <div className="Admin">
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Street Name</TableCell>
                            <TableCell>Street History</TableCell>
                            <TableCell>Latitude</TableCell>
                            <TableCell>Longitude</TableCell>
                            <TableCell>Link Url</TableCell>
                            <TableCell>Delete</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.state.streetList.map(item =>
                            <StreetItem key={item.id}
                                item={item}
                                delete={this.confirmDelete} />
                        )}
                    </TableBody>
                </Table>
            </div>
        );
    }
}

export default EditStreet;