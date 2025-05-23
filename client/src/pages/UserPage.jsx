import React, {useEffect, useState } from 'react';
import NavBar from '../components/NavBar';
import ForumPage from './ForumPage';
import ProfilePage from './ProfilePage';
import MessagesPage from './MessagesPage';
import ProfilesPage from './ProfilesPage';
import axios from 'axios';
import '../css/UserPage.css';

function UserPage({ userCur, logout}) {
  const [currentPage, setCurrentPage] = useState('forum');
  const [users, setUsers] = useState();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get('http://localhost:8000/api/users/getAll');
        setUsers(res.data);
      } catch (err) {
        console.error('Erreur lors du chargement des utilisateurs:', err);
      }
    };
  
    fetchUsers();
  }, []);
  

  const renderContent = () => {
    if(!users) return <p>Chargement des utilisateurs...</p>;
    switch (currentPage) {
      case 'forum':
        return <ForumPage users={users} userCur={userCur} />;
      case 'profile':
        return <ProfilePage user={userCur} userCur={userCur} />;
      case 'messages':
        return <MessagesPage users={users} userCur={userCur} />;
      case 'profiles':
        return <ProfilesPage users={users} userCur={userCur} />;
      default:
        return <p>UserPage Default</p>;
    }
  };

  return (
    <>
      <div className="user-page">
        <header>
          <button onClick={() => setCurrentPage('profile')}>Mon Profil</button>
          <NavBar 
            setCurrentPage={setCurrentPage} 
          />
          <button onClick={logout}>Logout</button>
        </header>
        <div className="page-content">
          {renderContent()}
        </div>
      </div>
    </>
  );
}

export default UserPage;
