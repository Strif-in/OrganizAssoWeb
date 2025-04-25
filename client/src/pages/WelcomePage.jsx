import React, { useState } from 'react';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';
import WaitingPage from './WaitingPage';
import '../css/WelcomePage.css';  // Optional for styling

function WelcomePage({userCur, getConnected, users }) {
  const [contentPage, setContentPage] = useState('login');

  const handleConnection= (user) => {
    getConnected(user)
    if(user.userStatus === 'pending'){
      setContentPage('waiting');
    }
  }
  
  return (
    <>
      <div className="welcome-wrapper">
        <div className="left-panel">
          {contentPage === 'login' && (
            <LoginForm
              ChangeToSignUp = {() => setContentPage('register')}
              getConnected={handleConnection} 
              users={users}
            />
          )}

          {contentPage === 'register' && (
            <RegisterForm 
              ChangeToLogin={() => setContentPage('login')}
              onRegisterSuccess={handleConnection}
              users={users}
            />
          )}

          {contentPage === 'waiting' && (
            <WaitingPage userCur = {userCur} checkUser={() => setContentPage('login')} />
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
