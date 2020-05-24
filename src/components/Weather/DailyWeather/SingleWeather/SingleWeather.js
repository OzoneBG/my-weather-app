import React from "react";
import classes from "./SingleWeather.module.css";
import convertToCelsius from '../../../../utils';

const SingleWeather = (props) => {
    const buildTemperature = (weather) => {
        const values = [];

        for(let i = 0; i < weather.length; i++) {
            const elem = <td key={i}>{convertToCelsius(weather[i].main.temp)}</td>
            values.push(elem);
        }

        return values;
    }

    const buildPressure = (weather) => {
        const values = [];

        for(let i = 0; i < weather.length; i++) {
            const elem = <td key={i}>{weather[i].main.pressure}</td>
            values.push(elem);
        }

        return values;
    }

    const buildHumidity = (weather) => {
        const values = [];

        for(let i = 0; i < weather.length; i++) {
            const elem = <td key={i}>{weather[i].main.humidity}</td>
            values.push(elem);
        }

        return values;
    }

    const generateHours = (weather) => {
        const tempWeather = [...weather];
        const values = [];
        let item = tempWeather.shift();
        const dt = new Date(item.dt_txt);
        const hours = dt.getHours();
        for(let i = 0; i < 8; i++) {
            const currentHour = i * 3;

            if (currentHour >= hours) {
                const elem = <td key={i}>{currentHour}</td>
                values.push(elem);
            }
        }
        return values;
    }

    const dt = new Date(props.weather[0].dt_txt);
    const date = `${dt.getMonth()+1}/${dt.getDate()}`;
    return (
        <div className={classes.root}>
            <table>
                <thead>
                    <tr>
                        <th colSpan="9">{date}</th>
                    </tr>
                    <tr>
                        <th>
                            
                        </th>
                        {generateHours(props.weather)}
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>&#8451;</td>
                        {buildTemperature(props.weather)}
                    </tr>
                    <tr>
                        <td>hPa</td>
                        {buildPressure(props.weather)}
                    </tr>
                    <tr>
                        <td>%</td>
                        {buildHumidity(props.weather)}
                    </tr>
                </tbody>
            </table>
        </div>
    );
}   

export default SingleWeather;