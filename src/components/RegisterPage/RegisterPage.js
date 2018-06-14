import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Header from '../Header/Header';

class RegisterPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      message: '',
    };
  }

  registerUser = (event) => {
    event.preventDefault();

    if (this.state.username === '' || this.state.password === '') {
      this.setState({
        message: 'Choose a username and password!',
      });
    } else {
      const body = {
        username: this.state.username,
        password: this.state.password,
      };

      // making the request to the server to post the new user's registration
      axios.post('/api/user/register/', body)
        .then((response) => {
          if (response.status === 201) {
            this.props.history.push('/home');
          } else {
            this.setState({
              message: 'Oops! That didn\'t work. The username might already be taken. Try again!',
            });
          }
        })
        .catch(() => {
          this.setState({
            message: 'Oops! Something went wrong! Is the server running?',
          });
        });
    }
  } // end registerUser

  handleInputChangeFor = propertyName => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  }

  renderAlert() {
    if (this.state.message !== '') {
      return (
        <h2
          className="alert"
          role="alert"
        >
          {this.state.message}
        </h2>
      );
    }
    return (<span />);
  }

  render() {
    return (
      <div>
        {this.renderAlert()}
        <form onSubmit={this.registerUser} className="form1">
          <h1>Where the Streets Do Have Names</h1>
          <div>
            <FormControl>
            <InputLabel htmlFor="username">
              Username:</InputLabel>
              <Input
                type="text"
                name="username"
                value={this.state.username}
                onChange={this.handleInputChangeFor('username')}
              />
            </FormControl>
          </div>
          <div>
          <FormControl>
            <InputLabel htmlFor="password">
              Password:</InputLabel>
              <Input
                type="password"
                name="password"
                value={this.state.password}
                onChange={this.handleInputChangeFor('password')}
              />
            </FormControl>
          </div>
          <div>
            <p></p>
          <FormControl>
            <Button variant="raised" size="small" color="primary" type="submit" value="Log In">
            Register
            </Button>
            </FormControl>
              <p></p>
            <Link to="/home">Cancel</Link>
          </div>
        </form>
      </div>
    );
  }
}

export default RegisterPage;

