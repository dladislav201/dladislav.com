# Web Frontend

> Frontend for the personal portfolio website, built with Next.js and TypeScript.

## Tech Stack

- [Next.js](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)

## Directory Structure

```
src/
├── app/                          # Application core and routing
│   ├── layout.tsx                # Root layout component
│   ├── not-found.tsx             # 404 error page
│   └── page.tsx                  # Home page component
├── entities/                     # Business entities and data models
│   └── chat/
│       ├── model/                # Chat data models and types
│       └── index.ts              # Entity exports
├── features/                     # Feature-specific modules
│   ├── chat/                     # Chat functionality
│   │   ├── api/                  # Chat API integration
│   │   ├── hooks/                # Custom React hooks for chat
│   │   ├── model/                # Chat business logic and state
│   │   │   ├── chatSelectors.ts  # State selectors
│   │   │   ├── chatSlice.ts      # Redux slice/state management
│   │   │   └── chatThunk.ts      # Async actions and thunks
│   │   ├── ui/                   # Chat UI components
│   │   └── index.ts              # Feature exports
│   └── notFound/                 # 404 page specific components
├── shared/                       # Shared utilities and components
│   ├── api/                      # Shared API utilities
│   ├── config/                   # Application configuration
│   ├── constants/                # Application constants
│   ├── hooks/                    # Shared React hooks
│   ├── styles/                   # Global styles and themes
│   └── ui/                       # Shared UI components
└── widgets/                      # Reusable widget components
    ├── globalNav/                # Global navigation widget
    ├── hero/                     # Hero section widget
    ├── home/                     # Home page specific widgets
    └── terminal/                 # Terminal/console widget
```

## Architecture Pattern

Project follows the **Feature-Sliced Design (FSD)** architecture pattern, which provides:

- **Clear separation of concerns** between different layers
- **Scalable structure** that grows with the application
- **Reusable components** and utilities
- **Maintainable codebase** with predictable organization

### Layer Breakdown

#### App Layer

Contains application-wide configuration, routing, and layout components.

- `layout.tsx` - Root application layout
- `page.tsx` - Home page component
- `not-found.tsx` - 404 error handling

#### Entities Layer

Business entities that represent core domain objects.

- `chat/` - Chat entity with models and types

#### Features Layer

Self-contained features that implement specific business functionality.

- `chat/` - Complete chat functionality including:
  - API integration
  - Custom hooks
  - State management (Redux/Zustand)
  - UI components

#### Shared Layer

Reusable code shared across the entire application.

- `api/` - HTTP clients and API utilities
- `config/` - Environment and app configuration
- `constants/` - Application-wide constants
- `hooks/` - Reusable React hooks
- `styles/` - Global CSS, themes, and style utilities
- `ui/` - Reusable UI components

#### Widgets Layer

Complex, self-contained components that combine multiple UI elements into functional sections.

- `globalNav/` - Application-wide navigation component
- `hero/` - Landing page hero sections
- `home/` - Home page specific widget components
- `terminal/` - Terminal/console interface widgets
- `widgets/` - Complex reusable widget components

## Development Guidelines

### File Naming Conventions

- **Components**: PascalCase (e.g., `ChatMessage.tsx`)
- **Hooks**: camelCase starting with "use" (e.g., `useChatHistory.ts`)
- **Utilities**: camelCase (e.g., `formatMessage.ts`)
- **Constants**: SCREAMING_SNAKE_CASE (e.g., `API_ENDPOINTS.ts`)

### Import Organization

```typescript
// External libraries
import React from 'react';
import { useSelector } from 'react-redux';

// Internal imports (from shared)
import { Button } from '@/shared/ui';
import { useApiClient } from '@/shared/hooks';

// Feature imports
import { useChatHistory } from '@/features/chat';

// Relative imports
import './styles.css';
```

### State Management

The application uses Redux Toolkit for state management:

- **Slices**: Define state structure and reducers
- **Thunks**: Handle async operations
- **Selectors**: Extract specific data from state

## Getting Started

### Prerequisites

- Node.js (version 18 or later)
- npm

1. Clone the repository

```bash
git clone https://github.com/dladislav201/dladislav.com.git
cd dladislav.com/web
```

2. Install dependencies

```bash
npm install
```

3. Run the Application in Development Mode

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Available Scripts

- `npm run dev` - Starts the development server
- `npm run build` - Builds the site for production
- `npm run start` - Runs the built site in production mode
- `npm run lint` - Lints the code with ESLint
- `npm run lint:fix` - Automatically fix linting issues
- `npm run typecheck` - Checks TypeScript types without emitting files

## Contact

**Vladyslav Dobrodii**
[dobrodii.vlad200@gmail.com](mailto:dobrodii.vlad200@gmail.com)
[LinkedIn](https://www.linkedin.com/in/vladyslav-dobrodii-20384a233/)
[GitHub Repository](https://github.com/dladislav201/dladislav.com)
