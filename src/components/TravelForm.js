import React, { useState } from "react";
import { Loader } from "@googlemaps/js-api-loader";

const TravelFrom = (props) => {
  const [location, setLocation] = useState("");
  const [destination, setDestination] = useState("");

  const handleLocationChange = (e) => {
    setLocation(e.target.value);
  };

  const handleDestinationChange = (e) => {
    setDestination(e.target.value);
  };

  const handleScriptLoad = () => {
    const options = {
      types: ["address"],
    };

    const locationInput = document.getElementById("location");
    const destinationInput = document.getElementById("destination");

    const autocompleteLocation = new window.google.maps.places.Autocomplete(
        locationInput,
      options
    );

    const autocompleteDestination = new window.google.maps.places.Autocomplete(
        destinationInput,
      options
    );

    autocompleteLocation.addListener("place_changed", () => {
      const place = autocompleteLocation.getPlace();
      if (place && place.formatted_address) {
        setLocation(place.formatted_address);
      }
    });

    autocompleteDestination.addListener("place_changed", () => {
      const place = autocompleteDestination.getPlace();
      if (place && place.formatted_address) {
        setDestination(place.formatted_address);
      }
    });
  };

  const loader = new Loader({
    apiKey: "AIzaSyAIMEmrg7lPuZIxL31lBF0kWwwAmw8XsO4",
    version: "weekly",
  });

  loader.load().then(() => {
    handleScriptLoad();
  });

  return (
    <form onSubmit={(event)=>{
        props.setLocation(event, location)
        props.setDestination(event, destination)
        props.submit(event)
    }}>
      <label htmlFor="location">From:</label>
      <input placeholder="Where are you starting from?" id="location" type="text" value={location} onChange={handleLocationChange} />

      <label htmlFor="destination">To:</label>
      <input placeholder="Where are you headed?"id="destination" type="text" value={destination} onChange={handleDestinationChange} />

      <button type="submit">Submit</button>
    </form>
  );
};

export default TravelFrom;