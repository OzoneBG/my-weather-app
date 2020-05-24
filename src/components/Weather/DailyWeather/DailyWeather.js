import React from "react";
import classes from "./DailyWeather.module.css";
import SingleWeather from './SingleWeather/SingleWeather';

const DailyWeather = (props) => {

    const generateContent = (weather) => {
        // Collect separate days
        const allObjects = [];
        let temp = [];
        let date = new Date(weather.list[0].dt_txt)
        for(let i = 0; i < weather.list.length; i++) {
            const temp_d = new Date(weather.list[i].dt_txt);
            if (temp_d.getDay() === date.getDay()) {
                temp.push(weather.list[i]);
            } else {
                allObjects.push(temp);
                date = temp_d;
                temp = [];

                temp.push(weather.list[i]);
            }
        }

        return allObjects.map((obj, idx) => {
            return <SingleWeather key={idx} weather={obj} />
        })
    }

    let content = null;

    if (props.dailyWeather && props.dailyWeather !== "OK") {
        content = generateContent(props.dailyWeather);
    }

    return (
        <div className={classes.root}>
            <h2>Hourly Forecast</h2>
            <div className={classes.container}>
                {content}
            </div>
        </div>
    )
}

export default DailyWeather;