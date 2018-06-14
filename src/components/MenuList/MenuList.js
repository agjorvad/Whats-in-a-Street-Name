import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Manager, Target, Popper } from 'react-popper';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import MenuList from '@material-ui/core/MenuList';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Nav from '../Nav/Nav';

const styles = theme => ({
    root: {
        display: 'flex',
    },
    paper: {
        marginRight: theme.spacing.unit * 2,
        zIndex: 9999,
    },
    popperClose: {
        pointerEvents: 'none',
    },
});

class MenuListComposition extends React.Component {
    state = {
        open: false,
    };

    handleToggle = () => {
        this.setState({ open: !this.state.open });
    };

    handleClose = event => {
        if (this.target1.contains(event.target)) {
            return;
        }

        this.setState({ open: false });
    };

    render() {
        const { classes } = this.props;
        const { open } = this.state;

        return (
            <div className={classes.root}>
                <Manager>
                    <Target>
                        <div
                            ref={node => {
                                this.target1 = node;
                            }}
                        >
                            <IconButton className={classes.menuButton} aria-owns={open ? 'menu-list-grow' : null}
                                aria-haspopup="true" style={{ flex: 1 }}
                                onClick={this.handleToggle} color="inherit" aria-label="Menu">
                                <MenuIcon />

                            </IconButton>
                        </div>
                    </Target>
                    <Popper
                        placement="bottom-start"
                        eventsEnabled={open}
                        className={classNames({ [classes.popperClose]: !open })}
                    >
                        <ClickAwayListener onClickAway={this.handleClose}>
                            <Grow in={open} id="menu-list-grow" style={{ transformOrigin: '0 0 0' }}>
                                <Paper>
                                    <MenuList role="menu">
                                        <Nav />
                                    </MenuList>
                                </Paper>
                            </Grow>
                        </ClickAwayListener>
                    </Popper>
                </Manager>
            </div >
        );
    }
}

MenuListComposition.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MenuListComposition);
