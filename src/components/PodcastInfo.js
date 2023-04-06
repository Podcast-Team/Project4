import {useState} from 'react';

const PodcastInfo = (props) => {
    // const [podcast, setPodcast] = useState('');
    // useState for selected podcast - string

    // Onclick event that selects the clicked button's podcast
        // Pass selected podcast up to form as an argument


//Have to redefine how the conditions in how the podcast will be displayed
//Maybe something like: if the length of the podcast is +- x minutes of the destination time THEN display instead of if destination time ==== length of podcast 

    return (
        // Heading that displays either:
            // A "loading" message
            // An error message if necessary.
        <>
           
            
                <ul>
                <p>{props.message}</p>
                {props.podcast.map((podcastList)=>{
                    const lengthInMin = Math.round((podcastList.audio_length_sec / 60))

                    return (<li key={podcastList.id}>

                        <img src={podcastList.image} alt="" />
                        <p>{podcastList.title_original}</p>
                        <p>{podcastList.description_original}</p>
                        <p>{lengthInMin} min</p>
                        <a href={podcastList.website}>Website</a>
                    </li>)
                })}
                
                </ul> 
        </>
        
    )
}

export default PodcastInfo;