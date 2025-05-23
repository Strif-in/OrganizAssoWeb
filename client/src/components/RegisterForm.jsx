import React, { useState } from 'react';
import axios from 'axios';

function RegisterForm({ChangeToLogin, onRegisterSuccess}) {
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    setError('');
  
    if (password1 !== password2) {
      setError("Les mots de passe ne correspondent pas.");
      return;
    }
  
    try {
      const response = await axios.post('http://localhost:8000/api/users/create', {
        username,
        password: password1,
        email,
        nom,
        prenom,
      });

      onRegisterSuccess(username); // continue to waiting screen
  
    } catch (err) {
      if (err.response?.status === 409) {
        setError("Ce nom d'utilisateur existe déjà.");
      } else if (err.response?.status === 400) {
        setError("Tous les champs sont requis.");
      } else {
        setError("Erreur serveur. Réessayez plus tard.");
        console.error(err);
      }
    }
  };
  

  return (
    <>
      <h1>Create your Account</h1>
      <div className="underline"></div>
      <form className="welcome-form" onSubmit={handleSubmit}>
        <input
          type="text"
          minLength="3"
          maxLength="10"
          placeholder="Nom"
          value={nom}
          onChange={(e) => setNom(e.target.value)}
          required
        />
        <input
          type="text"
          minLength="3"
          maxLength="10"
          placeholder="Prénom"
          value={prenom}
          onChange={(e) => setPrenom(e.target.value)}
          required
        />
        <input
          type="text"
          minLength="8"
          maxLength="14"
          placeholder="Nom d'utilisateur"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="email"
          minLength="6"
          maxLength="20"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          minLength="8"
          maxLength="20"
          placeholder="Mot de passe"
          value={password1}
          onChange={(e) => setPassword1(e.target.value)}
          required
        />
        <input
          type="password"
          minLength="8"
          maxLength="20"
          placeholder="Confirmer le mot de passe"
          value={password2}
          onChange={(e) => setPassword2(e.target.value)}
          required
        />
        {error && <p className="error">{error}</p>}
        
        <div className="button-group">
          <button type="submit">SignUp</button>
          <button onClick={ChangeToLogin}>Login</button>
        </div>
      </form>
    </>
  );
}

export default RegisterForm;
