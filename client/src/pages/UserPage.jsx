import axios from 'axios';
import React, {useEffect, useState } from 'react';
import '../css/UserPage.css';
import NavBar from '../components/NavBar';
import ForumPage from './ForumPage';
import ProfilePage from './ProfilePage';
import MessagesPage from './MessagesPage';
import ProfilesPage from './ProfilesPage';


function UserPage({ userCur, logout}) {
  const [currentPage, setCurrentPage] = useState('forum');
  const [users, setUsers] = useState();
  const [selectedUser, setSelectedUser] = useState(userCur);

  const handleSelection = (user) => {
    setCurrentPage('profile');
    setSelectedUser(user)
  }

  const backtoUserCur = () => {
    setSelectedUser(userCur);
  }

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
        return <ProfilePage user={selectedUser} userCur={userCur} />;
      case 'messages':
        return <MessagesPage users={users} userCur={userCur} />;
      case 'profiles':
        return <ProfilesPage userCur={userCur} onSelect={handleSelection}/>;
      default:
        return <p>UserPage Default</p>;
    }
  };

  return (
    <>
      <div className="user-page">
        <header>
          <h2>Organiz-Asso</h2>
          <button onClick={() => {setCurrentPage('profile');backtoUserCur();}}>Mon Profil</button>
          <NavBar 
            setCurrentPage={setCurrentPage} 
            backtoUserCur={backtoUserCur}
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
