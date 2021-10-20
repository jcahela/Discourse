import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, NavLink } from "react-router-dom";
import { signup } from "../../store/session";
import LoginSignupBackgroundSvg from "../auth/LoginSignupBackgroundSvg";
import './SignupForm.css';

function SignupFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/dashboard" />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(signup(email, username, password))
    if (data) {
      setErrors(data.errors)
    }
    // return setErrors(['Confirm Password field must be the same as the Password field']);
  };

  return (
    <>
      <LoginSignupBackgroundSvg className={"signup-background"}/>
      <form className="signup-form-container" onSubmit={handleSubmit}>
        <h1 className="signup-form-header" className="signup-header">Create an account</h1>
        <ul>
          {errors.map((error, idx) => <li className="errors-old" key={idx}>{error}</li>)}
        </ul>
        <label className="signup-email-label">
          Email
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="signup-email-input"
          />
        </label>
        <label className="signup-username-label">
          Username
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="signup-username-input"
          />
        </label>
        <label className="signup-password-label">
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="signup-password-input"
          />
        </label>
        <label className="signup-confirm-label">
          Confirm Password
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="signup-confirm-input"
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
