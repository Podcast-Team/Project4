// Import useState hook
import axios from "axios";
import { useState, useEffect } from "react";
import BikeOrWalk from "./BikeOrWalk.js";
import PodcastInfo from "./PodcastInfo.js";

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

  // Onchange listener for starting location
  // Onchange listener for destination
  // Onchange listener for podcast serach

  // Function that handles when location form is submitted
  // Location axios call that triggers when map form is submitted

  // Function that handles when podcast form is submitted
  // Podcast axios call that triggers when podcast form is submitted
  const handleLocationChange = (e) => {
    setLocation(e.target.value);
  };

  const handleDestinationChange = (e) => {
    setDestination(e.target.value);
  };

  const handlePodcastSearchChange = (e) => {
    setPodcastSearch(e.target.value);
  };

  const onSubmitLocation = (e) => {
    e.preventDefault();
    axios({
      url: "https://www.mapquestapi.com/directions/v2/route",
      method: "GET",
      dataResponse: "json",
      params: {
        key: "GajCx4GDQ4BbxuYSyMwSYdn9B65f9Vnx",
        from: location,
        to: destination,
        routeType: "pedestrian",
      },
    }).then((resp) => {
      setWalkTime(resp.data.route.formattedTime);
    });

    axios({
      url: "https://www.mapquestapi.com/directions/v2/route",
      method: "GET",
      dataResponse: "json",
      params: {
        key: "GajCx4GDQ4BbxuYSyMwSYdn9B65f9Vnx",
        from: location,
        to: destination,
        routeType: "bicycle",
      },
    }).then((resp) => {
      setBikeTime(resp.data.route.formattedTime);
    });
  };

  const onSubmitPodSearch = (e) => {
    e.preventDefault();
    if (podcastSearch.trim() === "") {
      setMessage("Please enter a valid search");
    } else {
      setMessage("Please wait, results are loading");
      const { Client } = require("podcast-api");
      const client = Client({ apiKey: "84ea935001f44836a966c059250896de" });
      client
        .search({
          q: podcastSearch,
          sort_by_date: 0,
          offset: 0,
          len_min: 10,
          type: "podcast",
          only_in: "title,description",
          language: "English",
          page_size: 5,
        })
        .then((response) => {
          setPodcastList(
            response.data.results.map((list) => {
              if (list){
                setMessage("");
                console.log(list);
                return list;
              }
              else {
                setMessage("Sorry, we couldn't find a podcast like that.")
              }
            })
          );
        })
        .catch((error) => {
          setMessage("Sorry, the call didnt work");
        });
    }
  };

  return (
    <>
      <form action="submit" onSubmit={onSubmitLocation}>
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
      </form>

      <form action="submit" onSubmit={onSubmitPodSearch}>
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

      <BikeOrWalk walkTime={walkTime} bikeTime={bikeTime} />
      <PodcastInfo podcast={podcastList} message={message} />
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