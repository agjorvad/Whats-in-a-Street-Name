import React, { Component } from 'react';
import { connect } from 'react-redux';
import { USER_ACTIONS } from '../../redux/actions/userActions';
import { triggerLogout } from '../../redux/actions/loginActions';
import Button from '@material-ui/core/Button';
import { Link, browserHistory, withRouter } from 'react-router-dom';

const mapStateToProps = state => ({
    user: state.user,
});

class LogoutButton extends Component {
    componentDidMount() {
        this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
    }

    logout = () => {
        this.props.dispatch(triggerLogout());
    }

    render() {

        return (
            <div>
                <Button color="inherit" onClick={this.logout}>Logout</Button>
            </div>
        );
    }
}

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(LogoutButton);