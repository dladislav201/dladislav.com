import {
  ApiError,
  HttpError,
  TimeoutError,
  NetworkError,
  ValidationError,
} from './errorDefinitions';

export function toApiError(err: unknown): ApiError {
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
