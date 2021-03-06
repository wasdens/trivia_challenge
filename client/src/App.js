import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { CssBaseline, ThemeProvider } from '@mui/material'
import WaitingRoom from './components/waiting/WaitingRoom'
import Game from './components/game/Game'
import { io } from 'socket.io-client'
import theme from './tools/theme';

const socket = io(process.env.REACT_APP_SOCKET_URL)

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className='app'>
        <Router>
          <Routes>
            <Route path={'/'} element={ <WaitingRoom /> } />
            <Route path={'/game'} element={ <Game /> } />
          </Routes> 
        </Router>
      </div>
    </ThemeProvider>
  );
}

export default App;

export {
  socket
}
