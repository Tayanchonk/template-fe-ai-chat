# AI Chat Assistant

A ChatGPT-like web application built with React, TypeScript, and Vite following Clean Architecture principles.

## Features

- 🔐 **Authentication System**: Login/logout functionality with mock authentication
- 💬 **Chat Interface**: Real-time chat interface with AI assistant simulation
- 📚 **Chat History**: Persistent chat history stored in localStorage
- 🎨 **Modern UI**: Responsive design with dark/light mode support
- 🏗️ **Clean Architecture**: Well-structured codebase following clean architecture principles
- 📱 **Mobile Responsive**: Works seamlessly on desktop and mobile devices

## Demo Credentials

- **Username:** `demo` | **Password:** `demo123`
- **Username:** `admin` | **Password:** `admin123`

## Tech Stack

- **Frontend:** React 19 with TypeScript
- **Build Tool:** Vite 7
- **Routing:** React Router DOM
- **State Management:** React Context API with custom hooks
- **Styling:** CSS3 with modern features
- **Architecture:** Clean Architecture pattern

## Project Structure

```
src/
├── domain/                    # Business logic layer
│   ├── entities/             # Business entities and types
│   ├── repositories/         # Repository interfaces
│   └── usecases/            # Business use cases
├── infrastructure/           # External dependencies layer
│   ├── repositories/        # Repository implementations
│   └── services/           # External service adapters
├── application/             # Application service layer
│   ├── hooks/              # Custom React hooks
│   └── services/           # Application services
├── presentation/            # UI layer
│   ├── components/         # React components
│   ├── pages/             # Page components
│   └── contexts/          # React contexts
└── shared/                  # Shared utilities
    ├── types/              # TypeScript type definitions
    └── utils/             # Utility functions
```

## Clean Architecture Principles

This project follows Clean Architecture principles:

1. **Dependency Inversion**: High-level modules don't depend on low-level modules
2. **Separation of Concerns**: Each layer has a single responsibility
3. **Independence**: Business logic is independent of frameworks and UI
4. **Testability**: Easy to test due to clear separation

### Architecture Layers

- **Domain Layer**: Contains business entities, repository interfaces, and use cases
- **Infrastructure Layer**: Implements repository interfaces with concrete implementations
- **Application Layer**: Coordinates between domain and presentation layers
- **Presentation Layer**: React components and UI logic

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd template-fe-ai-chat
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Usage

1. **Login**: Use one of the demo credentials to log in
2. **Create Chat**: Click "+ New Chat" to start a new conversation
3. **Send Messages**: Type your message and press Enter to send
4. **Browse History**: Click on previous chats in the sidebar to view history
5. **Logout**: Click the "Logout" button to sign out

## Architecture Details

### Domain Layer

- **Entities**: Define core business objects (User, Chat, Message)
- **Repository Interfaces**: Define contracts for data access
- **Use Cases**: Implement business logic (LoginUseCase, SendMessageUseCase, etc.)

### Infrastructure Layer

- **LocalStorageUserRepository**: Handles user authentication and storage
- **LocalStorageChatRepository**: Manages chat data persistence

### Application Layer

- **AppService**: Coordinates use cases with infrastructure
- **Custom Hooks**: Provide React-specific business logic (useAuth, useChat)

### Presentation Layer

- **Pages**: Main application screens (LoginPage, ChatPage)
- **Components**: Reusable UI components (ChatSidebar, ChatMessages, etc.)
- **Contexts**: Global state management

## Features in Detail

### Authentication
- Mock authentication system with predefined users
- Persistent login state using localStorage
- Protected routes that redirect unauthenticated users

### Chat System
- Real-time message display with user and AI messages
- Message timestamps and sender identification
- Auto-scrolling to latest messages
- Mock AI responses for demonstration

### Chat History
- Automatic chat title generation from first user message
- Persistent storage across browser sessions
- Chat selection and switching
- Chronological ordering of chats

### UI/UX
- Professional gradient design
- Responsive layout for all screen sizes
- Loading states and error handling
- Keyboard shortcuts (Enter to send, Shift+Enter for new line)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes following the existing architecture
4. Run tests and linting
5. Submit a pull request

## License

MIT License - see LICENSE file for details
