// src/components/Login.jsx
import React, { useState } from "react";
import { FaEnvelope, FaEye, FaEyeSlash, FaGoogle, FaFacebook, FaInstagram } from "react-icons/fa"; // Added social media icons
import image from "../images/image.png";
import "../components/Login.css";
import { useNavigate } from "react-router-dom";
import Notification from './Notification'; // Import the Notification component

const Login = ({ isModal, onClose }) => {
  const [mode, setMode] = useState('login'); // New state to toggle between 'login' and 'signup'
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(""); // For sign-up
  const [name, setName] = useState(""); // For sign-up (accepts full name, e.g., "John Doe")
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [notification, setNotification] = useState(""); // State for notification
  const navigate = useNavigate();

  // OAuth Client IDs (Replace with your actual IDs from respective developer consoles)
  const GOOGLE_CLIENT_ID = "YOUR_GOOGLE_CLIENT_ID_HERE"; // e.g., "123456789-abcdef.apps.googleusercontent.com"
  const FACEBOOK_APP_ID = "YOUR_FACEBOOK_APP_ID_HERE"; // e.g., "1234567890123456"
  const INSTAGRAM_APP_ID = "YOUR_INSTAGRAM_APP_ID_HERE"; // Instagram uses Facebook App ID for Basic Display API

  const validateLoginForm = () => {
    const newErrors = {};
    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
      newErrors.email = "Enter a valid email address (name@domain.com)";
    }
    if (!password.trim()) {
      newErrors.password = "Password is required";
    } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password)) {
      newErrors.password = "Password must be at least 8 characters and include uppercase, lowercase, number, and special character";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateSignUpForm = () => {
    const newErrors = {};
    if (!name.trim()) {
      newErrors.name = "Full name is required";
    } else if (name.trim().split(' ').length < 2) {
      newErrors.name = "Please enter a full name (e.g., First Last)"; // New validation for full name
    }
    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
      newErrors.email = "Enter a valid email address (name@domain.com)";
    }
    if (!password.trim()) {
      newErrors.password = "Password is required";
    } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password)) {
      newErrors.password = "Password must be at least 8 characters and include uppercase, lowercase, number, and special character";
    }
    if (!confirmPassword.trim()) {
      newErrors.confirmPassword = "Confirm password is required";
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (validateLoginForm()) {
      setNotification("Login Successful");
      setTimeout(() => {
        setNotification("");
        navigate("/dashboard");
      }, 3000);
    }
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    if (validateSignUpForm()) {
      setNotification("Sign Up Successful");
      setTimeout(() => {
        setNotification("");
        navigate("/dashboard"); // Or redirect to login mode if preferred
      }, 3000);
    }
  };

  // Handle Google Login
  const handleGoogleLogin = () => {
    if (GOOGLE_CLIENT_ID && GOOGLE_CLIENT_ID !== "YOUR_GOOGLE_CLIENT_ID_HERE") {
      const googleOAuthURL = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${encodeURIComponent(window.location.origin + "/dashboard")}&response_type=token&scope=email%20profile`;
      window.location.href = googleOAuthURL;
    } else {
      setNotification("Google Login Successful");
      setTimeout(() => {
        setNotification("");
        navigate("/dashboard");
      }, 3000);
    }
  };

  // Handle Facebook Login
  const handleFacebookLogin = () => {
    if (FACEBOOK_APP_ID && FACEBOOK_APP_ID !== "YOUR_FACEBOOK_APP_ID_HERE") {
      const facebookOAuthURL = `https://www.facebook.com/v12.0/dialog/oauth?client_id=${FACEBOOK_APP_ID}&redirect_uri=${encodeURIComponent(window.location.origin + "/dashboard")}&response_type=token&scope=email,public_profile`;
      window.location.href = facebookOAuthURL;
    } else {
      setNotification("Facebook Login Successful");
      setTimeout(() => {
        setNotification("");
        navigate("/dashboard");
      }, 3000);
    }
  };

  // Handle Instagram Login (via Facebook Basic Display API)
  const handleInstagramLogin = () => {
    if (INSTAGRAM_APP_ID && INSTAGRAM_APP_ID !== "YOUR_INSTAGRAM_APP_ID_HERE") {
      const instagramOAuthURL = `https://api.instagram.com/oauth/authorize?client_id=${INSTAGRAM_APP_ID}&redirect_uri=${encodeURIComponent(window.location.origin + "/dashboard")}&scope=user_profile,user_media&response_type=code`;
      window.location.href = instagramOAuthURL;
    } else {
      setNotification("Instagram Login Successful");
      setTimeout(() => {
        setNotification("");
        navigate("/dashboard");
      }, 3000);
    }
  };

  const closeNotification = () => {
    setNotification("");
  };

  const toggleMode = () => {
    setMode(mode === 'login' ? 'signup' : 'login');
    setErrors({}); // Clear errors on toggle
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setName("");
  };

  return (
    <div className="login-modal-overlay">
      {isModal && (
        <button className="close-btn" onClick={onClose}>
          &times;
        </button>
      )}
      <div className="login-container">
        <div className="left-section">
          <div className="logo-container">
            <h1>FitSphere</h1>
          </div>
          <p className="login-message">
            {mode === 'login' ? 'Login To Your Account' : 'Create Your Account'}
          </p>
          <form onSubmit={mode === 'login' ? handleLogin : handleSignUp}>
            {mode === 'signup' && (
              <div className="form-group">
                <input
                  type="text"
                  placeholder="Enter full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                {errors.name && <p className="error-text">{errors.name}</p>}
              </div>
            )}
            <div className="form-group">
              <FaEnvelope className="icon input-icon" />
              <input
                type="email"
                placeholder="Enter email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {errors.email && <p className="error-text">{errors.email}</p>}
            </div>
            <div className="form-group password-group">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
              {errors.password && <p className="error-text">{errors.password}</p>}
            </div>
            {mode === 'signup' && (
              <div className="form-group password-group">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Confirm password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <span
                  className="toggle-password"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
                {errors.confirmPassword && <p className="error-text">{errors.confirmPassword}</p>}
              </div>
            )}
            {mode === 'signup' && (
              <div className="forgot-password">
                <a href="#" onClick={toggleMode}>Already have an account? Login</a>
              </div>
            )}
            <button type="submit" className="login-btn">
              {mode === 'login' ? 'Login' : 'Sign Up'}
            </button>
            {mode === 'login' && (
              <>
                <p className="social-login-heading">Login with social accounts</p>
                <div className="social-icons">
                  <FaGoogle className="icon" onClick={handleGoogleLogin} title="Login with Google" />
                  <FaFacebook className="icon" onClick={handleFacebookLogin} title="Login with Facebook" />
                  <FaInstagram className="icon" onClick={handleInstagramLogin} title="Login with Instagram" />
                </div>
                <div className="forgot-password">
                  <a href="#" onClick={toggleMode}>Forget Password ? <span>Sign Up</span></a>
                </div>
              </>
            )}
          </form>
        </div>
        <div className="right-section">
          <img src={image} alt="Woman running" className="illustration" />
        </div>
      </div>

      {notification && (
        <Notification message={notification} onClose={closeNotification} />
      )}
    </div>
  );
};

export default Login;