import React, { useState } from 'react';
import '../css/ProfileFilter.css';

function ProfileFilter({ users, onFilter }) {
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [username, setUsername] = useState('');
  const [status, setStatus] = useState('');

  const handleFilter = () => {
    const filtered = users.filter(usr => {
      const matchNom = nom ? usr.nom.toLowerCase().includes(nom.toLowerCase()) : true;
      const matchPrenom = prenom ? usr.prenom.toLowerCase().includes(prenom.toLowerCase()) : true;
      const matchUsername = username ? usr.username.toLowerCase().includes(username.toLowerCase()) : true;
      const matchStatus = status ? usr.status : true;

      return matchNom && matchPrenom && matchUsername && matchStatus;
    });

    onFilter(filtered);
  };

  return (
    <div className="message-filter">
        <input
        type="text"
        placeholder="Nom"
        value={nom}
        onChange={(e) => setNom(e.target.value)}
      />
      <input
        type="text"
        placeholder="Prenom"
        value={prenom}
        onChange={(e) => setPrenom(e.target.value)}
      />
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <button onClick={handleFilter}>Filtrer</button>
    </div>
  );
}

export default ProfileFilter;