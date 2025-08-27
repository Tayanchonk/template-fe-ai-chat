// Shared types used across the application

export interface User {
  id: string;
  username: string;
  email: string;
  isAuthenticated: boolean;
}

export interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
}

export interface Chat {
  id: string;
  title: string;
  messages: Message[];
  createdAt: Date;
  updatedAt: Date;
}

export interface AuthCredentials {
  username: string;
  password: string;
}

export interface AuthResponse {
  user: User;
  token?: string;
}