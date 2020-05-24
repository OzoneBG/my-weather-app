const convertToCelsius = (kelvin) => {
    if (kelvin < (0)) {
        return 0;
    } else {
        return (kelvin - 273.15).toFixed(1);
    }
}

export default convertToCelsius;