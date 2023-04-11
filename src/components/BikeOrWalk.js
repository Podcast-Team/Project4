//Component for when the user decides on their method of travel 
//BikeOrWalk will via props, hold the travel time data that was received first in the Form component via the MapQuest API call 
// It will then display the travel time, userChoice, and Map (line 31 to be specific)

const BikeOrWalk = (props) => {


  return (
    <div className="travel">
      {props.walkTime &&
      props.bikeTime &&
      props.walkTime !== "0" &&
      props.bikeTime !== "0" ? (
        <>
          <h2>Would you like to walk or ride a bike?</h2>
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
            Below is the estimated walking and bike time to your destination!
            <div className="mapContainer">
              <img
                src={props.mapRoute}
                alt={`A map of the route from ${props.location} to ${props.destination}`}
                //Whenever we want to type JS into react we must use ${} and ` within {}
                //How to properly use template literals 
              />
            </div>
          </p>

          <ul>
            <li>
              <p>Walking time: {props.walkTime}</p>
              <form
                onSubmit={(event) => {
                  props.handleUserChoice(event, event.target.firstChild.value);
                  props.handleSubmit(event, event.target.firstChild.value);
                }}
                //OnSubmit passes the value back to form -> propping data back up to form 
              >
                <button type="submit" value="walk">
                  I want to walk
                </button>
                {/* Button just to actually submit the preference to Walk and the walk time data back up to Form component  */}
              </form>
              
            </li>
            <li>
              <p>Biking time: {props.bikeTime}</p>
              <form
                onSubmit={(event) => {
                  props.handleUserChoice(event, event.target.firstChild.value);
                  props.handleSubmit(event, event.target.firstChild.value);
                }}
              >
                <button type="submit" value="bike">
                  I want to bike
                </button>
              </form>
              {/* refer to line 47 and 52 for the process */}
            </li>
          </ul>
        </>
      ) : null}
      {/* Null is a conditional | If the walktime and biketime is non-existent then we display nothing/null*/}
    </div>
  );
};

export default BikeOrWalk;
