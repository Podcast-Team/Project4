// Import useState hook
import axios from "axios";
import { useState } from "react";
import BikeOrWalk from "./BikeOrWalk.js";
import PodcastInfo from "./PodcastInfo.js";
import TravelFrom from "./TravelForm.js";

const Form = () => {
  // useEffect(() => {}, []);
  const [location, setLocation] = useState("");
  const [destination, setDestination] = useState("");
  const [podcastSearch, setPodcastSearch] = useState("");
  const [error, setError] = useState(false);
  const [walkTime, setWalkTime] = useState("");
  const [bikeTime, setBikeTime] = useState("");
  const [podcastList, setPodcastList] = useState([]);
  const [message, setMessage] = useState("");
  const [mapRoute, setMapRoute] = useState("");

  // Onchange listener for starting location
  // Onchange listener for destination
  // Onchange listener for podcast search

  // Function that handles when location form is submitted
  // Location axios call that triggers when map form is submitted

  // Function that handles when podcast form is submitted
  // Podcast axios call that triggers when podcast form is submitted
  let newLocation
  const handleLocationChange = (e, location) => {
    newLocation = location.split(",").slice(0,2).join(',');
    console.log(newLocation)
    setLocation(newLocation)
  };
  let newDestination
  const handleDestinationChange = (e, destination) => {
   newDestination = destination.split(",").slice(0,2).join(',');
   console.log(newDestination)
   setDestination(newDestination)
  };

  const handlePodcastSearchChange = (e) => {
    setPodcastSearch(e.target.value);
  };

  let userChoice;
  const handleUserChoice = (e, target) => {
    e.preventDefault();
    userChoice = target;
  };

  const onSubmitLocation = (e) => {
    e.preventDefault();

    if (newLocation.trim() === "" || newDestination.trim() === "") {
      setMessage("Please enter a valid search");
      
    } else {
      setMessage("Please wait, calculating route");
      

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
      }).then((resp) => {
        console.log(resp)
        if (resp.data.info.statuscode === 0) {
          setWalkTime(resp.data.route.formattedTime);
        } else {
          setWalkTime ("0")
          setMessage ("Sorry, no results were found")
        }
      }).catch(() => {
        setMessage("Sorry, something went wrong. Try again shortly!")
      })

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
      }).then((resp) => {
        if (resp.data.info.statuscode === 0) {
          setBikeTime(resp.data.route.formattedTime);
          setMessage("");
        } else {
          setBikeTime ("0")
          setMessage ("Sorry, no results were found")
        }
      }).catch(() => {
        setMessage("Sorry, something went wrong. Try again shortly!")
      })
    }
      axios({
        url: "https://www.mapquestapi.com/staticmap/v5/map",
        method: "GET",
        dataResponse: "json",
        params: {
          key: "GajCx4GDQ4BbxuYSyMwSYdn9B65f9Vnx",
          start: location,
          end: destination,
        },
      }).then((resp)=>{
        setMapRoute(resp.request.responseURL)
        console.log(resp.request.responseURL)
      })
  };
  // const timeWalk = walkTime;
  const [walkHours, walkMinutes, walkSeconds] = walkTime.split(":").map(Number);
  const totalWalkMinutes = Math.round(
    walkHours * 60 + walkMinutes + walkSeconds / 60
  );

  // const timeBike = bikeTime;
  const [bikeHours, bikeMinutes, bikeSeconds] = bikeTime.split(":").map(Number);
  const totalBikeMinutes = Math.round(
    bikeHours * 60 + bikeMinutes + bikeSeconds / 60
  );


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
      maxLength = 1000;
    }
    setPodcastList([]);
    if (podcastSearch.trim() === "") {
      setMessage("Please enter a valid search");
      // setUserChoice("");
    } else {
      setMessage("Please wait, results are loading");
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
              "Sorry, we couldn't find a podcast like that, try a different search!"
            );
          } else {
            console.log(response.data.results);
            setPodcastList(
              response.data.results.map((list) => {
                setMessage("Here are some podcasts you can listen to on your trip!");
                return list;
              })
            );
          }
        })
        .catch((error) => {
          setMessage("Sorry, we're having trouble finding any podcasts. Try again shortly!");
          // setUserChoice("");
        });
    }
  };

  return (
    <>
    <TravelFrom submit={onSubmitLocation} setLocation={handleLocationChange} setDestination={handleDestinationChange}    />
      {/* <form action="submit" onSubmit={onSubmitLocation} className="travelForm" >
        <label htmlFor="location" className="sr-only">
          Where are you starting from?
        </label>
        <input
          onChange={handleLocationChange}
          value={location}
          type="text"
          id="location"
          placeholder="Where are you starting from?"
        />
        <label htmlFor="destination" className="sr-only">
          Where are you headed?
        </label>
        <input
          onChange={handleDestinationChange}
          value={destination}
          type="text"
          id="destination"
          placeholder="Where are you headed?"
        />
        <button type="submit">Submit</button>
      </form> */}

      <form action="submit" onSubmit={onSubmitPodSearch} className="podcastForm">
        <label htmlFor="podSearch" className="sr-only">
          What podcast do you want to listen to?
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
        userChoice={userChoice}
      />
    </>

    // Podcast form
    // Text input with label that allows user to search for a podcast
    // Submit button

    // PodcastInfo component

    // MapDisplay component
    // BikeOrWalk component
  );
};

export default Form;
