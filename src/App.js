import { useState, useEffect } from "react";
import "./App.css";

function App() {
    const [userLatitude, setUserLatitude] = useState(null)
    const [userLongitude, setUserLongitude] = useState(null)

  // Check permission from the browser for geolocation
  const checkLocationPermission = () => {
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
        console.log(coordinates);
    console.log("Your current position is:");
    console.log(`Latitude : ${coordinates.latitude}`);
    console.log(`Longitude: ${coordinates.longitude}`);
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



  useEffect(checkLocationPermission, []);

  return (
    <div className="App">
      <header className="App-header"></header>
      <div>
        <h3>Your location is:</h3>
        <p>Latitude: {userLatitude}</p>
        <p>Longitude: {userLongitude}</p>
      </div>
    </div>
  );
}

export default App;
