# Personal Portfolio Website

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![CI](https://github.com/dladislav201/dladislav.com/actions/workflows/ci.yml/badge.svg)](https://github.com/dladislav201/dladislav.com/actions/workflows/ci.yml)
[![Vercel Deployment](https://img.shields.io/github/deployments/dladislav201/dladislav.com/production?label=vercel&logo=vercel)](https://dladislav.com)

> Portfolio website built with Next.js.

[Live Website](https://dladislav.com)

![Portfolio Screenshot](public/landing-page-screenshot.png)

## Tech Stack

- [Next.js](https://nextjs.org/) - React framework with SSG/SSR
- [TypeScript](https://www.typescriptlang.org/) - Type safety and better developer experience
- [Framer Motion](https://www.framer.com/motion/) - Animations and transitions
- [React Icons](https://react-icons.github.io/react-icons/) - Icon library
- [Jest](https://jestjs.io/) - Testing

## Getting Started

### Prerequisites

- Node.js (version 16 or later)
- npm or yarn

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

3. Run the development server

   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
├── public/              # Static files and images
├── src/
│   ├── app/             # Next.js app router
│   │   ├── styles/      # Global styles
│   │   ├── layout.tsx   # Root layout
│   │   └── page.tsx     # Home page
│   └── components/      # Reusable UI components
│       ├── ui/          # UI elements
│       ├── sections/    # Page sections
│       ├── data/        # Static data and configurations for sections
│       └── hooks/       # Custom React hooks specific to sections
├── .eslintrc.js         # ESLint configuration
├── .gitignore           # Git ignore rules
├── jest.config.js       # Jest configuration
├── next.config.js       # Next.js configuration
├── package.json         # Dependencies and scripts
├── tsconfig.json        # TypeScript configuration
└── README.md            # Project documentation
```

## Available Scripts

- `npm run dev` - Starts the development server
- `npm run build` - Builds the site for production
- `npm run start` - Runs the built site in production mode
- `npm run lint` - Lints the code with ESLint
- `npm run typecheck` - Checks TypeScript types without emitting files
- `npm run test` - Runs tests with Jest

## CI/CD

This portfolio uses GitHub Actions for continuous integration and deployment:

- **CI**: Validates code quality on push and pull requests
- **CD**: Automatically deploys to Vercel after a successful merge to main branch

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

Vladyslav Dobrodii - [dobrodii.vlad200@gmail.com](mailto:dobrodii.vlad200@gmail.com)

Project Link: [https://github.com/dladislav201/dladislav.com](https://github.com/dladislav201/dladislav.com)

## Acknowledgements

- [Next.js Documentation](https://nextjs.org/docs)
- [Vercel](https://vercel.com) for hosting
