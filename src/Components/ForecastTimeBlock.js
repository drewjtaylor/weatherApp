import "./ForecastTimeBlock.css";

const ForecastTimeBlock = ({ forecastDetails }) => {
    if (forecastDetails === undefined) {
        return <p>Failed to retrieve forecast details.</p>
    }
  
    console.log(forecastDetails);
    const {
        detailedForecast,
        icon,
        // isDayTime,
        // name,
        // probabilityOfPrecipitation,
        // relativeHumidity,
        shortForecast,
        temperature,
        // temperatureTrend,
        temperatureUnit,
        // windDirection,
        // windSpeed
    } = forecastDetails


  
  return (
    <div className="forecastTimeBlock p-3 text-center">
      <h3>{forecastDetails.name}</h3>
      <h4>{shortForecast}</h4>

      <p>Temperature: {temperature}°{temperatureUnit}</p>
      <img src={icon} alt={`The sky, ${shortForecast}`} />
      <p>{detailedForecast}</p>
    </div>
  );
};

export default ForecastTimeBlock;
