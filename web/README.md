# Web Frontend

## Tech Stack

- [Next.js](https://nextjs.org/) - React framework with SSG/SSR
- [TypeScript](https://www.typescriptlang.org/) - Type safety and better developer experience
- [Framer Motion](https://www.framer.com/motion/) - Animations and transitions
- [React Icons](https://react-icons.github.io/react-icons/) - Icon library
- [Jest](https://jestjs.io/) - Testing

## Local Development

1. Clone the repository

   ```bash
   cd web
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
│       └── sections/    # Page sections
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

## Acknowledgements

- [Next.js Documentation](https://nextjs.org/docs)
- [Vercel](https://vercel.com) for hosting
