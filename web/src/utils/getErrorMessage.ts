export interface ErrorOptions {
  fallback?: string;
  devMode?: boolean;
  map?: Record<number | string, string>;
  t?: (key: string) => string;
}

interface HasStatus {
  status: number | string;
}

function isHasStatus(err: unknown): err is HasStatus {
  return (
    typeof err === 'object' &&
    err !== null &&
    Object.prototype.hasOwnProperty.call(err, 'status')
  );
}

export function getErrorMessage(err: unknown, opts: ErrorOptions = {}) {
  const {
    fallback = 'Sorry, something went wrong. Please try again later.',
    devMode = process.env.NODE_ENV !== 'production',
    map = {},
    t = (s) => s,
  } = opts;

  let key: number | string | undefined;
  if (isHasStatus(err)) {
    key = err.status;
  } else if (err instanceof Error) {
    key = err.name;
  }

  if (key !== undefined && map[key]) return t(map[key]);
  if (devMode && err instanceof Error) return t(err.message);

  return t(fallback);
}
