export const API_URL: string =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3001/api'
    : process.env.NEXT_PUBLIC_API_URL!;
