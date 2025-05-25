# AI Assistant Backend

> Backend service for a personal portfolio AI assistant that answers questions about Vladyslav Dobrodii's professional experience and skills using OpenAI API and Pinecone.

## Tech Stack

- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [OpenAI API Integration](https://platform.openai.com/docs/api-reference)
- [Pinecone](https://www.pinecone.io/)
- [Jest](https://jestjs.io/)

## Getting Started

### Prerequisites

- Node.js (version 18 or later)
- npm
- Docker
- OpenAI API key
- Pinecone API key (optional)

### Installation

1. Clone the repository

```bash
git clone https://github.com/dladislav201/dladislav.com.git
cd dladislav.com/server
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the root directory based on the provided `.env.example` templates.

4. Seed the knowledge base:

```bash
npm run seed
```

5. Run the Application in Development Mode

```bash
npm run dev
```

## API Endpoints

### AI Chat Endpoint

```
POST /api/ai/chat
```

**Request Body:**

```json
{
  "message": "What technologies does Vladyslav know?"
}
```

**Response:**

```json
{
  "response": "Vladyslav is proficient in JavaScript, TypeScript, React, Node.js, Python, AWS, and Docker...",
  "context": [
    {
      "text": "Technical Expertise: Frontend Technologies: JavaScript, TypeScript, React...",
      "category": "skills",
      "similarity": 0.87
    }
  ]
}
```

## Available Scripts

- `npm start` - Run the compiled JavaScript application
- `npm run dev` - Start development server with hot reloading
- `npm run build` - Compile TypeScript to JavaScript
- `npm run lint` - Run ESLint to check code quality
- `npm run lint:fix` - Automatically fix linting issues
- `npm run typecheck` - Perform TypeScript type checking
- `npm run test` - Run Jest test suite
- `npm run test:watch` - Run tests in watch mode
- `npm run test:coverage` - Generate test coverage report
- `npm run test:integration` - Run integration tests
- `npm run seed` - Seed knowledge base for AI

## Contact

**Vladyslav Dobrodii**
[dobrodii.vlad200@gmail.com](mailto:dobrodii.vlad200@gmail.com)
[LinkedIn](https://www.linkedin.com/in/vladyslav-dobrodii-20384a233/)
[GitHub Repository](https://github.com/dladislav201/dladislav.com)
