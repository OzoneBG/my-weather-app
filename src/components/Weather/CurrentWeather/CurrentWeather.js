import React from "react";
import classes from "./CurrentWeather.module.css";
import convertToCelsius from '../../../utils';

const CurrentWeather = (props) => {
  const generateContent = (weather) => {
    // const d = new Date();
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    var yyyy = today.getFullYear();

    today = mm + "/" + dd + "/" + yyyy;
    return (
      <div>
        <h4>Current Weather in {weather.name}</h4>
        <span className={classes.date}>{today}</span>
        <br />
        <span className={classes.description}>{weather.weather[0].description}</span>
        <br />
        <span className={classes.feels}>Feels like {convertToCelsius(weather.main.feels_like)}</span>
        <table>
            <tbody>
                <tr>
                    <th>Temperature</th>
                    <td>{convertToCelsius(weather.main.temp)} &#8451;</td>
                </tr>
                <tr>
                    <th>Max Temperature</th>
                    <td>{convertToCelsius(weather.main.temp_max)} &#8451;</td>
                </tr>
                <tr>
                    <th>Min Temperature</th>
                    <td>{convertToCelsius(weather.main.temp_min)} &#8451;</td>
                </tr>
                <tr>
                    <th>Pressure</th>
                    <td>{weather.main.pressure} hPa</td>
                </tr>
                <tr>
                    <th>Humidity</th>
                    <td>{weather.main.humidity} %</td>
                </tr>
                <tr>
                    <th>Visibility</th>
                    <td>{weather.visibility}</td>
                </tr>
                
            </tbody>
        </table>
      </div>
    );
  };

  let content = null;
  if (props.currentWeather && props.currentWeather !== "OK") {
    content = generateContent(props.currentWeather);
  }

  return <div className={classes.root}>{content}</div>;
};

export default CurrentWeather;
