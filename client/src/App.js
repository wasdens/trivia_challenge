import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Game from './components/Game'

function App() {
  return (
    <div className='app'>
      <Router>
        <Routes>
          <Route path={'/'} element={ <Game /> } />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
