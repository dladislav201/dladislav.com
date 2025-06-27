import { ApiErrorCode } from '../api/error/errorDefinitions';
import type { PlainApiError } from '../api/error/toPlainError';

export const UNKNOWN_API_ERROR: PlainApiError = {
  code: ApiErrorCode.UNKNOWN,
  message: 'Unknown error',
};
