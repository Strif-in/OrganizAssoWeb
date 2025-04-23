import '../css/NavBar.css';
import React from 'react';


function NavBar({ setCurrentPage, logout }) {
  return (
    <>
      <nav className="navbar">
        <button onClick={() => setCurrentPage('forum')}>Forum</button>
        <button onClick={() => setCurrentPage('profiles')}>Recherche Profils</button>
        <button onClick={() => setCurrentPage('messages')}>Recherche Messages</button>
        <button onClick={() => setCurrentPage('profile')}>Mon Profil</button>
        <button onClick={logout}>Se Déconnecter</button>
      </nav>
    </>
  );
}

export default NavBar;
