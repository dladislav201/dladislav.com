import {
  HttpError,
  TimeoutError,
  NetworkError,
  ValidationError,
  ApiErrorCode,
  isApiError,
} from './errors';

export const isHttpError = (e: unknown): e is HttpError =>
  isApiError(e) && e.code === ApiErrorCode.HTTP;

export const isTimeoutError = (e: unknown): e is TimeoutError =>
  isApiError(e) && e.code === ApiErrorCode.TIMEOUT;

export const isNetworkError = (e: unknown): e is NetworkError =>
  isApiError(e) && e.code === ApiErrorCode.NETWORK;

export const isValidationError = (e: unknown): e is ValidationError<unknown> =>
  isApiError(e) && e.code === ApiErrorCode.VALIDATION;
