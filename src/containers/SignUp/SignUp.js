import React, { Component } from 'react';

import FormInput from '../../components/FormInput/FormInput';
import classes from './SignUp.module.css';
import { Link, Redirect } from 'react-router-dom';
import Aux from '../../hoc/Aux';
import axios from '../../axios-backend';

class SignUp extends Component {
    constructor(){
        super();

        this.state = {
            displayName: '',
            password: '',
            confirmPassword: '',
            isLoggedIn: false,
            userCreated: false,
        }
    }

    componentDidMount() {
        const isLoggedIn = localStorage.getItem('isLoggedIn')
        this.setState({isLoggedIn});
    }

    handleSubmit = async event => {
        event.preventDefault();
        
        const { displayName, password, confirmPassword } = this.state;

        if (password !== confirmPassword) {
            alert("passwords do not match");
            return;
        }

        const data = {
            username: displayName,
            password: password,
        }

        axios.post("/create-user", data)
        .then((res) => {
            if (res.data.message === "OK") {
                this.setState({userCreated: true})
            } else {
                alert(res.data.message);
            }
        })
        .catch((err) => {
            console.log(err);
        })
    };

    handleChange = event => {
        const { name, value } = event.target;

        this.setState({[name]: value});
    };

    render() {
        const { displayName, password, confirmPassword } = this.state;
        let content =  (
            <div className={classes.signup}>
                <h2 className='title'>I do not have an account</h2>
                <span>Sign up with your email and password</span>
                <form className='sign-up-form' onSubmit={this.handleSubmit}>
                    <FormInput
                        type='text'
                        name='displayName'
                        value={displayName}
                        onChange={this.handleChange}
                        label='Display Name'
                        required
                    >
                    </FormInput>
                    <FormInput
                        type='password'
                        name='password'
                        value={password}
                        onChange={this.handleChange}
                        label='Password'
                        required
                    >
                    </FormInput>
                    <FormInput
                        type='password'
                        name='confirmPassword'
                        value={confirmPassword}
                        onChange={this.handleChange}
                        label='Confirm Password'
                        required
                    >
                    </FormInput>
                    <button type='submit'>SIGN UP</button>
                </form>
                <div>
                    <h3>Already have an account?</h3>
                    <Link to="/signin">Sign In</Link>
                </div>
            </div>
        )

        if(this.state.isLoggedIn) {
            content = <Redirect to="/dashboard" />
        }

        if(this.state.userCreated) {
            content = <Redirect to="/signin" />
        }

        return (
            <Aux>
                {content}
            </Aux>
        )
    }
}

export default SignUp;