import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
function SignIn ()  {
	const navigate = useNavigate();
	const [login, setLogin] = useState("");
 	const [password, setPassword] = useState("");
 	const getLogin = (evt) => {setLogin(evt.target.value)}
 	const getPassword = (evt) => {setPassword(evt.target.value)}

	 const submissionHandler = (evt) => {
		evt.preventDefault();
		navigate('/userpage', { state: { login, password }});
	}
	

  return (
    <div>
      <h1>Sign In</h1>
	<form onSubmit={submissionHandler}>
		<div>
			<label htmlFor="username">Login:</label>
			<input type="text" id="username" name="username" required value={login} title="Veuillez entrer votre nom d'utilisateur." onChange={getLogin} />
		</div>
		<div>
			<label htmlFor="password">Mot de passe:</label>
			<input type="password" id="password" name="password" required value={password} title="Veuillez entrer votre mot de passe." onChange={getPassword}/>
		</div>
		<button type="submit" >Connexion</button>
		
	</form>
	<button onClick={() => navigate('/')}>
		Retour
	</button>
	</div>
  );
};

export default SignIn;