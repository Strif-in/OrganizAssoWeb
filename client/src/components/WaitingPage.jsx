import React from 'react';
import { useNavigate } from 'react-router-dom';
 
const WaitingPage = () => {
    const navigate = useNavigate();
    
    return (
        <div>
            <h1>Compte en attente de validation</h1>
            <button onClick={() => navigate('/')}>Retour à la page d'acceuil</button>
        </div>
    );
};
 
export default WaitingPage;