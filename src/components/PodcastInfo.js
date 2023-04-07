import { useState } from "react";

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
        <h2>{props.message}</h2>
        {props.podcast.map((podcastList) => {
          const lengthInMin = Math.round(podcastList.audio_length_sec / 60);

          return (
            <li key={podcastList.id}>
              <div className="imgContainer">
                <img src={podcastList.image} alt={`Podcast logo for: ${podcastList.title_original}`} />
              </div>
              <h3>
                <a href={podcastList.website} target="_blank">{podcastList.title_original}</a>
              </h3>
              <p className="podDesc">{podcastList.description_original}</p>
              <p>Duration: {lengthInMin} min</p>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default PodcastInfo;
