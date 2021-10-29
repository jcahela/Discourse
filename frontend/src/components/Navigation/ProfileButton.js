import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { useHistory } from "react-router";
import { useSelector } from "react-redux";
import * as sessionActions from '../../store/session';

function ProfileButton({ user, socket }) {
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
    socket.emit('set-offline', sessionUser.id)
    await dispatch(sessionActions.logout());
    history.push('/')
  };

  return (
    <>
      <span onClick={openMenu} className="material-icons session-user-settings-icon">settings</span>
      {showMenu && (
        <div className="profile-dropdown" onClick={logout}>
            <span className="logout-button">Log Out</span>
        </div>
      )}
    </>
  );
}

export default ProfileButton;
