//Podcast Component 
// This component displays the results of the podcast search and the API call podcast data.

const PodcastInfo = (props) => {
  return (
    <>
    <h2 className={ props.message ? 'messageBorder' : null }>{props.message}</h2>
      <ul className="podcastList">
        {props.podcast.map((podcastList) => {
          const lengthInMin = Math.round(podcastList.audio_length_sec / 60);

          return (
            <li key={podcastList.id}>
              <h3>
                <a href={podcastList.website} target="_blank">
                <span className="sr-only">Opens in new tab: </span>
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
