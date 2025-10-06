// Chat header with user info and logout

import React from 'react';
import { useAuthContext } from '../contexts';
import './ChatHeader.css';

export const ChatHeader: React.FC = () => {
  const { user, logout } = useAuthContext();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <header className="chat-header">
      <div className="header-content">
        <div className="header-title">
          <h1>AI Chat Assistant</h1>
        </div>
        <div className="header-user">
          <span className="user-info">
            Welcome, {user?.username}!
          </span>
          <button 
            onClick={handleLogout}
            className="logout-button"
            title="Logout"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};