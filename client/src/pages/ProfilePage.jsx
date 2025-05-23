import axios from 'axios';
import React,{useEffect, useState} from 'react';
import '../css/ProfilePage.css'
import ListMessages from '../components/ListMessages';
 
function ProfilePage({user, userCur,onDelete}) {
  const [messages, setMessages] = useState([]);
  const fetchUserMessages = async () => {
    try {
      const res = await axios.post('http://localhost:8000/api/messages/getByUser', {
        username: user.username,
      });
      if (res.data?.messages) {
        setMessages(res.data.messages);
      }
    } catch (err) {
      console.error("Erreur lors du chargement des messages de l'utilisateur :", err);
    }
  };

  useEffect(() => {
    fetchUserMessages();
    setMessages(messages.filter(msg => msg.username === user.username))
  }, []);

  const handleDelete = async (message) => {
    try {
      await axios.delete('http://localhost:8000/api/messages/delete', {
        data: { msgId: message.msgId }
      });
      fetchUserMessages();
    } catch (err) {
      console.error('Erreur de suppression:', err);
    }
  };

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
            <h1>My Messages</h1>
            <div className="underline-black"></div>
            <ListMessages users={[user]} messages={messages} userCur={userCur} onDelete={handleDelete} showReply={false}/>
            <div className="underline-black"></div>
          </div>
        </main>
        
      </div>
    </>
  );
 };
 
 export default ProfilePage;