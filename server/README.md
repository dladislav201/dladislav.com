# AI Assistant Backend

> Backend service for a personal portfolio AI assistant that answers questions about Vladyslav Dobrodii's professional experience and skills using OpenAI API and vector search.

## Tech Stack

- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [OpenAI API Integration](https://platform.openai.com/docs/api-reference)
- [Pinecone](https://www.pinecone.io/)
- [Jest](https://jestjs.io/)

## Setup

### Prerequisites

- Node.js 18+
- npm or yarn
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
# or
yarn
```

3. Create a `.env` file in the root directory with the following variables:

```
PORT=3001
NODE_ENV=development
OPENAI_API_KEY=your_openai_key_here
PINECONE_API_KEY=your_pinecone_key_here
PINECONE_INDEX_NAME=portfolio-knowledge  # Optional
```

4. Seed the knowledge base:

```bash
npm run seed
```

### Development

Run the development server:

```bash
npm run dev
```

### Build

Compile TypeScript to JavaScript:

```bash
npm run build
```

### Testing

Run tests:

```bash
npm test                # Run all tests
npm run test:integration # Run integration tests only
```

## API Endpoints

### AI Chat Endpoint

```
POST /api/ai/chat
```

**Request Body:**

json

```json
{
  "message": "What technologies does Vladyslav know?"
}
```

**Response:**

json

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

## Project Structure

```
server/
├── src/
│   ├── config/         # Environment configuration
│   ├── controllers/    # Request handlers
│   ├── data/           # Personal information data
│   ├── routes/         # API routes
│   ├── services/       # Business logic
│   ├── scripts/        # Utility scripts
│   ├── __tests__/      # Test files
│   └── index.ts        # Entry point
├── jest.config.js      # Jest configuration
├── .env                # Environment variables
├── tsconfig.json       # TypeScript configuration
└── package.json        # Dependencies and scripts
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

## Security Measures

- Helmet for secure HTTP headers
- CORS configuration
- Rate limiting
- Request size limits
- Timeout handling
- Input validation
