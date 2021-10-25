import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import SignupFormPage from './components/SignupFormPage';
import LoginFormPage from "./components/LoginFormPage";
import * as sessionActions from './store/session';
import LandingPage from './components/LandingPage';
import ProtectedRoute from './components/auth/ProtectedRoute';
import DashboardPage from './components/DashboardPage';
import { restoreServersThunk } from './store/servers';
import { restoreChannelsThunk } from './store/channels';

// socket chat instance
import { io } from 'socket.io-client';

let serverUrl;
if (process.env.NODE_ENV === "production") {
    serverUrl = 'https://localhost:5000'
} else {
    serverUrl = 'http://localhost:5000'
}

const socket = io(serverUrl);

socket.on('connect', () => {
  console.log(`You connected with id: ${socket.id}`)
  socket.emit('fake-message', {
    userId: 1,
    channelId: 20,
    content: 'This is a message object that will represent a message',
  })
})

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser())
      .then(() => dispatch(restoreServersThunk()))
      .then(() => dispatch(restoreChannelsThunk()))
      .then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      {isLoaded && (
        <Switch>
          <Route exact path="/">
            <LandingPage />
          </Route>
          <Route path="/login" >
            <LoginFormPage />
          </Route>
          <Route path='/signup'>
            <SignupFormPage />
          </Route>
          <ProtectedRoute path='/dashboard'>
            <DashboardPage />
          </ProtectedRoute>
        </Switch>
      )}
    </>
  );
}

export default App;
