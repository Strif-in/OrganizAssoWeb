import ListMessages from '../components/ListMessages';
import '../css/UserProfile.css'
import React from 'react';
 
function ProfilePage({messages,userCur,onDelete}) {
  const my_messages = messages.filter(msg => msg.userId === userCur.userId)
 
  return (
    <>
      <div className="user-profile">  
        <main className="main-content"> 
          <div className="user-info">
            <div className="logo">
              <img src="/logo.png" alt="Company Logo" />
            </div>    
            <h2>{userCur.username}</h2>
            <p><strong>Login:</strong> {userCur.userStatus}</p>
          </div>
        </main>
        <ListMessages users={[userCur]} messages={my_messages} userCur={userCur} onDelete={onDelete}/>
      </div>
    </>
  );
 };
 
 export default ProfilePage;