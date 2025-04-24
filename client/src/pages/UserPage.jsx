import React, { useState } from 'react';
import NavBar from '../components/NavBar';
import ForumPage from './ForumPage';
import ProfilePage from './ProfilePage';
import MessagesPage from './MessagesPage';
import ProfilesPage from './ProfilesPage';
import '../css/UserPage.css';

function UserPage({ userCur, users, messages, logout, onDelete , setMessages}) {
  const [currentPage, setCurrentPage] = useState('forum');

  const renderContent = () => {
    switch (currentPage) {
      case 'forum':
        return <ForumPage users={users} messages={messages} userCur={userCur} onDelete={onDelete} setMessages={setMessages}/>;
      case 'profile':
        return <ProfilePage user={userCur} messages={messages} userCur={userCur} />;
      case 'messages':
        return <MessagesPage users={users} messages={messages} userCur={userCur} onDelete={onDelete} />;
      case 'profiles':
        return <ProfilesPage users={users} userCur={userCur}  onDelete={onDelete}/>;
      default:
        return <ForumPage messages={messages} userCur={userCur} onDelete={onDelete} />;
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
