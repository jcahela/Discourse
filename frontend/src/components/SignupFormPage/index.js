import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, NavLink } from "react-router-dom";
import { signup, signupWithPicture } from "../../store/session";
import LoginSignupBackgroundSvg from "../auth/LoginSignupBackgroundSvg";
import ImageDropzone from '../ImageDropzone'
import './SignupForm.css';

function SignupFormPage({ socket }) {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [emailError, setEmailError] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [image, setImage] = useState(null)
  
  if (sessionUser) return <Redirect to="/dashboard" />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEmailError('')
    setUsernameError('')
    setPasswordError('')
    setConfirmPasswordError('')
    if (password && password !== confirmPassword) {
      setConfirmPasswordError('Confirm Password field must be the same as the Password field');
      return;
    }
    let data;
    if (image) {
      data = await dispatch(signupWithPicture(image, email, username, password))
    } else {
      data = await dispatch(signup(email, username, password))
    }
    if (data) {
      const errors = data.errors;
      errors.forEach(error => {
        if (error.includes('Email')) {
          setEmailError(error)
        }
        if (error.includes('Username')) {
          setUsernameError(error)
        }
        if (error.includes('Password')) {
          setPasswordError(error)
        }
      })
    }
    socket.emit('set-online', username)
  };

  return (
    <>
      <LoginSignupBackgroundSvg className={"signup-background"}/>
      <form className="signup-form-container" onSubmit={handleSubmit}>
        <h1 className="signup-header">Create an account</h1>
        <label className="signup-email-label">
          Email
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="signup-email-input"
          />
          { emailError && (
            <div className="signup-error-container">
              <p className="signup-error">{emailError}</p>
            </div>
          )}
        </label>
        <label className="signup-username-label">
          Username
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="signup-username-input"
          />
          { usernameError && (
            <div className="signup-error-container">
              <p className="signup-error">{usernameError}</p>
            </div>
          )}
        </label>
        <label className="signup-password-label">
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="signup-password-input"
          />
          { passwordError && (
            <div className="signup-error-container">
              <p className="signup-error">{passwordError}</p>
            </div>
          )}
        </label>
        <label className="signup-confirm-label">
          Confirm Password
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="signup-confirm-input"
          />
          { confirmPasswordError && (
            <div className="signup-error-container">
              <p className="signup-error">{confirmPasswordError}</p>
            </div>
          )}
        </label>
        <ImageDropzone setImage={setImage}/>
        <button className="signup-button" type="submit">Sign Up</button>
        <div className="signup-tologin-container">
          <p className="signup-tologin-label">Already have an account?</p><NavLink className="signup-tologin-link" to="/login">Login</NavLink>
        </div>
      </form>
      <div className="about-links-container">
        <p className="about-links-dev-name">Created By Jason Cahela</p>
        <a href="https://github.com/jcahela" target="_blank" rel="noreferrer">
          <img className="about-links-image" src="https://cdn.discordapp.com/attachments/886336420552269847/889198252417761290/GitHub-Mark-Light-32px.png" alt="" />
        </a>
        <a href="https://www.linkedin.com/in/jason-cahela/" target="_blank" rel="noreferrer">
          <img className="about-links-image" src="https://cdn.discordapp.com/attachments/886336420552269847/888542913594806272/768px-LinkedIn_logo_initials.png" alt="" />
        </a>
      </div>
    </>
  );
}

export default SignupFormPage;
