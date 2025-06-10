import { z } from 'zod';
import { fetchJson } from './fetchJson';

type CommonOptions = {
  timeoutMs?: number;
  getHeaders?: () => Record<string, string>;
  onResponse?: (res: Response) => void;
};

export class ApiClient {
  constructor(private readonly opts: CommonOptions) {}

  private makeInit(method: string, body?: unknown): RequestInit {
    const headers = this.opts.getHeaders?.() ?? {};
    return {
      method,
      headers: {
        ...(body ? { 'Content-Type': 'application/json' } : {}),
        ...headers,
      },
      body: body ? JSON.stringify(body) : undefined,
    };
  }

  private request<S extends z.ZodTypeAny, B = unknown>(
    method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE',
    url: string,
    schema: S,
    body?: B,
  ) {
    return fetchJson(url, {
      schema,
      init: this.makeInit(method, body),
      timeoutMs: this.opts.timeoutMs,
      onResponse: this.opts.onResponse,
    });
  }

  get = <S extends z.ZodTypeAny>(u: string, s: S) => this.request('GET', u, s);

  post = <S extends z.ZodTypeAny, B = unknown>(u: string, s: S, b: B) =>
    this.request('POST', u, s, b);

  put = <S extends z.ZodTypeAny, B = unknown>(u: string, s: S, b: B) =>
    this.request('PUT', u, s, b);

  patch = <S extends z.ZodTypeAny, B = unknown>(u: string, s: S, b: B) =>
    this.request('PATCH', u, s, b);

  delete = <S extends z.ZodTypeAny>(u: string, s: S) =>
    this.request('DELETE', u, s);
}
