import "./styles/sass/style.css";
import Form from "./components/Form.js";

const App = () => {
  return (
    <div className="App">
      <header>
        <div className="wrapper">
          <h1>Podcast Prioritizer</h1>
        </div>
      </header>
      <main>
        <div className="wrapper">
          <p className="intro">Got somewhere you need to go? Tell us where you're traveling from and to, and then search for a podcast you'd like to listen to. Then simply let us know if you prefer to walk or to bike, and we'll find podcasts for you that matches your trip duration! Please note that locations have to be within Canada.</p>
          <Form />
        </div>
      </main>
      <footer>
        <div className="wrapper">
          <p>
            Designed by:{" "}
            <a target="_blank" href="https://adrienpolselli.com/">
             <span className="sr-only">Opens in new tab: </span>Adrien Polselli,
            </a>{" "}
            <a target="_blank" href="https://derekngan.com/">
            <span className="sr-only">Opens in new tab: </span>Derek Ngan,
            </a>{" "}
            <a target="_blank" href="https://galenwhitecodes.tech">
            <span className="sr-only">Opens in new tab: </span>Galen White,
            </a>{" "}
            and{" "}
            <a target="_blank" href="https://jephchen.com/">
            <span className="sr-only">Opens in new tab: </span>Jeff Chen
            </a>{" "}
            2023 at <a target="_blank" href="https://junocollege.com/">
            <span className="sr-only">Opens in new tab: </span>Juno College</a>
            
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
