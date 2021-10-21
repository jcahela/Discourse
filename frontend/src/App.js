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

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser())
      .then(() => dispatch(restoreServersThunk()))
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
