import ListMessages from '../components/ListMessages';
import '../css/UserProfile.css'
import React from 'react';
 
function ProfilePage({messages,user, userCur,onDelete}) {
  const my_messages = messages.filter(msg => msg.userId === user.userId)
 
  return (
    <>
      <div className="user-profile">  
        <main className="main-content"> 
          <div className="user-info">
            <div className="logo">
              <img src="/logo.png" alt="Company Logo" />
            </div>    
            <h2>{user.username}</h2>
            <p><strong>Login:</strong> {user.userStatus}</p>
          </div>
        </main>
        <ListMessages users={[user]} messages={my_messages} userCur={userCur} onDelete={onDelete} showReply={false}/>
      </div>
    </>
  );
 };
 
 export default ProfilePage;