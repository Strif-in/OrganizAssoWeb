import axios from 'axios';
import React, { useState } from 'react';

function LoginForm({ChangeToSignUp, getConnected, users }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async(e) => {
        e.preventDefault();

        const userData = {
            username,
            password
        };

        const foundUser = await axios.get('http://localhost:3000/api/users/login',  userData);

        if (foundUser) {
            setError('');
            getConnected(foundUser);   // Notify App of successful login
        }else {
            setError('Nom d\'utilisateur ou mot de passe incorrect.');
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
                minlength="8"
                maxlength="14"
                placeholder="Nom d'utilisateur"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
            />
            <input
                id='password'
                type="password"
                placeholder="Mot de passe"
                minlength="8"
                maxlength="20"
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
