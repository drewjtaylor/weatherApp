import "./ForecastTimeBlock.css";


const ForecastTimeBlock = ({forecastDetails}) => {
    console.log(forecastDetails)
  return (
    <div className='forecastTimeBlock'>
        <h4>{forecastDetails.name}</h4>


    </div>
  )
}

export default ForecastTimeBlock