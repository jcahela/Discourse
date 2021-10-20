import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
// import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

  // let sessionLinks;
  // if (sessionUser) {
  //   sessionLinks = (
  //     <ProfileButton user={sessionUser} />
  //   );
  // } else {
  //   sessionLinks = (
  //     <>
  //       <NavLink to="/login">Log In</NavLink>
  //       <NavLink to="/signup">Sign Up</NavLink>
  //     </>
  //   );
  // }

  return (
      <div className="navbar-container">
        <NavLink className="navbar-logo-container" exact to="/">
          <img
            className="navbar-logo"
            src="https://cdn.discordapp.com/attachments/886336420552269847/900179466758783066/unknown.png" alt="" 
          />
          <span className="navbar-header">Discourse</span>
        </NavLink>
        { sessionUser ? (
          <NavLink className="navbar-login" to="/dashboard">Open Discourse</NavLink>
        ):(
          <NavLink className="navbar-login" to="/login">Login</NavLink>
        )}
        {/* {isLoaded && sessionLinks} */}
      </div>
  );
}

export default Navigation;
