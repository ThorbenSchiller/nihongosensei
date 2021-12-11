export function parseError(
  error: unknown,
  defaultMessage = "An error occurred."
): string {
  if (error instanceof Error) {
    return error.message || defaultMessage;
  }
  if (typeof error === "string") {
    return error;
  }

  return defaultMessage;
}
