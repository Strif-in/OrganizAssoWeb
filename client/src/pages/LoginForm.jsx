import React, { useState } from 'react';
import '../css/LoginForm.css';

function LoginForm({ChangeToSignUp, getConnected, users }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const foundUser = users.find(
            user => user.username === username && user.password === password
        );

        if (foundUser) {
            setError('');
            getConnected(foundUser);   // Notify App of successful login
        }else {
            setError('Nom d\'utilisateur ou mot de passe incorrect.');
        }
    };

    return (
        <>
            <h1>Login Organiz-Asso</h1>
            <div className="underline"></div>
            <form className="login-form" onSubmit={handleSubmit}>
            <label for="username">Username</label>
            <input
                id='username'
                type="text"
                placeholder="Nom d'utilisateur"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
            />
            <label for="Password">Password</label>
            <input
                id='Password'
                type="password"
                placeholder="Mot de passe"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            {error && <p className="error">{error}</p>}
            <button onClick={ChangeToSignUp}>SignUp</button>
            <button type="submit">Login</button>
            </form>
        </>
    );
}

export default LoginForm;
