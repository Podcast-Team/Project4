//Podcast COmponent 
// Displays the results for the podcast search
// Display API call Podcast data 


const PodcastInfo = (props) => {
  return (
    <>
      <ul className="podcastList">
        <h2>{props.message}</h2>
        {props.podcast.map((podcastList) => {
          const lengthInMin = Math.round(podcastList.audio_length_sec / 60);

          return (
            <li key={podcastList.id}>
              <h3>
                <a href={podcastList.website} target="_blank">
                  {podcastList.title_original}
                </a> {" "}
                - duration: {lengthInMin} min
              </h3>
              <div className="podInfo">
                <div className="imgContainer">
                  <img
                    src={podcastList.image}
                    alt={`Podcast logo for: ${podcastList.title_original}`}
                  />
                </div>
                <p className="podDesc">{podcastList.description_original}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default PodcastInfo;
