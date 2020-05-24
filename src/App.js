import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import PrivateAdminRoute from './components/PrivateAdminRoute/PrivateAdminRoute';
import SignIn from './containers/SignIn/SignIn';
import SignUp from './containers/SignUp/SignUp';
import NavBar from './components/NavBar/NavBar';
import LandingPage from './containers/LandingPage/LandingPage';
import Admin from './containers/Admin/Admin';
import Dashboard from './containers/Dashboard/Dashboard';

class App extends Component {
  state = {
    loggedIn: false,
    username: '',
  }

  componentDidMount() {
    const loggedIn = localStorage.getItem('isLoggedIn');

    if(loggedIn) {
      const username = JSON.parse(localStorage.getItem("user")).username;
      this.setState({loggedIn, username})
    }
    
  }

  updateLoginStatus = (newStatus, username) => {
    this.setState({loggedIn: newStatus, username});
  }

  render() {
    return (
    <Router>
      <NavBar username={this.state.username} isLoggedIn={this.state.loggedIn} updateLoginStatus={this.updateLoginStatus}/>
      <Switch>
        <Route exact path="/">
          <LandingPage isLoggedIn={this.state.loggedIn} />
        </Route>
        <Route path="/signin">
          <SignIn updateLoginStatus={this.updateLoginStatus} />
        </Route>
        <Route path="/signup">
          <SignUp />
        </Route>
        <PrivateRoute exact path="/dashboard" component={Dashboard} />
        <PrivateAdminRoute exact path="/admin" component={Admin} />
      </Switch>
    </Router>
  );
    }
}

export default App;
