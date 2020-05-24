import React, { Component } from 'react';
import FormInput from '../../components/FormInput/FormInput';
import classes from './SignIn.module.css';
import { Link, Redirect } from 'react-router-dom';
import axios from '../../axios-backend';
import Aux from '../../hoc/Aux';

class SignIn extends Component {
    constructor(props) {
      super(props);
  
      this.state = {
        username: "",
        password: "",
        loggedIn: false,
      };
    }

    componentDidMount() {
        const authed = localStorage.getItem("isLoggedIn")
        this.setState({loggedIn: authed})
    }
  
    handleSubmit = async event => {
      event.preventDefault();
  
      axios.post("/login", this.state)
      .then((res) => {
        if (res.data.authenticated) {
            localStorage.setItem('isLoggedIn', true);
            localStorage.setItem('user', JSON.stringify(res.data.user));
            localStorage.setItem('token', res.data.token);
            this.setState({loggedIn: true});
            this.props.updateLoginStatus(true, res.data.user.username);
        } else {
            alert(res.data.message);
        }
      })
      .catch((err) => {
          console.log(err);
      })
      
    };
  
    handleChange = event => {
      const { value, name } = event.target;
  
      this.setState({ [name]: value });
    };

render() {
    let content = (
        <div className={classes.signin}>
        <h2>I already have an account</h2>
        <span>Sign in with your username and password</span>
        <form onSubmit={this.handleSubmit}>
          <FormInput
            name="username"
            type="text"
            value={this.state.username}
            handleChange={this.handleChange}
            label="Username"
            required
          />
          <FormInput
            name="password"
            type="password"
            value={this.state.password}
            handleChange={this.handleChange}
            label="Password"
            required
          />
          <div className="buttons">
            <button type="submit">SIGN IN</button>
          </div>
        </form>

        <div>
            <h3>Don't have an account?</h3>
            <Link to="/signup">Sign Up</Link>
        </div>
      </div>
    );

    if (this.state.loggedIn) {
        content = <Redirect to="/dashboard" />
    }
    return (
      <Aux>
        {content}
      </Aux>
    );
  }
}

export default SignIn;