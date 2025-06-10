import { getFriendlyMessage } from './errorFriendly';
import { z } from 'zod';

export enum ApiErrorCode {
  HTTP = 'HTTP',
  TIMEOUT = 'TIMEOUT',
  NETWORK = 'NETWORK',
  VALIDATION = 'VALIDATION',
  UNKNOWN = 'UNKNOWN',
}

abstract class BaseApiError extends Error {
  abstract code: ApiErrorCode;
}

export class HttpError extends BaseApiError {
  code = ApiErrorCode.HTTP as const;
  constructor(
    public status: number,
    public body: unknown,
  ) {
    super(`HTTP error ${status}`);
  }
}

export class TimeoutError extends BaseApiError {
  code = ApiErrorCode.TIMEOUT as const;
  constructor(public ms: number) {
    super(`Request timed out after ${ms} ms`);
  }
}

export class NetworkError extends BaseApiError {
  code = ApiErrorCode.NETWORK as const;
  constructor(public cause: unknown) {
    super('Network error');
  }
}

export class ValidationError<T> extends BaseApiError {
  code = ApiErrorCode.VALIDATION as const;
  constructor(public issues: T) {
    super('Response validation failed');
  }
}

export type ApiError =
  | HttpError
  | TimeoutError
  | NetworkError
  | ValidationError<z.ZodIssue[]>;

export interface PlainApiError {
  code: ApiErrorCode;
  message: string;
  status?: number;
}

export const isApiError = (e: unknown): e is ApiError =>
  typeof e === 'object' && e !== null && 'code' in e;

export function toPlainError(err: unknown): PlainApiError {
  if (!isApiError(err))
    return { code: ApiErrorCode.UNKNOWN, message: 'Unknown error' };

  return err.code === ApiErrorCode.HTTP
    ? {
        code: err.code,
        status: (err as HttpError).status,
        message: getFriendlyMessage(err),
      }
    : {
        code: err.code,
        message: getFriendlyMessage(err),
      };
}
