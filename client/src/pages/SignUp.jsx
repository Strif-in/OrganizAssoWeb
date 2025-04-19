// filepath: c:\Users\melse\Downloads\Web-projet\app-react\src\components\SignUp.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Sign Up</h1>
      <form>
        <div>
          <label htmlFor="name">Prénom:</label>
          <input type="text" id="name" name="name" required title="Veuillez entrer votre prénom." />
        </div>
        <div>
          <label htmlFor="lastname">Nom:</label>
          <input type="text" id="lastname" name="lastname" required title="Veuillez entrer votre nom." />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" required title="Veuillez entrer une adresse email valide." />
        </div>
        <div>
          <label htmlFor="username">Login:</label>
          <input type="text" id="username" name="username" required title="Veuillez entrer un nom d'utilisateur." />
        </div>
        <div>
          <label htmlFor="password">Mot de passe:</label>
          <input type="password" id="password" name="password" required title="Veuillez entrer un mot de passe." />
        </div>
        <div>
          <label htmlFor="password2">Confirmer mot de passe:</label>
          <input type="password" id="password2" name="password2" required title="Veuillez confirmer votre mot de passe." />
        </div>
        <button onClick={() => navigate('/waiting')}>Créer mon compte</button>
      </form>
      <button onClick={() => navigate('/')}>Retour</button>
    </div>
  );
};

export default SignUp;