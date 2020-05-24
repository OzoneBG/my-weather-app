import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import isAuthenticated, { isAdmin }  from '../../service/UserService';

const PrivateAdminRoute = ({component: Component, ...rest }) => {
    const isLoggedIn = isAuthenticated();
    const isValidAdmin = isAdmin()
    return (
        <Route {...rest} render={(props) => (
            (isLoggedIn&&isValidAdmin)
            ? <Component {...props} />
            : <Redirect to="/" />
        )} />
    );
}

export default PrivateAdminRoute;