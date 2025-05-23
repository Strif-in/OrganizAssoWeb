import React, { useState, useEffect } from 'react';
import WelcomePage from './pages/WelcomePage';
import UserPage from './pages/UserPage';
  
function App() {
    const [isConnected, setIsConnected] = useState(false);
    const [userCur, setUserCur] = useState();

    const handleLogin = (user) => {
      setUserCur(user);
      setIsConnected(true);
      
    };

    const handleLogout = () => {
        setUserCur(null);
        setIsConnected(false);
    };

    return (
      <>
        <div className="App">
            {!isConnected ? (
                <WelcomePage
                getConnected={handleLogin}
                userCur={userCur}
                />
            ) : (
                <UserPage
                userCur={userCur}
                logout={handleLogout}
                />
            )}
        </div>
      </>
    );
  }
  
  export default App;