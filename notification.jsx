// src/components/Notification.jsx
import React from 'react';
import './Notification.css'; // Import the CSS for styling

const Notification = ({ message, onClose }) => {
    return (
        <div className="notification">
            <p>{message}</p>
            <button className="close-notification" onClick={onClose}>
                &times;
            </button>
        </div>
    );
};

export default Notification;