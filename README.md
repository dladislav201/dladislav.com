# dladislav.com Monorepo

[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![CI](https://github.com/dladislav201/dladislav.com/actions/workflows/ci.yml/badge.svg)](https://github.com/dladislav201/dladislav.com/actions/workflows/ci.yml)
[![Vercel Deployment](https://img.shields.io/github/deployments/dladislav201/dladislav.com/production?label=vercel&logo=vercel)](https://dladislav.com)

> Personal portfolio website with AI integration.

[Live Website](https://dladislav.com)

![Website Screenshot](web/public/landing-page-screenshot.png)

## Project Structure

```
dladislav.com/
├── web/ # Next.js frontend
├── server/ # Node.js backend
├── LICENSE
└── README.md
```

## Tech Stack

#### Frontend

- [Next.js](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)

#### Backend

- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [OpenAI API Integration](https://platform.openai.com/docs/api-reference)
- [Pinecone](https://www.pinecone.io/)
- [Jest](https://jestjs.io/)

## Workspaces

- `web/`: Frontend portfolio website
- `server/`: Backend API and services

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
cd dladislav.com
```

2. Install dependencies

```bash
npm install
```

3. Set Up Environment Variables

Create `.env` files for `server/` directory based on the provided `.env.example` templates.

4. Run the Application in Development Mode

```bash
npm run dev
```

5. The website will be available in your browser at [http://localhost:3000](http://localhost:3000)

## Available Scripts

- `npm run build` - Build all projects
- `npm run test` - Run all tests
- `npm run dev` - Run web/ and server/ simultaneously in development mode

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

**Vladyslav Dobrodii**
[dobrodii.vlad200@gmail.com](mailto:dobrodii.vlad200@gmail.com)
[LinkedIn](https://www.linkedin.com/in/vladyslav-dobrodii-20384a233/)
[GitHub Repository](https://github.com/dladislav201/dladislav.com)
