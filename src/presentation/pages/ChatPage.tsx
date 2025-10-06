// Chat page component with layout

import React from 'react';
import { ChatSidebar } from '../components/ChatSidebar';
import { ChatMessages } from '../components/ChatMessages';
import { ChatInput } from '../components/ChatInput';
import { ChatHeader } from '../components/ChatHeader';
import { useChatContext } from '../contexts';
import './ChatPage.css';

export const ChatPage: React.FC = () => {
  const { currentChat, loading } = useChatContext();

  return (
    <div className="chat-page">
      <ChatSidebar />
      <div className="chat-main">
        <ChatHeader />
        <div className="chat-content">
          {currentChat ? (
            <>
              <ChatMessages />
              <ChatInput />
            </>
          ) : (
            <div className="welcome-screen">
              <div className="welcome-content">
                <h2>Welcome to AI Chat Assistant</h2>
                <p>Start a new conversation or select an existing chat from the sidebar.</p>
                {loading && <p>Loading chat history...</p>}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};