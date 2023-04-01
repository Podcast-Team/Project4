import logo from './logo.svg';
import './styles/sass/style.css';
import Form from './components/Form.js';

function App() {
  return (
    <div className="App">
      <main>
          <Form />
      </main>
<footer>
  <p>Designed by: 
    <a target="_blank" href="https://adrienpolselli.com/"> Adrien Polselli,</a> 
    <a target="_blank" href="https://derekngan.com/"> Derek Ngan,</a> 
    <a target="_blank" href="https://galenwhitecodes.tech"> Galen White,</a> and
    <a target="_blank" href="https://jephchen.com/"> Jeff Chen </a> 
  2023 at Juno College</p>
  </footer>
    </div>
  );
}

export default App;
