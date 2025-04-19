// filepath: c:\Users\melse\Downloads\Web-projet\app-react\src\components\SignIn.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
const SignIn = () => {
	const navigate = useNavigate();
  return (
    <div>
      <h1>Sign In</h1>
	<form>
		<div>
			<label htmlFor="username">Login:</label>
			<input type="text" id="username" name="username" required title="Veuillez entrer votre nom d'utilisateur." />
		</div>
		<div>
			<label htmlFor="password">Mot de passe:</label>
			<input type="password" id="password" name="password" required title="Veuillez entrer votre mot de passe." />
		</div>
		<button type="submit">Connexion</button>
		
	</form>
	<button onClick={() => navigate('/')}>
		Retour
	</button>
	</div>
  );
};

export default SignIn;