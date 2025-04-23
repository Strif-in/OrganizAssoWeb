import React, { useState } from 'react';
import NavBar from '../components/NavBar';
import ForumPage from './ForumPage';
import ProfilePage from './ProfilePage';
import MessagesPage from './MessagesPage';
import ProfilesPage from './ProfilesPage';
//import '../css/UserPage.css';

function UserPage({ userCur, users, messages, logout, onDelete }) {
  const [currentPage, setCurrentPage] = useState('forum');

  const renderContent = () => {
    switch (currentPage) {
      case 'forum':
        return <ForumPage messages={messages} userCur={userCur} onDelete={onDelete} />;
      case 'profile':
        return <ProfilePage user={userCur} messages={messages} userCur={userCur} />;
      case 'messages':
        return <MessagesPage messages={messages} userCur={userCur} />;
      case 'profiles':
        return <ProfilesPage users={users} userCur={userCur} />;
      default:
        return <ForumPage messages={messages} userCur={userCur} onDelete={onDelete} />;
    }
  };

  return (
    <>
      <div className="user-page">
        <NavBar 
          setCurrentPage={setCurrentPage} 
          logout={logout}
        />
        <div className="page-content">
          {renderContent()}
        </div>
      </div>
    </>
  );
}

export default UserPage;
