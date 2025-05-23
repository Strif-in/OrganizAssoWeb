import axios from 'axios';
import React, { useState } from 'react';

function LoginForm({ChangeToSignUp, getConnected}) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Form submitted');
      
        try {
          const response = await axios.post('http://localhost:8000/api/users/login', {
            username,
            password
          });
      
          setError('');
      
          if (response.status === 201) {
            // Admin login
            getConnected({ username, role: 'admin' });
          } else if (response.status === 200) {
            // Member login
            getConnected({ username, role: 'member' });
          }
      
        } catch (err) {
          if (err.response) {
            if (err.response.status === 401) {
              setError("Nom d'utilisateur ou mot de passe incorrect.");
            } else if (err.response.status === 403) {
              setError("En attente de validation par un administrateur.");
            } else {
              setError("Erreur inconnue. Veuillez réessayer.");
            }
          } else {
            console.log("hi" + err)
            setError("Impossible de contacter le serveur.");
          }
        }
      };
      

    return (
        <>
            <h1>Login your Account</h1>
            <div className="underline"></div>
            <form className="welcome-form" onSubmit={handleSubmit}>
            <input
                id='username'
                type="text"
                minLength="8"
                maxLength="14"
                placeholder="Nom d'utilisateur"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
            />
            <input
                id='password'
                type="password"
                placeholder="Mot de passe"
                minLength="8"
                maxLength="20"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />

            {error && <p className="error">{error}</p>}

            <div className="button-group">
                <button type="button" onClick={ChangeToSignUp}>Sign Up</button>
                <button type="submit">Login </button>
            </div>
            </form>
        </>
    );
}

export default LoginForm;
