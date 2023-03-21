import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import SignupFormPage from './components/SignupFormPage';
import LoginFormPage from "./components/LoginFormPage";
import * as sessionActions from './store/session';
import LandingPage from './components/LandingPage';
import ProtectedRoute from './components/auth/ProtectedRoute';
import DashboardPage from './components/DashboardPage';
import { restoreServersThunk } from './store/servers';
import { restoreChannelsThunk } from './store/channels';
import { restoreMessagesThunk } from './store/messages';
import { restoreUsersThunk } from './store/users';

// socket chat instance
import { io } from 'socket.io-client';

let serverUrl;
if (process.env.NODE_ENV === "production") {
    serverUrl = 'https://discourse-aa-backend.onrender.com'
} else {
    serverUrl = 'http://localhost:5000'
}

const socket = io(serverUrl);

socket.on('connect', () => {
  console.log(`You connected with id: ${socket.id}`);
})

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {

    async function restoreApp() {
      await dispatch(sessionActions.restoreUser());
      await dispatch(restoreServersThunk());
      await dispatch(restoreChannelsThunk());
      await dispatch(restoreMessagesThunk());
      await dispatch(restoreUsersThunk());
      setIsLoaded(true);
    }
    
    restoreApp();
  }, [dispatch]);

  if (!isLoaded) {
    return (
      <div className="loading-background">
        <img className="loading-screen" src="https://cdn.discordapp.com/attachments/886336420552269847/900936387031887892/discord-loading-screen.gif" alt="" />
      </div>
    )
  }

  return (
    <>
      {isLoaded && (
        <BrowserRouter>
          <Switch>
            <Route exact path="/">
              <LandingPage />
            </Route>
            <Route path="/login" >
              <LoginFormPage socket={socket}/>
            </Route>
            <Route path='/signup'>
              <SignupFormPage socket={socket}/>
            </Route>
            <ProtectedRoute path='/dashboard'>
              <DashboardPage socket={socket}/>
            </ProtectedRoute>
          </Switch>
        </BrowserRouter>
      )}
    </>
  );
}

export default App;
