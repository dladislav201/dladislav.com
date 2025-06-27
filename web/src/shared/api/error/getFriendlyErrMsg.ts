import { ApiError, ApiErrorCode, HttpError } from './errorDefinitions';
import { MSG_MAX_LENGTH } from '@/shared/constants';

export function getFriendlyErrMsg(err: ApiError): string {
  switch (err.code) {
    case ApiErrorCode.TIMEOUT:
      return 'The server took too long to respond. Please try again later.';
    case ApiErrorCode.NETWORK:
      return 'No internet connection. Check your network and retry.';
    case ApiErrorCode.VALIDATION:
      return 'Invalid server response.';
    case ApiErrorCode.HTTP: {
      const status = (err as HttpError).status;
      if (status === 400)
        return `Your message is too long. Maximum length is ${MSG_MAX_LENGTH} characters.`;
      if (status === 401) return 'You need to sign in first.';
      if (status === 404) return 'Requested resource was not found.';
      if (status === 429)
        return 'You have reached your questions limit. Thank you for your interest!';
      if (status === 500)
        return 'Internal server error. Please try again later!';
      if (status === 503)
        return 'Service is temporarily unavailable. Please try again in a few moments.';
      return `Server responded with status ${status}.`;
    }
    default:
      return 'Unknown error. Please try again.';
  }
}
