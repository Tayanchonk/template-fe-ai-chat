// LocalStorage implementation of UserRepository

import type { User, AuthCredentials, AuthResponse } from '../../domain/entities';
import type { UserRepository } from '../../domain/repositories';

export class LocalStorageUserRepository implements UserRepository {
  private readonly USER_KEY = 'chatapp_user';
  private readonly MOCK_USERS = [
    { id: '1', username: 'demo', email: 'demo@example.com', password: 'demo123' },
    { id: '2', username: 'admin', email: 'admin@example.com', password: 'admin123' },
  ];

  async authenticate(credentials: AuthCredentials): Promise<AuthResponse> {
    // Simulate network delay
    await this.delay(500);

    const mockUser = this.MOCK_USERS.find(
      user => user.username === credentials.username && user.password === credentials.password
    );

    if (!mockUser) {
      throw new Error('Invalid credentials');
    }

    const user: User = {
      id: mockUser.id,
      username: mockUser.username,
      email: mockUser.email,
      isAuthenticated: true,
    };

    await this.saveUser(user);

    return {
      user,
      token: `mock_token_${user.id}`,
    };
  }

  async logout(): Promise<void> {
    localStorage.removeItem(this.USER_KEY);
  }

  async getCurrentUser(): Promise<User | null> {
    const userData = localStorage.getItem(this.USER_KEY);
    if (!userData) return null;

    try {
      return JSON.parse(userData) as User;
    } catch {
      return null;
    }
  }

  async saveUser(user: User): Promise<void> {
    localStorage.setItem(this.USER_KEY, JSON.stringify(user));
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}