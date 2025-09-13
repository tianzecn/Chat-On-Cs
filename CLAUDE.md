# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

ChatGPT-On-CS is an intelligent customer service SaaS platform designed for e-commerce platforms. It's built as an Electron desktop application using React + TypeScript on the frontend and Node.js/Express on the backend, with AI integration for automated customer service across multiple platforms (WeChat, Taobao, JD, Douyin, etc.).

## Architecture

### Core Structure
- **Frontend**: React + TypeScript + Chakra UI (in `src/renderer/`)
- **Backend**: Node.js + Express + Socket.IO + Sequelize ORM (in `src/main/backend/`)
- **Main Process**: Electron main process (in `src/main/`)
- **AI Proxy**: Multi-provider AI service integration (in `src/main/gptproxy/`)
- **Build System**: Electron React Boilerplate (ERB) with Webpack

### Key Components

#### Backend Services (`src/main/backend/`)
- **MessageService**: Handles customer message processing and AI responses
- **DispatchService**: Manages platform-specific message routing and WebSocket communication
- **PluginService**: Executes custom JavaScript plugins for message processing
- **ConfigController**: Manages platform configurations and settings
- **KeywordReplyController**: Handles automated keyword-based replies

#### AI Integration (`src/main/gptproxy/`)
Modular proxy system supporting multiple AI providers:
- OpenAI GPT-3.5/4
- Baidu Ernie
- Google Gemini
- Tencent Hunyuan
- Dify platform integration

#### Database Schema
Uses Sequelize ORM with entities for:
- Messages and sessions
- Platform configurations
- Keyword replies and transfer rules
- Custom plugins
- Replacement rules

## Development Commands

### Build & Run
```bash
# Install dependencies
pnpm install

# Development server
pnpm start                    # Start renderer process
pnpm run start:main          # Start main process separately

# Production build
pnpm run build               # Build both main and renderer
pnpm run build:main          # Build main process only
pnpm run build:renderer      # Build renderer process only

# Package application
pnpm run package             # Create distributable package
```

### Development Tools
```bash
# Linting
pnpm run lint                # ESLint check

# Testing
pnpm test                    # Run Jest tests
```

### Database Development
The application uses SQLite with Sequelize ORM. Database initialization happens automatically on first run through the backend service manager.

## Platform Integration Architecture

The system uses a three-layer approach for platform integration:

1. **Platform Detection**: Automatic detection of running e-commerce platforms
2. **Message Interception**: Browser-based message capture through WebSocket communication
3. **Response Injection**: Automated response delivery back to platform chat interfaces

### WebSocket Communication
- Server runs on dynamically assigned port (managed by BackendServiceManager)
- Real-time bidirectional communication between frontend and platform integrations
- Socket.IO with connection state recovery for reliability

## Plugin System

Supports custom JavaScript plugins for message processing:
- Sandboxed execution environment
- Context access (user info, message history, platform data)
- Real-time testing capabilities through `/api/v1/base/plugin/check`

## Configuration Management

Multi-level configuration system:
- Global settings
- Platform-specific configurations  
- Instance-level customization (for multi-account support)
- Runtime configuration sync via `/api/v1/base/sync`

## External Backend Service

The application integrates with an external Python backend service:
- Managed by `BackendServiceManager` in `src/main/system/backend/`
- Handles platform-specific automation and browser control
- Communication via process spawning and port-based API calls

## File Organization Notes

- Webpack configs are in `./.erb/configs/`
- Asset files are in `./assets/`
- Release builds go to `./release/`
- Test files should be placed in `./src/__tests__/`
- All source code follows TypeScript strict mode

## Important Considerations

- The app requires administrator privileges on Windows for platform integration
- Database files are stored in user data directory (managed by Electron)
- Platform integration relies on browser automation and DOM manipulation
- AI API keys and sensitive configs are stored in encrypted local storage