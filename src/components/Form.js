import axios from "axios";
import { useState } from "react";
import BikeOrWalk from "./BikeOrWalk.js";
import PodcastInfo from "./PodcastInfo.js";
import TravelForm from "./TravelForm.js";

// This app will take the user's location and destination input and call the MapQuest and Podcast APIs.
// The MapQuest API, when called will give us the estimated time it takes to get to the user's destination from their location via walking and biking (this will be set via useState).
// The PodcastInfo API will generate a list of Podcasts which will we will use to synchronize with the travel time in order to filter our results.

// Total of 4 components will be used.

//**States */
const Form = () => {
  const [location, setLocation] = useState("");
  const [destination, setDestination] = useState("");
  // These 2 useStates will be used to hold the MapQuest API data.

  const [podcastSearch, setPodcastSearch] = useState("");
  // The podcastSearch useState will be used to listen for the user's input (via keyword search).
  const [podcastList, setPodcastList] = useState([]);
  // The podcastList useState will be used to hold the API data.

  const [walkTime, setWalkTime] = useState("");
  // walkTime useState will hold the estimated travel by walk that we retrieve from the MapQuest API.
  const [bikeTime, setBikeTime] = useState("");
  // bikeTime useState will hold the estimated travel by bike that we retrieve from the MapQuest API.
  const [mapRoute, setMapRoute] = useState("");
  // mapRoute useState will hold the axios call for the visual map display that is seen after entering location and destination.

  const [message, setMessage] = useState("");
  //message useState serves as a loading state (message will be seen for .5 seconds), and error handling -> general multipurpose.
  //It will display a message if there is an error (if we put nothing in the location, destination, or podcast).

  //**For Autocomplete Stretch goal:
  let newLocation;
  const handleLocationChange = (e, location) => {
    newLocation = location.split(",").slice(0, 2).join(",");
    setLocation(newLocation);
  };
  //newLocation is a variable that will hold the remixed location because MapQuest doesn't like country and postal code (which is in the newLocation by default).
  //handleLocationChange is a prop that we are bringing from children -> passing props upwards from children to parent in the case of this app.
  //The newLocation function itself, remixes the original location that we obtained from the Google Autocomplete API.
  //The setLocation is updating the state of the location.

  let newDestination;
  const handleDestinationChange = (e, destination) => {
    newDestination = destination.split(",").slice(0, 2).join(",");
    setDestination(newDestination);
  };
  //newDestination is a variable that will hold the remixed destination because MapQuest doesn't like country and postal code (which is in the newDestination by default).
  //handleDestinationChange is a prop that we are bringing from children -> passing props upwards from children to parent in the case of this app.
  //The newDestination function itself, remixes the original destination that we obtained from the Google Autocomplete API.
  //The setDestination is updating the state of the destination.

  const handlePodcastSearchChange = (e) => {
    setPodcastSearch(e.target.value);
  };
  //PodcastSearch refers to the keyword input for Podcasts that the user will give the form.

  let userChoice;
  const handleUserChoice = (e, target) => {
    e.preventDefault();
    userChoice = target;
  };
  //userChoice refers to whether or not the walk or bike option is selected (user must pick 1 of the 2).

  //**The API call for the MapQuest API:
  //3 API calls are being done | 1. for the walk | 2. for bike | 3. for map display.
  const onSubmitLocation = (e) => {
    e.preventDefault();

    //The MapQuest API Call going from Location to destination.
    if (newLocation.trim() === "" || newDestination.trim() === "") {
      setMessage("Please enter a valid travel search.");
      setPodcastList([]);
      setWalkTime("0");
      setBikeTime("0");
    } else {
      setMessage("Please wait, calculating route...");
      //Error handling for location and destination.
      setPodcastList([]);
      // This empties the podcast list when the user changes routes.

      //*The actual axios API call for walking (via MapQuest):
      axios({
        url: "https://www.mapquestapi.com/directions/v2/route",
        method: "GET",
        dataResponse: "json",
        params: {
          key: "GajCx4GDQ4BbxuYSyMwSYdn9B65f9Vnx",
          from: newLocation,
          to: newDestination,
          routeType: "pedestrian",
        },
      })
        //API call to display the walkTime data.
        .then((resp) => {
          if (resp.data.info.statuscode === 0) {
            //Status code is an actual number therefore we must set the === to a number.
            setWalkTime(resp.data.route.formattedTime);
          } else {
            setWalkTime("0");
            //We had to setWalkTime to a string number instead of just number -> wouldn't work otherwise -> we suspect that its because of the split function that we ran earlier -> maybe one day we'll know exactly why.
            setMessage("Sorry, no route was found.");
          }
        })
        //Error handling for API call.
        .catch((error) => {
          setMessage(
            "Sorry, something went wrong with our mapping. Try again shortly!"
          );
        });

      //*The actual axios API Call for the bicycling (via MapQuest):
      axios({
        url: "https://www.mapquestapi.com/directions/v2/route",
        method: "GET",
        dataResponse: "json",
        params: {
          key: "GajCx4GDQ4BbxuYSyMwSYdn9B65f9Vnx",
          from: newLocation,
          to: newDestination,
          routeType: "bicycle",
        },
      })
        //Refer to the walking API.
        .then((resp) => {
          if (resp.data.info.statuscode === 0) {
            setBikeTime(resp.data.route.formattedTime);
            setMessage("");
          } else {
            setBikeTime("0");
            setMessage("Sorry, no route was found.");
          }
        })
        .catch((error) => {
          setMessage(
            "Sorry, something went wrong with our mapping. Try again shortly!"
          );
        });
      //*The actual axios API call for the map display:
      axios({
        url: "https://www.mapquestapi.com/staticmap/v5/map",
        method: "GET",
        dataResponse: "json",
        params: {
          key: "GajCx4GDQ4BbxuYSyMwSYdn9B65f9Vnx",
          start: newLocation,
          end: newDestination,
        },
      })
        .then((resp) => {
          setMapRoute(resp.request.responseURL);
        })
        .catch(() => {
          setMessage(
            "Sorry, something went wrong with our mapping. Try again shortly!"
          );
        });
    }
  };

  //**Setting new parameters in order to reformat the walkTime that we received from the API call above:
  const [walkHours, walkMinutes, walkSeconds] = walkTime.split(":").map(Number);
  //Estimated walk time data was received in hours, minutes, and seconds and separated by colons.
  //We used split to get rid of the colons.
  const totalWalkMinutes = Math.round(
    walkHours * 60 + walkMinutes + walkSeconds / 60
  );
  ///Math round was used to remove the decimals.
  //The math was done in order to get everything converted to minutes.

  //Setting new parameters in order to reformat the bikeTime that we received from the API call above.
  const [bikeHours, bikeMinutes, bikeSeconds] = bikeTime.split(":").map(Number);
  const totalBikeMinutes = Math.round(
    bikeHours * 60 + bikeMinutes + bikeSeconds / 60
  );
  //For bike, refer to walk above (lines 156 to 163).

  //**Podcast Search for after walk or time has been selected:
  const onSubmitPodSearch = (e) => {
    e.preventDefault();

    let minLength;
    let maxLength;
    if (userChoice === "walk") {
      minLength = totalWalkMinutes - 10;
      maxLength = totalWalkMinutes + 10;
    } else if (userChoice === "bike") {
      minLength = totalBikeMinutes - 10;
      maxLength = totalBikeMinutes + 10;
    } else {
      minLength = 0;
      maxLength = 6000;
    }
    setPodcastList([]);

    //conditional statement to have podcasts be + or - 10 minutes of the travel time.
    if (podcastSearch.trim() === "") {
      setMessage("Please enter a valid podcast search");

      //*The actual API call to the Podcast:
      //Axios was not used for this, instead we installed a module from the website.
    } else if (maxLength <= 6000) {
      setMessage("Please wait, podcasts are loading");
      const { Client } = require("podcast-api");
      const client = Client({ apiKey: "84ea935001f44836a966c059250896de" });
      client
        .search({
          q: podcastSearch,
          sort_by_date: 0,
          offset: 0,
          len_min: minLength,
          len_max: maxLength,
          type: "podcast",
          only_in: "title,description",
          language: "English",
          page_size: 6,
        })
        .then((response) => {
          setMessage("");
          if (response.data.results.length === 0) {
            setMessage(
              "Sorry, we couldn't find any podcasts like that, try a different search!"
            );

            //Refer to lines 156 to 163.
            //General error handling:
          } else {
            //If no errors, we have the API display the filtered list -> Update the state of the podcast list with the API.
            setPodcastList(
              response.data.results.map((list) => {
                setMessage(
                  "Here are some podcasts you can listen to on your trip!"
                );
                return list;
              })
            );
          }
        })
        //General error handling | user or API messes up | Catch is for when we don't have feedback from API:
        .catch((error) => {
          setMessage(
            "Sorry, we're having trouble finding any podcasts. Try again shortly!"
          );
        });
    }
    else {
      setMessage("Sorry, we couldn't find any podcasts that match the length of your trip, try a different search!");
    }
  };

  //**The structure:
  //Props are being passed.
  //Passing data through forms, etc.
  return (
    <>
      <TravelForm
        submit={onSubmitLocation}
        setLocation={handleLocationChange}
        setDestination={handleDestinationChange}
      />

      <form
        action="submit"
        onSubmit={onSubmitPodSearch}
        className="podcastForm"
      >
        <label htmlFor="podSearch">
          What kind of podcast do you want to listen to?
        </label>
        <input
          onChange={handlePodcastSearchChange}
          value={podcastSearch}
          type="text"
          id="podSearch"
          placeholder="What podcast do you want to listen to?"
        />
        <button type="submit">Submit</button>
      </form>

      <BikeOrWalk
        walkTime={walkTime}
        bikeTime={bikeTime}
        location={location}
        destination={destination}
        handleUserChoice={handleUserChoice}
        handleSubmit={onSubmitPodSearch}
        mapRoute={mapRoute}
      />
      <PodcastInfo
        podcast={podcastList}
        message={message}
        bikeTime={bikeTime}
        walkTime={walkTime}
      />
    </>
  );
};

export default Form;
