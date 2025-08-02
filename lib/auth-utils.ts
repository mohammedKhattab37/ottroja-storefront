import { ZodError } from 'zod'

/**
 * Translates authentication error messages using the provided translation function
 * @param error - The error message or ZodError
 * @param t - Translation function
 * @returns Translated error message
 */
export function translateAuthError(error: string | ZodError, t: (key: string) => string): string {
  if (typeof error === 'string') {
    // Check if it's a translation key
    if (error.startsWith('auth.errors.')) {
      return t(error)
    }

    // Map common server error messages to translation keys
    const serverErrorMap: Record<string, string> = {
      'User already exists': 'auth.errors.server.email_exists',
      'Invalid credentials': 'auth.errors.server.invalid_credentials',
      'User not found': 'auth.errors.server.account_not_found',
      'Account disabled': 'auth.errors.server.account_disabled',
      'Too many attempts': 'auth.errors.server.too_many_attempts',
      'Validation failed': 'auth.errors.server.validation',
      'An unexpected error occurred': 'auth.errors.server.unexpected',
      'Failed to connect to authentication service': 'auth.errors.server.connection',
      'An unexpected error occurred during registration': 'auth.errors.server.unexpected',
      'An unexpected error occurred during login': 'auth.errors.server.unexpected',
    }

    return serverErrorMap[error] ? t(serverErrorMap[error]) : error
  }

  // Handle ZodError
  if (error instanceof ZodError) {
    const firstError = error.issues[0]
    return t(firstError.message)
  }

  return t('auth.errors.server.unexpected')
}

/**
 * Translates field-specific validation errors for form fields
 * @param issues - Array of validation issues from server response
 * @param t - Translation function
 * @returns Array of translated issues
 */
export function translateValidationIssues(
  issues: Array<{ code: string; path: (string | number)[]; message: string }>,
  t: (key: string) => string,
): Array<{ code: string; path: (string | number)[]; message: string }> {
  return issues.map((issue) => ({
    ...issue,
    message: translateAuthError(issue.message, t),
  }))
}

/**
 * Gets appropriate error message for server responses
 * @param statusCode - HTTP status code
 * @param errorMessage - Original error message
 * @param t - Translation function
 * @returns Translated error message
 */
export function getServerErrorMessage(
  statusCode: number,
  errorMessage: string,
  t: (key: string) => string,
): string {
  switch (statusCode) {
    case 400:
      if (
        errorMessage.toLowerCase().includes('email') &&
        errorMessage.toLowerCase().includes('exists')
      ) {
        return t('auth.errors.server.email_exists')
      }
      return t('auth.errors.server.validation')
    case 401:
      return t('auth.errors.server.invalid_credentials')
    case 403:
      return t('auth.errors.server.account_disabled')
    case 404:
      return t('auth.errors.server.account_not_found')
    case 429:
      return t('auth.errors.server.too_many_attempts')
    case 500:
    case 502:
    case 503:
    case 504:
      return t('auth.errors.server.connection')
    default:
      return translateAuthError(errorMessage, t)
  }
}
