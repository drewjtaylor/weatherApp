import "./ForecastTimeBlock.css";

const ForecastTimeBlock = ({ forecastDetails }) => {
    if (forecastDetails === undefined) {
        return <p>Failed to retrieve forecast details.</p>
    }
  
    console.log(forecastDetails);
  const {
    detailedForecast,
    icon,
    isDayTime,
    name,
    probabilityOfPrecipitation,
    relativeHumidity,
    shortForecast,
    temperature,
    temperatureTrend,
    temperatureUnit,
    windDirection,
    windSpeed
  } 
  = forecastDetails


  
  return (
    <div className="forecastTimeBlock p-3">
      <h5>{forecastDetails.name}</h5>
      <p>{shortForecast}</p>

      <p>Temperature: {temperature}°{temperatureUnit} and {temperatureTrend}</p>
      <img src={icon} alt={`The sky, ${shortForecast}`} />
    </div>
  );
};

export default ForecastTimeBlock;
