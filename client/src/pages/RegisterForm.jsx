import React, { useState } from 'react';

function RegisterForm({ChangeToLogin, onRegisterSuccess, users }) {
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if passwords match
    if (password1 !== password2) {
      setError('Les mots de passe ne correspondent pas.');
      return;
    }

    // Check if username is already taken
    const existingUser = users.find(user => user.username === username);
    if (existingUser) {
      setError('Ce nom d\'utilisateur existe déjà.');
      return;
    }

    // Simulate saving the user (normally, you'd POST to backend)
    const newUser = {
      userId: `u${users.length + 1}`,
      nom,
      prénom: prenom,
      username,
      email,
      password: password1,
      userStatus: 'pending'   // Waiting for admin validation
    };

    console.log('User registered:', newUser);

    // Move to WaitingPage
    onRegisterSuccess(newUser);
  };

  return (
    <>
      <h1>Sign Up Organiz-Asso</h1>
      <div className="underline"></div>
      <form className="welcome-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nom"
          value={nom}
          onChange={(e) => setNom(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Prénom"
          value={prenom}
          onChange={(e) => setPrenom(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Nom d'utilisateur (ID étudiant)"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Mot de passe"
          value={password1}
          onChange={(e) => setPassword1(e.target.value)}
          required
        />
        <input
          type="password"
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
