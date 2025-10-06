// Application service that coordinates use cases with infrastructure

import {
  LoginUseCase,
  LogoutUseCase,
  GetCurrentUserUseCase,
  GetChatHistoryUseCase,
  SendMessageUseCase,
  CreateChatUseCase,
} from '../../domain/usecases';
import {
  LocalStorageUserRepository,
  LocalStorageChatRepository,
} from '../../infrastructure/repositories';

export class AppService {
  private userRepository = new LocalStorageUserRepository();
  private chatRepository = new LocalStorageChatRepository();

  // Use cases
  public loginUseCase = new LoginUseCase(this.userRepository);
  public logoutUseCase = new LogoutUseCase(this.userRepository);
  public getCurrentUserUseCase = new GetCurrentUserUseCase(this.userRepository);
  public getChatHistoryUseCase = new GetChatHistoryUseCase(this.chatRepository);
  public sendMessageUseCase = new SendMessageUseCase(this.chatRepository);
  public createChatUseCase = new CreateChatUseCase(this.chatRepository);
}

// Singleton instance
export const appService = new AppService();