import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, NavLink } from "react-router-dom";
import { signup, signupWithPicture } from "../../store/session";
import LoginSignupBackgroundSvg from "../auth/LoginSignupBackgroundSvg";
import './SignupForm.css';

function SignupFormPage() {
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

  console.log(image)
  
  if (sessionUser) return <Redirect to="/dashboard" />;

  const updateFile = (e) => {
    const file = e.target.files[0];
    if (file) setImage(file)
  }

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
        <label className={`signup-profile-label picture-added-${image !== null}`}>
          { image ?
            `Added`:(
            `Add Profile Picture (optional)`
          )}
          <input 
            type="file"
            onChange={updateFile}
            className="signup-profile-input" 

          />
        </label>
        <button className="signup-button" type="submit">Sign Up</button>
        <div className="signup-tologin-container">
          <p className="signup-tologin-label">Already have an account?</p><NavLink className="signup-tologin-link" to="/login">Login</NavLink>
        </div>
      </form>
    </>
  );
}

export default SignupFormPage;
