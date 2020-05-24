import React, { Component } from 'react';
import classes from './Dashboard.module.css';
import axios from '../../axios-backend.js';
import CurrentWeather from '../../components/Weather/CurrentWeather/CurrentWeather';
import DailyForecast from '../../components/Weather/DailyWeather/DailyWeather';

class Dashboard extends Component {
    state = {
        city: "Sofia",
        currentWeather: null,
        dailyWeather: null,
    }

    componentDidMount() {
        this.loadWeather(this.state.city);
    }

    loadWeather = (city) => {
        this.loadCurrentWeather(city);
        this.loadDailyWeather(city);
    }

    loadCurrentWeather = (city) => {
        axios.get(`/get-current-weather?city=${city}`)
        .then((res) => {
            this.setState({currentWeather: res.data, city});
        })
        .catch((err) => {
            alert(err);
            this.setState({currentWeather: null, city: "Sofia"});
        })
    }

    loadDailyWeather = (city) => {
        axios.get(`/get-hourly-forecast?city=${city}`)
        .then((res) => {
            this.setState({dailyWeather: res.data, city});
        })
        .catch((err) => {
            alert(err);
            this.setState({currentWeather: null, city: "Sofia"});
        })
    }
    
    handleCityChange = (e) => {
        const { value, name } = e.target;
        this.setState({ [name]: value });
    }

    render() {
        return (
            <div className={classes.root}>
                <h2>Dashboard</h2>
                <div className={classes.search}>
                    <p>Current city: {this.state.city}</p>
                    <input className={classes.city} name="city" type="text" onChange={this.handleCityChange}></input>
                    <button onClick={() => this.loadWeather(this.state.city)}>Search</button>
                </div>
                <div className={classes.currentWeather}>
                    <CurrentWeather currentWeather={this.state.currentWeather} />
                </div>
                <br />
                <DailyForecast dailyWeather={this.state.dailyWeather} />
            </div>
        );
    }
}

export default Dashboard;