const BikeOrWalk = (props) => {
  // Discuss with client:
  // We're not sure what the travel time will be until we suggest biking or walking.
  // Are we prioritizing travel length or podcast length?
  // We suggest instead displaying both walking time and biking time
  // Then user can choose walking or biking, and then have a podcast recommended to them based on travel time

  // Conditional that factors in the trip distance
  // If over a certain distance, suggest bike
  // Render message that recommends not using headphone while biking
  // Otherwise, suggest walk

  return (
    <>
      {props.walkTime && props.bikeTime ? (
        <>
          <h2>Would you like to walk or ride a bike?</h2>
          <p>
            <em>
              Disclaimer: We do not recommend wearing headphones while riding
              your bike.
            </em>
          </p>
          <ul>
            <li>
              <p>Walking time: {props.walkTime}</p>
              <button>I want to walk</button>
            </li>
            <li>
              <p>Biking time: {props.bikeTime}</p>
              <button>I want to bike</button>
            </li>
          </ul>
        </>
      ) : null}
    </>
  );
};

export default BikeOrWalk;
