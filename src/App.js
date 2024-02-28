import { useState, useEffect } from "react";
import "./App.css";
import {weatherAPIUrl} from './util';
import {ForecastTimeBlock} from './Components/ForecastTimeBlock';

function App() {
    const [userLatitude, setUserLatitude] = useState("Unknown")
    const [userLongitude, setUserLongitude] = useState("Unknown")
    const [forecast, setForecast] = useState({});

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

    // Function to display errors
    const showError = (err) => console.warn(`ERROR ${err.code}: ${err.message}`)


  useEffect(setupLocation, []);

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
        setForecast(forecastData);
    };

    fetchLocationWeather();
  }, [userLatitude, userLongitude])







  return (
    <div className="App">
      <div>
        <h3>Your location is:</h3>
        <p>Latitude: {userLatitude}</p>
        <p>Longitude: {userLongitude}</p>
      </div>
      <div>
        <h4>Local forecast:</h4>
              </div>
    </div>
  );
}

export default App;
