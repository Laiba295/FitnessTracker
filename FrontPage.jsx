// src/components/FrontPage.jsx
import React, { useState } from 'react';
import Login from './Login'; // Import the Login component
import './FrontPage.css'; // Import CSS for styling

const FrontPage = () => {
    const [isLoginModalOpen, setLoginModalOpen] = useState(false);

    const handleLoginClick = () => {
        setLoginModalOpen(true); // Open the login modal
    };

    const closeLoginModal = () => {
        setLoginModalOpen(false); // Close the login modal
    };

    return (
        <div className="front-page">
            <div className="overlay-container"> {/* This is the glassmorphism card */}
                <h1>Welcome to FitSphere</h1>
                <p>
                    Embark on your personal fitness adventure with FitSphere!
                    Track your progress, achieve your goals, and unlock your full potential.
                </p>
                <button className="login-button" onClick={handleLoginClick}>
                    Start Your Journey
                </button>
            </div>

            {/* Render the Login component as a modal */}
            {isLoginModalOpen && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <button className="close-btn" onClick={closeLoginModal}>
                            &times;
                        </button>
                        <Login isModal={true} onClose={closeLoginModal} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default FrontPage;