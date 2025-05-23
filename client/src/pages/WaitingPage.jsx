import React from 'react';
import '../css/WaitingPage.css';

function WaitingPage({userCur, login}) {

  return (
    <>
      <h1>Waiting Admin Validation</h1>
      <div className="underline"></div>
      <div className="waiting-page">
        <h2>En attente de validation</h2>
        <p>Votre compte <strong>{userCur}</strong> est en cours de validation par un administrateur.</p>
        <div className="button-group">
          <button onClick={login}>Back to Login  </button>
        </div>
      </div>
    </>
  );
}

export default WaitingPage;
