import './css/App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

import ListMessages from './components/ListMessages.jsx';
import WelcomePage from './pages/WelcomePage.jsx';
import SignIn from './pages/SignIn.jsx';
import SignUp from './pages/SignUp.jsx';
import Waiting from './pages/WaitingPage.jsx';
// Import the WelcomePage component
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
    const [messages, setMessages] = useState([
    {
        messageId: 'm1',
        userId: 'u1',
        contenu: 'Bienvenue sur le forum !',
        date: '2025-04-01T12:00:00Z',
        replyMesId: null,
        forumId: 'general',
        user: {
            username: 'strif',
            nom: 'Defina',
            prénom: 'Stefano'
        }
    },
    {
        messageId: 'm2',
        userId: 'u2',
        contenu: 'Merci ! Heureux d’être ici.',
        date: '2025-04-01T12:10:00Z',
        replyMesId: 'm1',
        forumId: 'general',
        user: {
            username: 'melissa42',
            nom: 'Setbel',
            prénom: 'Melissa'
        }
    }
    ]);

    const [userCur, setUserCur] = useState({
        userId: '1234',
        username: 'testUser',
        userStatus: 'admin'
    });

    useEffect(() => {
        axios.get('http://localhost:8000/message')
        .then(res => setMessages(res.data))
        .catch(err => console.error(err));
    }, []);

    const handleDeleteMessage = (messageToDelete) => {
        
        setMessages(prevMessages =>
          prevMessages.filter(msg => msg.messageId !== messageToDelete.messageId)
        );
      };
      

    return (
        <div>
            <ListMessages messages={messages} userCur={userCur} onDelete={handleDeleteMessage}/>
        </div>
        
        /*<Router>
            <Routes>
                <Route path="/" element={<WelcomePage />} />
                <Route path="/signin" element={<SignIn />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/waiting" element={<Waiting />} />
            </Routes>
        </Router>
        */
   );
  }
  
  export default App;