import { HttpError, ApiErrorCode } from './errorDefinitions';
import { getFriendlyErrMsg } from './getFriendlyErrMsg';
import { isApiError } from './errorGuards';
import { UNKNOWN_API_ERROR } from '../../constants';

export interface PlainApiError {
  code: ApiErrorCode;
  message: string;
  status?: number;
}

export function toPlainError(err: unknown): PlainApiError {
  if (!isApiError(err)) return UNKNOWN_API_ERROR;

  return {
    code: err.code,
    message: getFriendlyErrMsg(err),
    ...(err.code === ApiErrorCode.HTTP
      ? { status: (err as HttpError).status }
      : {}),
  };
}
