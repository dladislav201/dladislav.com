export interface ErrorOptions {
  fallback?: string;
  devMode?: boolean;
  map?: Record<number | string, string>;
  t?: (key: string) => string;
}

export function getErrorMessage(err: unknown, opts: ErrorOptions = {}) {
  const {
    fallback = 'Sorry, something went wrong. Please try again later.',
    devMode = process.env.NODE_ENV !== 'production',
    map = {},
    t = (s) => s,
  } = opts;

  const key =
    (typeof err === 'object' &&
      err &&
      'status' in err &&
      (err as any).status) ||
    (err instanceof Error && err.name);

  if (key && map[key]) return t(map[key]);
  if (devMode && err instanceof Error) return t(err.message);

  return t(fallback);
}
