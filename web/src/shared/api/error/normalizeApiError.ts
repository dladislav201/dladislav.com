import {
  ApiError,
  HttpError,
  TimeoutError,
  NetworkError,
  ValidationError,
} from './errors';

export function normalizeApiError(err: unknown): ApiError {
  if (
    err instanceof HttpError ||
    err instanceof TimeoutError ||
    err instanceof NetworkError ||
    err instanceof ValidationError
  ) {
    return err;
  }
  return new NetworkError(err);
}
