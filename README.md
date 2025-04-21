# dladislav.com Monorepo

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![CI](https://github.com/dladislav201/dladislav.com/actions/workflows/ci.yml/badge.svg)](https://github.com/dladislav201/dladislav.com/actions/workflows/ci.yml)
[![Vercel Deployment](https://img.shields.io/github/deployments/dladislav201/dladislav.com/production?label=vercel&logo=vercel)](https://dladislav.com)

> Personal portfolio website monorepo.

[Live Website](https://dladislav.com)

![Website Screenshot](public/landing-page-screenshot.png)

## Project Structure

dladislav.com/
├── web/ # Next.js frontend
├── server/ # Node.js backend
├── LICENSE
└── README.md

## Tech Stack

#### Frontend

- [Next.js](https://nextjs.org/) - React framework with SSG/SSR
- [TypeScript](https://www.typescriptlang.org/) - Type safety and better developer experience
- [Framer Motion](https://www.framer.com/motion/) - Animations and transitions
- [React Icons](https://react-icons.github.io/react-icons/) - Icon library
- [Jest](https://jestjs.io/) - Testing

#### Backend

- [Node.js] - JavaScript runtime for server-side development
- [Express] - Minimal and flexible web application framework
- [TypeScript] - Type safety for server-side code
<!-- - [OpenAI] - AI integration for intelligent features -->

## Workspaces

- `web/`: Frontend portfolio website
- `server/`: Backend API and services

## Getting Started

### Prerequisites

- Node.js (version 18 or later)
- npm

### Installation

1. Clone the repository

   ```bash
   git clone https://github.com/dladislav201/dladislav.com.git
   cd dladislav.com
   ```

2. Install dependencies

   ```bash
   npm install
   # or
   yarn
   ```

## Available Scripts

- `npm run dev:web` - Start frontend development server
- `npm run dev:server` - Start backend development server
- `npm run build` - Build all projects
- `npm run test` - Run all tests

## CI/CD

This portfolio uses GitHub Actions for continuous integration and deployment:

- **CI**: Validates code quality on push and pull requests
- **CD**: Automatically deploys after a successful merge to main branch
  - Frontend deployment on Vercel
  - Backend deployment on Railway

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

Vladyslav Dobrodii - [dobrodii.vlad200@gmail.com](mailto:dobrodii.vlad200@gmail.com)
Project Link: [https://github.com/dladislav201/dladislav.com](https://github.com/dladislav201/dladislav.com)

## Acknowledgements

- [Next.js Documentation](https://nextjs.org/docs)
- [Vercel](https://vercel.com) for hosting
