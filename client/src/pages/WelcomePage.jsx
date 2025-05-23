import React, { useState } from 'react';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';
import WaitingPage from './WaitingPage';
import axios from 'axios';
import '../css/WelcomePage.css';  // Optional for styling

function WelcomePage({userCur, getConnected}) {
  const [contentPage, setContentPage] = useState('login');
  const [userWating, setUserWating] = useState('');

  const handleLogin = async ({ username,  role }) => {
    try {
      const response = await axios.post('http://localhost:8000/api/users/getUser', { username });
      
      if (!response.data) {
        console.error('No user data received from server');
        return;
      }
  
      const user = response.data;
      getConnected(user);

    } catch (error) {
      console.error('Error in handleConnection:', error);
    }
  };

  const handleRegister = (username) => {
    setUserWating(username);
    setContentPage('waiting');
  };
  
  
  return (
    <>
      <div className="welcome-wrapper">
        <div className="left-panel">
          {contentPage === 'login' && (
            <LoginForm
              ChangeToSignUp = {() => setContentPage('register')}
              getConnected={handleLogin} 
            />
          )}

          {contentPage === 'register' && (
            <RegisterForm 
              ChangeToLogin={() => setContentPage('login')}
              onRegisterSuccess={handleRegister}
            />
          )}

          {contentPage === 'waiting' && (
            <WaitingPage userCur = {userWating} login={() => {setContentPage('login');setUserWating('')}} />
          )}
        </div>
        
        <div className="right-panel">
          <p>Organiz-Asso</p>
          <img className="building-img" src="/sorbonne_image.png" alt="Buildings" />
        </div>
      </div>
    </>
  );
}

export default WelcomePage;
