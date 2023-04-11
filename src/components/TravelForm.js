import React, { useState, useRef, useEffect } from "react";

const TravelFrom = (props) => {
  const travelFromRef = useRef();
  const travelToRef = useRef();
  const inputLocation = useRef();
  const inputDestination = useRef();
  const options = {
    types: ["address"],
    componentRestrictions: { country: "ca" },
  };

  const [location, setLocation] = useState("");
  const [destination, setDestination] = useState("");

  const handleLocationChange = (e) => {
    setLocation(e.target.value);
  };

  const handleDestinationChange = (e) => {
    setDestination(e.target.value);
  };

  useEffect(() => {
    
    const script = document.getElementById('googleScript')

     script.addEventListener("load", () =>{
      travelFromRef.current = new window.google.maps.places.Autocomplete(
        inputLocation.current,
        options
      );
      travelFromRef.current.addListener("place_changed", async function () {
        const place = await travelFromRef.current.getPlace();
        setLocation(place.formatted_address);
        //We are updating the state of the location when the autocomplete suggested state is clicked 
      });
      travelToRef.current = new window.google.maps.places.Autocomplete(
        inputDestination.current,
        options
      );
      travelToRef.current.addListener("place_changed", async function () {
        const placeTo = await travelToRef.current.getPlace();
        setDestination(placeTo.formatted_address);
        //We are updating the state of the destination when the autocomplete suggested state is clicked 
      });
     })
  }, []);

  return (
    <form
      onSubmit={(event) => {
        props.setLocation(event, location);
        props.setDestination(event, destination);
        props.submit(event);
      }}
    >
      <label htmlFor="location">From:</label>
      <input
        ref={inputLocation}
        placeholder="Where are you starting from?"
        id="location"
        type="text"
        value={location}
        onChange={handleLocationChange}
      />

      <label htmlFor="destination">To:</label>
      <input
        ref={inputDestination}
        placeholder="Where are you headed?"
        id="destination"
        type="text"
        value={destination}
        onChange={handleDestinationChange}
      />

      <button type="submit">Submit</button>
    </form>
  );
};

export default TravelFrom;
