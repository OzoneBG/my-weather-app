import React, { Component } from 'react';
import classes from './NavBar.module.css';
import { Link } from 'react-router-dom';
import Aux from '../../hoc/Aux';
import { logout } from '../../service/UserService';

const AuthenticatedMenu = (props) => {
    return (
        <Aux>
        <Link to="/">Home</Link>
        <Link to="/dashboard">Dashboard</Link>
        <span>Welcome, {props.username}</span>
        <Link to="/admin">Manage Users</Link>
        <Link to="#" onClick={props.handleSignout}>Sign Out</Link>
        </Aux>
    );
}

const UnauthenticatedMenu = () => {
    return (
        <Aux>
            <Link to="/">Home</Link>
            <Link to="/signin">Sign In</Link>
            <Link to="/signup">Sign Up</Link>
        </Aux>
    );
}

class NavBar extends Component {

    logoutHandler = () => {
        logout();
        this.props.updateLoginStatus(false, '');
    }

    render() {
        let links = <UnauthenticatedMenu />;

        if (this.props.isLoggedIn) {
            links = <AuthenticatedMenu username={this.props.username} handleSignout={this.logoutHandler}/>
        }

        return (
            <header className={classes.Toolbar}>
                <div>My Weather App</div>
                <nav className={classes.navbarroot}>
                    {links}
                </nav>
            </header>
        );
    }
}

export default NavBar;