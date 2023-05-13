import React, { useState } from 'react';
import { FaUserCircle } from 'react-icons/fa'; 
import Nav from './nav'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');

  // user login
  function handleLogin() {
    setIsLoggedIn(true);
    setUserName(''); 
  }

  // Function to handle user logout
  function handleLogout() {
    setIsLoggedIn(false);
    setUserName('');
  }

  return (
    <div>
      <div>
        <Nav />
        {isLoggedIn ? (
          <div className='flex items-center'>
            <FaUserCircle className='mr-2 text-xl' /> {/* user icon */}
            <span className='mr-2'>Hello {userName}</span> {/* user's name */}
            <button onClick={handleLogout}>Logout</button>
          </div>
        ) : (
          <div>
            <button onClick={handleLogin}>Login</button>
            <button>Sign up</button>
          </div>
        )}
      
      </div>
    </div>
  );
}

export default App;
