//Component for TravelForm with Autocomplete address 
import React, { useState, useRef, useEffect } from "react";

//This is the form for the Travel address 

const TravelForm = (props) => {
  const travelFromRef = useRef();
  const travelToRef = useRef();
  const inputLocation = useRef();
  const inputDestination = useRef();
  //We had to use useRef hook to listen for change in user input when the user was clicking on the suggested address 
  const options = {
    componentRestrictions: { country: "ca" },
  };
  //Const options has us restricting the search address to Canada -> helps limit results so we don't get overloaded suggestions 

  //useState's are being utilized to keep track of the location and destination states 
  const [location, setLocation] = useState("");
  const [destination, setDestination] = useState("");


  const handleLocationChange = (e) => {
    setLocation(e.target.value);
  };

  const handleDestinationChange = (e) => {
    setDestination(e.target.value);
  };

//This useEffect has us listening for when the user clicks on the suggested autocomplete address 

  useEffect(() => {
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
  }, []);

//The display portion of the autocomplete stretch goal 
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

export default TravelForm;
