import "./styles/sass/style.css";
import Form from "./components/Form.js";

function App() {
  return (
    <div className="App">
      <header>
        <div className="wrapper">
          <h1>Podcast Prioritizer</h1>
        </div>
      </header>
      <main>
        <div className="wrapper">
          <Form />
        </div>
      </main>
      <footer>
        <div className="wrapper">
          <p>
            Designed by:{" "}
            <a target="_blank" href="https://adrienpolselli.com/">
              Adrien Polselli,
            </a>{" "}
            <a target="_blank" href="https://derekngan.com/">
              Derek Ngan,
            </a>{" "}
            <a target="_blank" href="https://galenwhitecodes.tech">
              Galen White,
            </a>{" "}
            and{" "}
            <a target="_blank" href="https://jephchen.com/">
              Jeff Chen
            </a>{" "}
            2023 at Juno College
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
