import axios from "axios";
import { useState } from "react";
import BikeOrWalk from "./BikeOrWalk.js";
import PodcastInfo from "./PodcastInfo.js";
import TravelFrom from "./TravelForm.js";

const Form = () => {
  const [location, setLocation] = useState("");
  const [destination, setDestination] = useState("");

  const [podcastSearch, setPodcastSearch] = useState("");
  const [podcastList, setPodcastList] = useState([]);

  const [walkTime, setWalkTime] = useState("");
  const [bikeTime, setBikeTime] = useState("");
  const [mapRoute, setMapRoute] = useState("");
  
  const [message, setMessage] = useState("");

  let newLocation;
  const handleLocationChange = (e, location) => {
    newLocation = location.split(",").slice(0, 2).join(",");
    setLocation(newLocation);
  };
  let newDestination;
  const handleDestinationChange = (e, destination) => {
    newDestination = destination.split(",").slice(0, 2).join(",");
    setDestination(newDestination);
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
      })
        .then((resp) => {
          if (resp.data.info.statuscode === 0) {
            setWalkTime(resp.data.route.formattedTime);
          } else {
            setWalkTime("0");
            setMessage("Sorry, no results were found");
          }
        })
        .catch(() => {
          setMessage("Sorry, something went wrong. Try again shortly!");
        });

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
        .then((resp) => {
          if (resp.data.info.statuscode === 0) {
            setBikeTime(resp.data.route.formattedTime);
            setMessage("");
          } else {
            setBikeTime("0");
            setMessage("Sorry, no results were found");
          }
        })
        .catch(() => {
          setMessage("Sorry, something went wrong. Try again shortly!");
        });
    }
    axios({
      url: "https://www.mapquestapi.com/staticmap/v5/map",
      method: "GET",
      dataResponse: "json",
      params: {
        key: "GajCx4GDQ4BbxuYSyMwSYdn9B65f9Vnx",
        start: newLocation,
        end: newDestination,
      },
    }).then((resp) => {
      setMapRoute(resp.request.responseURL);
    });
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
        .catch((error) => {
          setMessage(
            "Sorry, we're having trouble finding any podcasts. Try again shortly!"
          );
        });
    }
  };

  return (
    <>
      <TravelFrom
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
  );
};

export default Form;
