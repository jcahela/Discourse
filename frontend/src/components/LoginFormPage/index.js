import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import LoginSignupBackgroundSvg from "../auth/LoginSignupBackgroundSvg";
import { NavLink } from "react-router-dom";
import './LoginForm.css';

function LoginFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [credentialsError, setCredentialsError] = useState('')

  if (sessionUser) return <Redirect to="/dashboard" />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUsernameError('');
    setPasswordError('');
    setCredentialsError('');
    const data = await dispatch(login(credential, password))
    if (data) {
      const errors = data.errors;
      errors.forEach(error => {
        const singleErrorArr = error.split(':');
        if (singleErrorArr[0] === 'Username/Email') {
          setUsernameError(error)
        } else if (singleErrorArr[0] === 'Password') {
          setPasswordError(error)
        } else {
          setCredentialsError(error)
        }
      })
    }
  };

  const loginAsDemo = async (e) => {
    e.preventDefault();
    setUsernameError('');
    setPasswordError('');
    setCredentialsError('');
    await dispatch(login("demo@user.io", "password"))
  }

  return (
    <>
      <LoginSignupBackgroundSvg className={"login-background"}/>
      <form className="login-form-container" onSubmit={handleSubmit}>
        <h1 className="login-header">Login</h1>
        <label className="login-credential-label">
          Username or Email
          <input
            type="text"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            className="login-credential-input"
          />
          { usernameError && (
            <p className="login-errors">{usernameError}</p>
          )}
        </label>
        <label className="login-password-label">
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="login-password-input"
          />
          { passwordError && (
            <p className="login-errors">{passwordError}</p>
          )}
        </label>
        <button className="login-button" type="submit">Login</button>
        { credentialsError && (
          <div className="login-credentials-error-container">
            <p className="login-errors login-credentials-error">{credentialsError}</p>
          </div>
          )}
        <div className="login-tosignup-container">
          <p className="login-tosignup-label">Need an account?</p><NavLink className="login-tosignup-link" to="/signup">Register</NavLink>
        </div>
        <div className="login-todemo-container">
          <p className="login-todemo-label">Want to try the website out?</p><NavLink onClick={loginAsDemo} className="login-todemo-link" to="/signup">Login as a demo user</NavLink>
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

export default LoginFormPage;
