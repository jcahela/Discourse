import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import * as sessionActions from '../../store/session';

function ProfileButton({ user, socket }) {
  const logoutRef = useRef();
  const logoutTextRef = useRef();
  const sessionUser = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  const history = useHistory();
  const [showMenu, setShowMenu] = useState(false);
  
  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };
  
  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener('click', closeMenu);
  
    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = async (e) => {
    e.preventDefault();
    await dispatch(sessionActions.logout());
    history.push('/')
    socket.emit('set-offline', sessionUser.id)
  };

  const setLogoutColor = () => {
    logoutRef.current.style.backgroundColor = '#C93A3C'
    logoutTextRef.current.style.color = 'white'
  }

  return (
    <>
      <span onClick={openMenu} className="material-icons session-user-settings-icon">settings</span>
      {showMenu && (
        <div ref={logoutRef} onMouseDown={setLogoutColor} className="profile-dropdown" onClick={logout}>
            <span ref={logoutTextRef} className="logout-button">Log Out</span>
        </div>
      )}
    </>
  );
}

export default ProfileButton;
