import '../css/NavBar.css';
import React from 'react';


function NavBar({ setCurrentPage }) {
  return (
    <>
      <nav className="navbar">
        <button onClick={() => setCurrentPage('forum')}>Forum</button>
        <button onClick={() => setCurrentPage('profiles')}>Recherche Profils</button>
        <button onClick={() => setCurrentPage('messages')}>Recherche Messages</button>
      </nav>
    </>
  );
}

export default NavBar;
