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
        <p>Placeholder text because I hate React for giving me errors.</p>
    )
}

export default BikeOrWalk;