// Chat sidebar with chat history

import React from 'react';
import { useChatContext } from '../contexts';
import './ChatSidebar.css';

export const ChatSidebar: React.FC = () => {
  const { chats, currentChat, createNewChat, selectChat, loading } = useChatContext();

  const handleNewChat = async () => {
    try {
      await createNewChat();
    } catch (err) {
      console.error('Failed to create new chat:', err);
    }
  };

  const formatDate = (date: Date) => {
    const now = new Date();
    const isToday = date.toDateString() === now.toDateString();
    const isYesterday = date.toDateString() === new Date(now.getTime() - 24 * 60 * 60 * 1000).toDateString();

    if (isToday) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else if (isYesterday) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString();
    }
  };

  const sortedChats = [...chats].sort((a, b) => 
    new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
  );

  return (
    <aside className="chat-sidebar">
      <div className="sidebar-header">
        <button 
          onClick={handleNewChat}
          className="new-chat-button"
          disabled={loading}
        >
          + New Chat
        </button>
      </div>

      <div className="chat-list">
        <h3>Chat History</h3>
        {loading && chats.length === 0 ? (
          <div className="loading-message">Loading chats...</div>
        ) : chats.length === 0 ? (
          <div className="empty-message">
            No chats yet. Start a new conversation!
          </div>
        ) : (
          <div className="chat-items">
            {sortedChats.map((chat) => (
              <div
                key={chat.id}
                className={`chat-item ${currentChat?.id === chat.id ? 'active' : ''}`}
                onClick={() => selectChat(chat)}
              >
                <div className="chat-title">{chat.title}</div>
                <div className="chat-date">
                  {formatDate(new Date(chat.updatedAt))}
                </div>
                <div className="chat-preview">
                  {chat.messages.length > 0 
                    ? chat.messages[chat.messages.length - 1].content.substring(0, 50) + '...'
                    : 'No messages yet'
                  }
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </aside>
  );
};