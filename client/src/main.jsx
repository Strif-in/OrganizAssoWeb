import './css/App.css';
import React, { useState, useEffect } from 'react';
import WelcomePage from './pages/WelcomePage';
import UserPage from './pages/UserPage';
import axios from 'axios';

const m = [
    {
      messageId: 'm1',
      userId: 'u2',
      contenu: 'Bonjour à tous ! Heureux de rejoindre ce forum.',
      date: '2025-04-20T10:15:00Z',
      replyMesId: null,
      forumId: 'public'
    },
    {
      messageId: 'm2',
      userId: 'u1',
      contenu: 'Bienvenue Melissa ! N\'hésite pas à poser des questions.',
      date: '2025-04-20T10:20:00Z',
      replyMesId: 'm1',
      forumId: 'public'
    },
    {
      messageId: 'm3',
      userId: 'u3',
      contenu: 'Quelqu\'un sait quand aura lieu le prochain événement de l\'association ?',
      date: '2025-04-20T11:00:00Z',
      replyMesId: null,
      forumId: 'public'
    },
    {
      messageId: 'm4',
      userId: 'u4',
      contenu: 'Réunion prévue vendredi à 14h en salle B202.',
      date: '2025-04-20T11:30:00Z',
      replyMesId: 'm3',
      forumId: 'public'
    },
    {
      messageId: 'm5',
      userId: 'u1',
      contenu: 'Message réservé aux admins : pensez à valider les nouveaux membres.',
      date: '2025-04-20T12:00:00Z',
      replyMesId: null,
      forumId: 'admin'
    }
];  

const u = [
    {
      userId: 'u1',
      nom: 'Defina',
      prénom: 'Stefano',
      username: 'steph',
      email: 'stephano.defina@example.com',
      password: 'hashed_password_1',
      userStatus: 'admin'
    },
    {
      userId: 'u2',
      nom: 'Setbel',
      prénom: 'Melissa',
      username: 'melissa42',
      email: 'melissa.setbel@example.com',
      password: 'hashed_password_2',
      userStatus: 'pending'
    },
    {
      userId: 'u3',
      nom: 'Dubois',
      prénom: 'Chloé',
      username: 'chloe_d',
      email: 'chloe.dubois@example.com',
      password: 'hashed_password_3',
      userStatus: 'user'
    },
    {
      userId: 'u4',
      nom: 'Nguyen',
      prénom: 'Minh',
      username: 'minh.n',
      email: 'minh.nguyen@example.com',
      password: 'hashed_password_4',
      userStatus: 'admin'
    },
    {
      userId: 'u5',
      nom: 'Martinez',
      prénom: 'Lucas',
      username: 'luc_m',
      email: 'lucas.martinez@example.com',
      password: 'hashed_password_5',
      userStatus: 'user'
    }
];
  
function App() {
    const [isConnected, setIsConnected] = useState(false);
    const [userCur, setUserCur] = useState();
    const [users, setUsers] = useState();
    const [messages, setMessages] = useState();

    useEffect(() => {
        const mockUsers = u;
        const mockMessages = m;
    
        setUsers(mockUsers);
        setMessages(mockMessages);
    }, []);

    const handleLogin = (user) => {
        setUserCur(user);
        if(user.userStatus !='pending'){
            setIsConnected(true);
        }
    };

    const handleLogout = () => {
        setUserCur(null);
        setIsConnected(false);
    };

    const handleDeleteMessage = (messageToDelete) => {
        setMessages(prevMessages =>
          prevMessages.filter(msg => msg.messageId !== messageToDelete.messageId)
        );
    };

    return (
      <>
        <div className="App">
            {!isConnected ? (
                <WelcomePage
                getConnected={handleLogin}
                userCur={userCur}
                users={users}
                />
            ) : (
                <UserPage
                userCur={userCur}
                users={users}
                messages={messages}
                logout={handleLogout}
                onDelete={handleDeleteMessage}
                setMessages={setMessages}
                />
            )}
        </div>
      </>
    );
  }
  
  export default App;