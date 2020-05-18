// import React from 'react';
import './App.css';
import AlertPage from './pages/alertPage'
import SoundPage from './pages/soundPage'



// function App() {
//   return (
//     <SpotifyPlayer/>
//   );
// }

// export default App;


import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,

} from "react-router-dom";

export default function App() {
  return (
    <Router>
      
        <Switch>
          <Route path="/alert">
            <AlertPage/>
          </Route>
          <Route path="/">
          <SoundPage/>
          </Route>
        </Switch>
    </Router>
  );
}


