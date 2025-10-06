// Use cases (business logic) following Single Responsibility Principle

import type { User, Chat, Message, AuthCredentials, AuthResponse } from '../entities';
import type { UserRepository, ChatRepository } from '../repositories';

export class LoginUseCase {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async execute(credentials: AuthCredentials): Promise<AuthResponse> {
    return await this.userRepository.authenticate(credentials);
  }
}

export class LogoutUseCase {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async execute(): Promise<void> {
    await this.userRepository.logout();
  }
}

export class GetCurrentUserUseCase {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async execute(): Promise<User | null> {
    return await this.userRepository.getCurrentUser();
  }
}

export class GetChatHistoryUseCase {
  private chatRepository: ChatRepository;

  constructor(chatRepository: ChatRepository) {
    this.chatRepository = chatRepository;
  }

  async execute(): Promise<Chat[]> {
    return await this.chatRepository.getAllChats();
  }
}

export class SendMessageUseCase {
  private chatRepository: ChatRepository;

  constructor(chatRepository: ChatRepository) {
    this.chatRepository = chatRepository;
  }

  async execute(chatId: string, userMessage: string): Promise<Message[]> {
    // Create user message
    const userMsg: Message = {
      id: crypto.randomUUID(),
      content: userMessage,
      role: 'user',
      timestamp: new Date(),
    };

    // Add user message to chat
    await this.chatRepository.addMessageToChat(chatId, userMsg);

    // Simulate AI response (in real app, this would call an AI service)
    const aiResponse: Message = {
      id: crypto.randomUUID(),
      content: this.generateMockResponse(userMessage),
      role: 'assistant',
      timestamp: new Date(),
    };

    // Add AI response to chat
    await this.chatRepository.addMessageToChat(chatId, aiResponse);

    return [userMsg, aiResponse];
  }

  private generateMockResponse(userMessage: string): string {
    // Simple mock response generator
    const responses = [
      `I understand you're asking about: "${userMessage}". That's a great question!`,
      `Thank you for your message about "${userMessage}". Let me help you with that.`,
      `Regarding "${userMessage}", here's what I think...`,
      `That's an interesting point about "${userMessage}". Let me elaborate.`,
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  }
}

export class CreateChatUseCase {
  private chatRepository: ChatRepository;

  constructor(chatRepository: ChatRepository) {
    this.chatRepository = chatRepository;
  }

  async execute(title?: string): Promise<Chat> {
    const newChat: Chat = {
      id: crypto.randomUUID(),
      title: title || 'New Chat',
      messages: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await this.chatRepository.saveChat(newChat);
    return newChat;
  }
}