import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

const mapReduxStateToProps = (reduxState) => (
    { reduxState }
);

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
    //     this.setState({
    //       userList: [...this.state.userList, this.state.user],
    //     user: {
    //       name: '',
    //       city: '',
    //       zip: '',
    //     }
    //   });
    //   }

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
        return (
          <div>
            <form onSubmit={this.handleSubmit}>
         <input value={this.state.streetInfo.street_name} onChange={this.handleChangeFor("street_name")} placeholder="Street Name" />
         <input value={this.state.streetInfo.street_history} onChange={this.handleChangeFor("street_history")} placeholder ="Street history" /> 
         {/* handleChangeFor() runs right away on page load.  When it runs, it returns the function within handleChangeFor(), which then waits until its event (onChange, onClick, etc.) to run     */}
         <input value= {this.state.streetInfo.latitude} onChange={this.handleChangeFor("latitude")} type="number" placeholder ="Latitude" />
         <input value= {this.state.streetInfo.longitude} onChange={this.handleChangeFor("longitude")} type="number" placeholder ="Longitude" />
         <input value= {this.state.streetInfo.image_url} onChange={this.handleChangeFor("image_url")} placeholder ="Image_url" />
         <input value= {this.state.streetInfo.link_url} onChange={this.handleChangeFor("link_url")} placeholder ="Link_url" />
         {/* in react, we can't put an object on the DOM, so we need to put this.state.user.*property* instead of this.state.user */}
         <input type="submit" value="Submit Street History" />
         </form>
          </div>
        );
      }
    }

export default connect(mapReduxStateToProps)(AddStreet);
