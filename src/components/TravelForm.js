import React, { useState, useRef, useEffect } from "react";

const TravelFrom = (props) => {
  const travelFromRef = useRef();
  const travelToRef = useRef();
  const inputLocation = useRef();
  const inputDestination = useRef();
  const options = {
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
    travelFromRef.current = new window.google.maps.places.Autocomplete(
      inputLocation.current,
      options
    );
    travelFromRef.current.addListener("place_changed", async function () {
      const place = await travelFromRef.current.getPlace();
      setLocation(place.formatted_address);
    });
    travelToRef.current = new window.google.maps.places.Autocomplete(
      inputDestination.current,
      options
    );
    travelToRef.current.addListener("place_changed", async function () {
      const placeTo = await travelToRef.current.getPlace();
      setDestination(placeTo.formatted_address);
    });
  }, []);

  return (
    <form
      className="travelForm"
      onSubmit={(event) => {
        props.setLocation(event, location);
        props.setDestination(event, destination);
        props.submit(event);
      }}
    >
      <div className="location">
        <label htmlFor="location">From:</label>
        <input
          ref={inputLocation}
          placeholder="Where are you starting from?"
          id="location"
          type="text"
          value={location}
          onChange={handleLocationChange}
        />
      </div>
      <div className="destination">
        <label htmlFor="destination">To:</label>
        <input
          ref={inputDestination}
          placeholder="Where are you headed?"
          id="destination"
          type="text"
          value={destination}
          onChange={handleDestinationChange}
        />
      </div>

      <button type="submit">Submit</button>
    </form>
  );
};

export default TravelFrom;
