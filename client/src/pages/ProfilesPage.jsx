import axios from 'axios';
import React, { useEffect, useState } from 'react';
import "../css/ProfilesPage.css";
import ListProfiles from '../components/ListProfiles.jsx';
import ProfilePage from './ProfilePage.jsx';
import ProfileFilter from '../components/ProfileFilter.jsx';

const ProfilesPage = ({ userCur, onSelect }) => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [allUsers, setAllUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const res = await axios.get('http://localhost:8000/api/users/getAll');
      const filtered = res.data.filter(user => user.username !== userCur.username);
      setUsers(filtered);
      setAllUsers(filtered);
    } catch (err) {
      console.error('Erreur lors du chargement des utilisateurs:', err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (user) => {
    try {
      await axios.delete('http://localhost:8000/api/users/delete', {
        data: { username: user.username }
      });
      fetchUsers();
    } catch (err) {
      console.error('Erreur lors de la suppression:', err);
    }
  };

  const handlePromotion = async (user) => {
    try {
      await axios.patch('http://localhost:8000/api/users/promote', {
        username: user.username,
        isAdmin: !user.isAdmin
      });
      fetchUsers();
    } catch (err) {
      console.error('Erreur lors de la promotion:', err);
    }
  };

  const handleDemotion = async (user) => {
    try {
      await axios.patch('http://localhost:8000/api/users/demote', {
        username: user.username,
        isAdmin: !user.isAdmin
      });
      fetchUsers();
    } catch (err) {
      console.error('Erreur lors de la demotion:', err);
    }
  };

  const handleValidation = async (user) => {
    try {
      await axios.patch('http://localhost:8000/api/users/approve', {
        username: user.username,
        isAdmin: !user.isAdmin
      });
      fetchUsers();
    } catch (err) {
      console.error('Erreur lors de la validation:', err);
    }
  };

  const handleFilter = (filtered) => {
    setUsers(filtered);
  };

  if (selectedUser) {
    return <ProfilePage user={selectedUser} userCur={userCur} />;
  }

  return (
    <div className="profiles-page">
      <h2>Résultats ({users.length})</h2>
      <div className="underline-black"></div>

      <div className="profiles-list">
        {users.length === 0 ? (
          <p>Aucun utilisateur trouvé.</p>
        ) : (
          <ListProfiles
            users={users}
            userCur={userCur}
            onSelect={onSelect}
            onDelete={handleDelete}
            onPromote={handlePromotion}
            onDemote={handleDemotion}
            onValidate={handleValidation}
          />
        )}
      </div>

      <div className="underline-black"></div>

      <ProfileFilter users={allUsers} onFilter={handleFilter} userCur={userCur}/>
    </div>
  );
};

export default ProfilesPage;