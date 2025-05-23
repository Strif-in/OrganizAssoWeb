import React, { useEffect, useState } from 'react';
import '../css/ProfileFilter.css';

function ProfileFilter({ users, onFilter, userCur }) {
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [username, setUsername] = useState('');
  const [status, setStatus] = useState('all');

  const handleFilter = () => {
    const filtered = users.filter(usr => {
      const matchNom = nom ? usr.nom.toLowerCase().includes(nom.toLowerCase()) : true;
      const matchPrenom = prenom ? usr.prenom.toLowerCase().includes(prenom.toLowerCase()) : true;
      const matchUsername = username ? usr.username.toLowerCase().includes(username.toLowerCase()) : true;

      const matchStatus =
        status === 'all'
          ? true
          : status === 'pending'
          ? !usr.isMember
          : status === 'member'
          ? usr.isMember && !usr.isAdmin
          : usr.isAdmin;

      return matchNom && matchPrenom && matchUsername && matchStatus;
    });

    onFilter(filtered);
  };

  useEffect(() => {
    handleFilter();
  }, [nom, prenom, username, status]);

  return (
    <div className="message-filter">
      <input
        type="text"
        size="10"
        placeholder="Nom"
        value={nom}
        onChange={(e) => setNom(e.target.value)}
      />
      <input
        type="text"
        size="10"
        placeholder="Prenom"
        value={prenom}
        onChange={(e) => setPrenom(e.target.value)}
      />
      <input
        type="text"
        size="14"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      {userCur?.isAdmin && (
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="all">Tous</option>
          <option value="pending">En attente</option>
          <option value="member">Membres</option>
          <option value="admin">Admins</option>
        </select>
      )}
      <button onClick={handleFilter}>Filtrer</button>
    </div>
  );
}

export default ProfileFilter;
