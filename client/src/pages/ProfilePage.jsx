import ListMessages from '../components/ListMessages';
import '../css/ProfilePage.css'
import React from 'react';
 
function ProfilePage({messages,user, userCur,onDelete}) {
  const my_messages = messages.filter(msg => msg.userId === user.userId)
 
  return (
    <>
      <div className="profile-page">  
        <main className="main-content"> 
          <div className="user-info">
            <div className="logo">
              <img src="/logo.png" alt="Company Logo" />
            </div>    
            
            <h2>{user.username}</h2>
            <p><strong>Nom :</strong> {user.nom}</p>
            <p><strong>Prenom :</strong> {user.prenom}</p>
            <p><strong>Status :</strong> {user.userStatus}</p>
            <p><strong>Email :</strong> {user.email}</p>
          </div>
          <div className="user-messages">
            <ListMessages users={[user]} messages={my_messages} userCur={userCur} onDelete={onDelete} showReply={false}/>
          </div>
        </main>
        
      </div>
    </>
  );
 };
 
 export default ProfilePage;