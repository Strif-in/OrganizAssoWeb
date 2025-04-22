import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../css/UserProfile.css';
import ListMessages from './ListMessages.jsx'; // Assuming Message is in the same directory

function UserProfile({messages,userCur,onDelete}) {
  const navigate = useNavigate();
  const location = useLocation(); // Access the state passed during navigation
  const { login, password } = location.state || {}; // Destructure the state with fallback

  return (
    <div className="user-profile">
      <header className="header">
        <div className="logo">
          <img src="/logo.png" alt="Company Logo" />
        </div>
        <div className="search-bar">
          <input type="text" placeholder="Search..." />
        </div>
        <div className="logout-button">
          <button onClick={() => navigate('/')}>Logout</button>
        </div>
      </header>

      
      <main className="main-content">
        
        <div className="user-info">
          <h2>Moi</h2>
          <p><strong>Login:</strong> {login || 'N/A'}</p>
        </div>
      </main>
    </div>
  );
}

export default UserProfile;