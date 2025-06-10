import { z } from 'zod';
import {
  HttpError,
  ValidationError,
  TimeoutError,
  NetworkError,
} from './error/errors';
import { API_URL } from '@/shared/constants';

type Options<S extends z.ZodTypeAny> = {
  schema: S;
  init?: RequestInit;
  timeoutMs?: number;
  onRequest?: (init: RequestInit) => void;
  onResponse?: (res: Response) => void;
};

export async function fetchJson<S extends z.ZodTypeAny>(
  url: string,
  opts: Options<S>,
): Promise<z.infer<S>> {
  const { schema, init = {}, timeoutMs, onRequest, onResponse } = opts;

  const controller = timeoutMs ? new AbortController() : undefined;

  const finalInit: RequestInit = {
    ...init,
    cache: 'no-store',
    signal: controller?.signal,
  };
  onRequest?.(finalInit);

  let timer: ReturnType<typeof setTimeout> | undefined;
  if (timeoutMs) timer = setTimeout(() => controller?.abort(), timeoutMs);

  try {
    const res = await fetch(API_URL + url, finalInit);
    onResponse?.(res);

    const isJson = res.headers
      .get('content-type')
      ?.includes('application/json');

    const body = isJson ? await res.json().catch(() => null) : null;

    if (!res.ok) throw new HttpError(res.status, body);

    console.log(body);

    const parsed = schema.safeParse(body);
    if (!parsed.success) throw new ValidationError(parsed.error.issues);

    return parsed.data;
  } catch (err) {
    if (err instanceof DOMException && err.name === 'AbortError') {
      throw new TimeoutError(timeoutMs ?? 0);
    }
    if (err instanceof TypeError) throw new NetworkError(err);
    throw err;
  } finally {
    if (timer) clearTimeout(timer);
  }
}
