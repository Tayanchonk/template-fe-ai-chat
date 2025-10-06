// Chat messages display component

import React, { useEffect, useRef } from 'react';
import { useChatContext } from '../contexts';
import type { Message } from '../../shared/types';
import './ChatMessages.css';

export const ChatMessages: React.FC = () => {
  const { currentChat } = useChatContext();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [currentChat?.messages]);

  if (!currentChat) {
    return null;
  }

  const formatTimestamp = (timestamp: Date) => {
    return new Date(timestamp).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <div className="chat-messages">
      <div className="messages-container">
        {currentChat.messages.length === 0 ? (
          <div className="empty-chat">
            <div className="empty-chat-content">
              <h3>Start a conversation</h3>
              <p>Type a message below to begin chatting with the AI assistant.</p>
            </div>
          </div>
        ) : (
          <div className="messages-list">
            {currentChat.messages.map((message) => (
              <MessageBubble
                key={message.id}
                message={message}
                timestamp={formatTimestamp(message.timestamp)}
              />
            ))}
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};

interface MessageBubbleProps {
  message: Message;
  timestamp: string;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message, timestamp }) => {
  const isUser = message.role === 'user';

  return (
    <div className={`message-bubble ${isUser ? 'user' : 'assistant'}`}>
      <div className="message-header">
        <span className="message-sender">
          {isUser ? 'You' : 'AI Assistant'}
        </span>
        <span className="message-timestamp">{timestamp}</span>
      </div>
      <div className="message-content">
        {message.content}
      </div>
    </div>
  );
};