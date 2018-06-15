import React, { Component } from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import Delete from '@material-ui/icons/Delete';
class StreetItem extends Component {

    render() {
        return (
            < TableRow>
                <TableCell>
                    {this.props.item.street_name}
                </TableCell>
                <TableCell>
                    {this.props.item.street_history}
                </TableCell>
                <TableCell>
                    {this.props.item.latitude}
                </TableCell>
                <TableCell>
                    {this.props.item.longitude}
                </TableCell>
                <TableCell>
                    {this.props.item.link_url}
                </TableCell>
                <TableCell>
                    <Button onClick={() => { this.props.delete(this.props.item.id) }} variant="raised" color="secondary">
                        Delete
<Delete />
                    </Button>
                </TableCell>
            </TableRow>
        )
    }
}

export default StreetItem;