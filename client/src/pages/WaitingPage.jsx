import React from 'react';
import '../css/WaitingPage.css';

function WaitingPage({userCur, checkUser}) {
  const handleReload = () => {
    // For now, just call checkUser to simulate validation complete
    checkUser();
  };

  return (
    <>
      <h1>Waiting Admin Validation</h1>
      <div className="underline"></div>
      <div className="waiting-page">
        <h2>En attente de validation</h2>
        <p>Votre compte {userCur.username} est en cours de validation par un administrateur.</p>
        <button onClick={handleReload}>🔄 Back to Login</button>
      </div>
    </>
  );
}

export default WaitingPage;
