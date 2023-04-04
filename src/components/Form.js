// Import useState hook
import axios from "axios";
import { useState, useEffect } from "react";
import BikeOrWalk from "./BikeOrWalk.js";
import PodcastInfo from "./PodcastInfo.js";

const Form = () => {
  // useEffect(() => {}, []);
  const [location, setLocation] = useState("");
  const [destination, setDestination] = useState("");
  const [podcastSearch, setPodcastSearch] = useState('');
  const [error, setError] = useState(false);
  const [walkTime, setWalkTime] = useState ('');
  const [bikeTime, setBikeTime] = useState ('');
  const [podcastList, setPodcastList] = useState ([])

  const [message, setMessage] = useState("")

  // Onchange listener for starting location
  // Onchange listener for destination
  // Onchange listener for podcast serach

  // Function that handles when location form is submitted
  // Location axios call that triggers when map form is submitted

  // Function that handles when podcast form is submitted
  // Podcast axios call that triggers when podcast form is submitted
  const handleLocationChange = (e) => {
    setLocation (e.target.value)
    // console.log (location)
  }

  const handleDestinationChange = (e) => {
    setDestination (e.target.value)
  }

  const handlePodcastSearchChange = (e) => {
    setPodcastSearch (e.target.value)
  }
  
  const onSubmitLocation = (e) => {
    e.preventDefault ()
      axios ({
        url: 'https://www.mapquestapi.com/directions/v2/route',
          method: 'GET',
          dataResponse: 'json',
          params: {
              key: 'GajCx4GDQ4BbxuYSyMwSYdn9B65f9Vnx',
              from: location,
              to: destination,
              routeType: 'pedestrian',
          }
      }).then((resp) => {
        console.log(resp.data);
        setWalkTime (resp.data.route.formattedTime);
        console.log (walkTime);
        
        
      })
        
    
      axios ({
        url: 'https://www.mapquestapi.com/directions/v2/route',
            method: 'GET',
            dataResponse: 'json',
            params: {
                key: 'GajCx4GDQ4BbxuYSyMwSYdn9B65f9Vnx',
                from: location,
                to: destination,
                routeType: 'bicycle',
            }
        }).then((resp) => {
          console.log(resp.data);
          setBikeTime (resp.data.route.formattedTime);
          console.log (bikeTime);
        })

     }
  

  const onSubmitPodSearch = (e) => {
    e.preventDefault ()
    if (podcastSearch.trim() ===""){
      setMessage('Please enter a valid search')
    } else {
      setMessage('Please wait, results are loading')
    const { Client } = require('podcast-api');
    const client = Client({ apiKey: '84ea935001f44836a966c059250896de' });
    client.search({
      q: podcastSearch,
      sort_by_date: 0,
      offset: 0,
      len_min: 10,
      type: 'podcast',
      only_in: 'title,description',
      language: 'English',
      page_size: 5,
    })
    .then((response) => {
      console.log(response.data.results);
      setPodcastList (response.data.results.map((list)=>{
        // console.log (podcastList)
        return list 
      }));
      setMessage('')
      console.log(podcastList)
    })
    .catch((error) => {
      console.log(error)
      setMessage('Sorry, the call didnt work')
    });
  }
}


  return (
    <>
      <form action="submit" onSubmit = {onSubmitLocation}>
        <label htmlFor="location" className="sr-only">
          Where are you starting from?
        </label>
        <input onChange = {handleLocationChange}
          value={location}
          type="text"
          id="location"
          placeholder="Where are you starting from?"
        />
        <label htmlFor="destination" className="sr-only">
          Where are you headed?
        </label>
        <input onChange = {handleDestinationChange}
          value={destination}
          type="text"
          id="destination"
          placeholder="Where are you headed?"
        />
        <button type="submit">Submit</button>
      </form>

      <form action="submit" onSubmit = {onSubmitPodSearch}>
        <label htmlFor="podSearch" className="sr-only">
          What podcast do you want to listen to?
        </label>
        <input onChange = {handlePodcastSearchChange}
          value={podcastSearch}
          type="text"
          id="podSearch"
          placeholder="What podcast do you want to listen to?"
        />
        <button type="submit">Submit</button>
      </form>

      <PodcastInfo  podcast={podcastList}  message={message}  />
    </>

    // Podcast form
    // Text input with label that allows user to search for a podcast
    // Submit button

    // PodcastInfo component

    // MapDisplay component
    // BikeOrWalk component
  );
}

export default Form;

// ListenNotes
// const { Client } = require('podcast-api');

// const client = Client({ apiKey: '84ea935001f44836a966c059250896de' });
// client.search({
//   q: 'star wars',
//   sort_by_date: 0,
//   type: 'episode',
//   offset: 0,
//   len_min: 10,
//   len_max: 30,
//   genre_ids: '68,82',
//   published_before: 1580172454000,
//   published_after: 0,
//   only_in: 'title,description',
//   language: 'English',
//   safe_mode: 0,
//   unique_podcasts: 0,
//   page_size: 10,
// })
// .then((response) => {
//   console.log(response.data.results);
// })
// .catch((error) => {
//   console.log(error)
// });

// MapQuest
// axios({
//     url: 'https://www.mapquestapi.com/directions/v2/route',
//     method: 'GET',
//     dataResponse: 'json',
//     params: {
//         key: 'GajCx4GDQ4BbxuYSyMwSYdn9B65f9Vnx',
//         from: 'Brampton',
//         to: 'Vaughan'
//     }
// }).then((resp) => {
//     console.log(resp.data);
// })
