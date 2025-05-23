# Web Frontend

## Tech Stack

- [Next.js](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)

## Local Development

1. Clone the repository

```bash
git clone https://github.com/dladislav201/dladislav.com.git
cd dladislav.com/web
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
├── next.config.js       # Next.js configuration
├── package.json         # Dependencies and scripts
└── tsconfig.json        # TypeScript configuration
```

## Available Scripts

- `npm run dev` - Starts the development server
- `npm run build` - Builds the site for production
- `npm run start` - Runs the built site in production mode
- `npm run lint` - Lints the code with ESLint
- `npm run typecheck` - Checks TypeScript types without emitting files
- `npm run test` - Runs tests with Jest
