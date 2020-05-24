import React from 'react';
import classes from './LandingPage.module.css';
import { Link }  from 'react-router-dom';
import Aux from '../../hoc/Aux';

const LandingPage = (props) => {
    let additionalInfo = (
        <Aux>
        <p>You can sign in <Link className={classes.link} to="/signin">here</Link>.</p>
        <p>Or if you don't have an account you can create one <Link className={classes.link} to="/signup">here</Link>.</p>
        </Aux>
    )

    if (props.isLoggedIn) {
        additionalInfo = null;
    }

    return (
        <div className={classes.landingpage}>
            <h2>Welcome to My Weather App</h2>
            <p>You can login with your account to view the weather in your city.</p>
            <em>Admins can delete unwanted users</em>
            {additionalInfo}
        </div>
    );
};

export default LandingPage;
