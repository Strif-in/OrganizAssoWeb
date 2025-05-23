import React from 'react';


function NavBar({ setCurrentPage, backtoUserCur}) {
  return (
    <>
      <nav className="navbar">
        <button onClick={() => {setCurrentPage('forum');backtoUserCur();}}>Forum</button>
        <button onClick={() => {setCurrentPage('profiles');backtoUserCur();}}>Recherche Profils</button>
        <button onClick={() => {setCurrentPage('messages');backtoUserCur();}}>Recherche Messages</button>
      </nav>
    </>
  );
}

export default NavBar;
