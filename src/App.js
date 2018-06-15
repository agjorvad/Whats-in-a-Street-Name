import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

import Header from './components/Header/Header';
import LoginPage from './components/LoginPage/LoginPage';
import RegisterPage from './components/RegisterPage/RegisterPage';
import UserPage from './components/UserPage/UserPage';
import InfoPage from './components/InfoPage/InfoPage';
import MapPage from './components/MapPage/MapPage';
// import Search from './components/Search/Search';
import AddStreet from './components/AddStreet/AddStreet'
// import AutoComplete from './components/AutoComplete/AutoComplete'
import './styles/main.css';
import Demo from './components/Demo/Demo'
import EditStreet from './components/EditStreet/EditStreet'

const App = () => (
  <div>
    <Header title="What's in a (Street) Name?" />
    <Router>
      <Switch>
        <Redirect exact from="/" to="/home" />
        <Route
          path="/home"
          component={LoginPage}
        />
        <Route
          path="/register"
          component={RegisterPage}
        />
        <Route
          path="/user"
          component={UserPage}
        />
        <Route
          path="/info"
          component={InfoPage}
        />
          <Route
          path="/addstreet"
          component={AddStreet}
        />
             <Route
          path="/map"
          component={Demo}
        />
            <Route
          path="/editstreet"
          component={EditStreet}
        />
         {/* {/* {/* <Route
          path="/search"
          component={Search}
        /> */}
    
           {/* <Route
          path="/autocomplete"
          component={AutoComplete} */}
        {/* />  */}
        {/* OTHERWISE (no path!) */}
        <Route render={() => <h1>404</h1>} />

      </Switch>
    </Router>
  </div>
);

export default App;
