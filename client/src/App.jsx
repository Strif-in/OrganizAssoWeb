import './App.css';
import React from 'react';
import WelcomePage from './components/WelcomePage.jsx';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Waiting from './components/WaitingPage.jsx';
// Import the WelcomePage component
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<WelcomePage />} />
                <Route path="/signin" element={<SignIn />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/waiting" element={<Waiting />} />
            </Routes>
        </Router>
   );
  }
  
  export default App;