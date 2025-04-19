import React from 'react';
import { useNavigate } from 'react-router-dom';
 
 
const WelcomePage = () => {
    const navigate = useNavigate();// Initialize navigation
 
    return (
        <div>
          <h1>Organiz-asso</h1>
          <h2>Bienvenue</h2>
          <button onClick={() => navigate('/signin')}>Connexion</button>
          <button onClick={() => navigate('/signup')}>Créer un compte</button>
        </div>
      );
 };
 
 export default WelcomePage;