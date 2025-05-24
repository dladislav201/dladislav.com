export function getEnvVar(name: string, required = true): string {
  const value = process.env[name];
  if (required && (value === undefined || value === null)) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value!;
}
