import { useState, useEffect } from "react";
import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import {weatherAPIUrl} from './util';
import ForecastTimeBlock from './Components/ForecastTimeBlock';
import {googleMapsEmbedAPI} from './keys'

function App() {
    const [userLatitude, setUserLatitude] = useState("Unknown")
    const [userLongitude, setUserLongitude] = useState("Unknown")
    const [forecast, setForecast] = useState([]);
    const [timeBlockNumber, setTimeBlockNumber] = useState(0);
    const [location, setLocation] = useState({
        city: null,
        state: null,
        zip: null
    })

    // Check permission and get location from the browser
    const setupLocation = () => {
        const options = {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
        }

        // Given a <position>, get location and update state
        const getLocation = (position) => {
            const coordinates = position.coords;
            setUserLatitude(coordinates.latitude);
            setUserLongitude(coordinates.longitude);
        }

        // Check for permission, and retrieve 
        if (navigator.geolocation) {
            navigator.permissions.query({ name: "geolocation" })
            .then((result) => {
                switch (result.state) {
                case ("granted"):
                    console.log("Permission granted");
                    navigator.geolocation.getCurrentPosition(getLocation, showError, options);
                    break;
                case ("prompt"):
                    console.log("Needto get permission");
                    navigator.geolocation.getCurrentPosition(getLocation, showError, options);
                    break;
                case "denied":
                    console.log(
                    "Permission was denied. You need to manually give permission to this app in your browser."
                    );
                    break;
                default:
                    console.log(
                    "You've reached the default message after checking geolocation permission"
                    );
                }
            });
        } else {
            console.log("Geolocation is not supported by this browser.");
        }
    };

    const lookupZip = () => {
        // Do not try to do an api call before getting lat/long 
        if (userLatitude === "Unknown" || userLongitude === "Unknown") {
            return
        }
        
        const getGoogleGeoData = async () => {
            const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${userLatitude},${userLongitude}&key=${googleMapsEmbedAPI}`)
            if (!response.ok) {
                return Promise.reject('Error retrieving google data from lat/long. Status: ' + response.status)
            };

            const googleGeoData = await response.json();
            const locationData = googleGeoData.results[4].address_components;

            setLocation({
                city: locationData[1].long_name,
                state: locationData[3].short_name,
                zip: locationData[0].short_name
            })
        }
        getGoogleGeoData();
        }
        

    // Function to display errors
    const showError = (err) => console.warn(`ERROR ${err.code}: ${err.message}`)

  // Retrieve location information from browser
  useEffect(setupLocation, []);

  // Use Google API to look up location information from latitude and longitude
  useEffect(lookupZip, [userLatitude, userLongitude]);

  // Fetch weather based on local long/lat
  useEffect(() => {
    const fetchLocationWeather = async () => {
        // Do not try to do an api call before getting lat/long 
        if (userLatitude === "Unknown" || userLongitude === "Unknown") {
            return
        }

        // The first call to the weather API retrieves specific forecast links depending on lat long
        // The returned links are what actually get weather information.
        const response = await fetch(`${weatherAPIUrl}/points/${userLatitude},${userLongitude}`);
        if (!response.ok) {
            return Promise.reject('Unable to fetch data. Status: ' + response.status)
        };
        const weatherLinks = await response.json();

        // Retrieve the forecast link specifically
        const forecastAPILink = weatherLinks.properties.forecast

        // If there is an error with the new link, reject out of this function
        const forecastResponse = await fetch(forecastAPILink);
        if (!forecastResponse.ok) {
            return Promise.reject('Unable to fetch data. Status: ' + forecastResponse.status)
        };

        // Set the app's state for "forecastData" based on the response to the actual forecast link.
        const forecastData = await forecastResponse.json();
        setForecast(forecastData.properties.periods)
    };

    fetchLocationWeather();
  }, [userLatitude, userLongitude])
  

  return (
    <div className="App text-center">
        <div className="container">
            <div className="row">
                <div className="col">
                    <h3>Your location is: {location.city}, {location.state} {location.zip}</h3>
                    <p></p>
                </div>
            </div>

            <div className="row">
                <div className="col">
                    <h4>Local forecast:</h4>
                </div>
            </div>

            <div className="row">
                {/* Previous arrow button  */}
                <div className="col-2">
                    {timeBlockNumber===0 ? null : <button onClick={() => setTimeBlockNumber(timeBlockNumber-1)}>Back</button>}
                </div>

                {/* Currently selected time box */}
                <div className="col-8">
                    <ForecastTimeBlock forecastDetails={forecast[timeBlockNumber]}/>
                </div>

                {/* Next arrow button spot */}
                <div className="col-2">
                    {timeBlockNumber>12 ? null : <button onClick={() => setTimeBlockNumber(timeBlockNumber+1)}>Next</button>}
                    
                </div>
            </div>


        <div> 

        </div>
        </div>
    </div>
  );
}

export default App;
