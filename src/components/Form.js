// Import useState hook
import axios from 'axios';
import {useState, useEffect} from 'react';


const Form = () => {
    useEffect(() => {

    }, [] )
    // useState for location - string
    // useState for destination - string
    // useState for podcast search results - array
    // useState for error message - boolean

    // Onchange listener for starting location
    // Onchange listener for destination
    // Onchange listener for podcast serach

    // Function that handles when location form is submitted
         // Location axios call that triggers when map form is submitted

    // Function that handles when podcast form is submitted
        // Podcast axios call that triggers when podcast form is submitted

    return (
        <form action=""></form>
        // Location form
            // Text input and label for starting location
            // Text input and label for destination
            // Submit button
        // Podcast form
            // Text input with label that allows user to search for a podcast
            // Submit button

            // PodcastInfo component

            // MapDisplay component
            // BikeOrWalk component
    )
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