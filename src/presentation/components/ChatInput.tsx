// Chat input component for sending messages

import React, { useState } from 'react';
import { useChatContext } from '../contexts';
import './ChatInput.css';

export const ChatInput: React.FC = () => {
  const [message, setMessage] = useState('');
  const { sendMessage, sending, currentChat, createNewChat } = useChatContext();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || sending) return;

    const messageToSend = message.trim();
    setMessage('');

    try {
      // If no current chat, create one first
      if (!currentChat) {
        await createNewChat();
      }
      
      await sendMessage(messageToSend);
    } catch (err) {
      console.error('Failed to send message:', err);
      // Restore message if sending failed
      setMessage(messageToSend);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="chat-input">
      <form onSubmit={handleSubmit} className="input-form">
        <div className="input-container">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={sending ? 'Sending...' : 'Type your message here...'}
            disabled={sending}
            rows={1}
            className="message-input"
            autoFocus
          />
          <button
            type="submit"
            disabled={!message.trim() || sending}
            className="send-button"
            title="Send message (Enter)"
          >
            {sending ? (
              <span className="loading-spinner">⏳</span>
            ) : (
              <span className="send-icon">→</span>
            )}
          </button>
        </div>
      </form>
      <div className="input-footer">
        <span className="input-hint">
          Press Enter to send, Shift+Enter for new line
        </span>
      </div>
    </div>
  );
};