//Component for when the user decides on their method of travel:
//BikeOrWalk will, via props, hold the travel time data that was received first in the Form component via the MapQuest API call.
// It will then display the travel time, userChoice, and Map (line 31 to be specific).

const BikeOrWalk = (props) => {
  return (
    <div className="travel">
      {props.walkTime &&
      props.bikeTime &&
      props.walkTime !== "0" &&
      props.bikeTime !== "0" ? (
        <>
          <h2 className="messageBorder">Would you like to walk or ride a bike?</h2>
          <p>
            <em>
              Disclaimer: We do not recommend wearing headphones while riding
              your bike.
            </em>
          </p>
          <p>
            {" "}
            You are traveling from
            <span>{props.location}</span>
            to
            <span>{props.destination}.</span>
            Below is the estimated walking and bike time to your destination, as
            well as a rough map of your route!
          </p>
          <div className="travelDisplay">
            <ul>
              <li>
                <p>Walking time: {props.walkTime}</p>
                <button
                  type="button"
                  value="walk"
                  onClick={(event) => {
                    props.handleUserChoice(event, event.target.value);
                    props.handleSubmit(event, event.target.value);
                  }}
                >
                  I want to walk
                </button>
                {/* Button just to actually submit the preference to walk and the walk time data back up to Form component.  */}
              </li>
              <li>
                <p>Biking time: {props.bikeTime}</p>
                <button
                  type="button"
                  value="bike"
                  onClick={(event) => {
                    props.handleUserChoice(event, event.target.value);
                    props.handleSubmit(event, event.target.value);
                  }}
                >
                  I want to bike
                </button>
                {/* refer to line 47 and 52 for the process. */}
              </li>
            </ul>

            <div className="mapContainer">
              <img
                src={props.mapRoute}
                alt={`A map of the route from ${props.location} to ${props.destination}`}
                //How to properly use template literals in React:
                //Whenever we want to type JS into React we must use ${} and ` within {}.
              />
            </div>
          </div>
        </>
      ) : null}
      {/* Null is a conditional | If the walktime and biketime is non-existent then we display nothing/null.*/}
    </div>
  );
};

export default BikeOrWalk;
