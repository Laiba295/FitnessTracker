// src/components/Login.jsx
import React from "react";
import {
  FaEnvelope,
  FaLock,
  FaDumbbell,
  FaGoogle,
  FaFacebookF,
  FaInstagram,
} from "react-icons/fa";
import image from "../images/image.png";
import "../components/Login.css";

const Login = ({ isModal, onClose }) => {
  const wrapperClass = isModal ? "login-modal-overlay" : "login-page";

  return (
    <div className={wrapperClass}>
      {isModal && (
        <button className="close-btn" onClick={onClose}>
          &times;
        </button>
      )}

      <div className="login-container">
        {/* --- Left Section (Form) --- */}
        <div className="left-section">
          {/* --- Logo and Title --- */}
          <div className="logo-container">
            <div className="logo-circle">
              <FaDumbbell className="icon" />
            </div>
            <h1>FitSphere</h1>
          </div>

          <p className="login-message">Login To Your Account</p>

          {/* --- Email --- */}
          <div className="form-group">
            <FaEnvelope className="icon input-icon" />
            <input type="email" placeholder="Enter email address" />
          </div>

          {/* --- Password --- */}
          <div className="form-group">
            <FaLock className="icon input-icon" />
            <input type="password" placeholder="Enter password" />
          </div>

          {/* --- Forgot Password --- */}
          <div className="forgot-password">
            <a href="#">Forgot Password?</a>
          </div>

          {/* --- Social Icons --- */}
          <div className="social-icons">
            <FaGoogle className="icon" />
            <FaFacebookF className="icon" />
            <FaInstagram className="icon" />
          </div>

          {/* --- Login Button --- */}
          <button className="login-btn">Login</button>
        </div>

        {/* --- Right Section (Image) --- */}
        <div className="right-section">
          <img src={image} alt="Woman running" className="illustration" />
        </div>
      </div>
    </div>
  );
};

export default Login;
