import {useState} from "react";



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

const [userChoice, setUserChoice] = useState("");
const onclick = (e) => {
    setUserChoice (e.target.value)
    console.log(e)
}
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
          <p> You are travelling from {props.location} to {props.destination}. Below is the estimated walking and bike time to your destination!
          </p>

          <ul>
            <li>
              <p>Walking time: {props.walkTime}</p>
              <form onSubmit = {(event => {
                props.handleUserChoice (event, userChoice)
              })}>
                <button onClick = {onclick} type="submit" value="walk">I want to walk</button>
              </form>
              
            </li>
            <li>
              <p>Biking time: {props.bikeTime}</p>
              <form onSubmit = {(event => {
                props.handleUserChoice (event, userChoice)
              })}>
                <button onClick = {onclick} type="submit" value="bike">I want to bike</button>
              </form>
            </li>
          </ul>
        </>
      ) : null}
      
    </>
  );
};

export default BikeOrWalk;
