export class ChatError extends Error {
  constructor(
    message: string,
    public status: number,
    public data?: unknown,
  ) {
    super(message);
    this.name = 'ChatError';
  }

  shouldRetry() {
    return [502, 503, 504].includes(this.status);
  }
}

export class RateLimitError extends ChatError {
  constructor(message: string, data?: unknown) {
    super(message, 429, data);
    this.name = 'RateLimitError';
  }
}

export class AuthError extends ChatError {
  constructor(
    message: string,
    data?: unknown,
    public details?: string,
  ) {
    super(message, 401, data);
    this.name = 'AuthError';
  }
}
