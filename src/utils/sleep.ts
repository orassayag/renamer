/**
 * Sleep for specified milliseconds.
 */
export function sleep(ms: number): Promise<void> {
  if (!Number.isFinite(ms) || ms < 0) {
    throw new Error(
      `sleep() duration must be a finite non-negative number (1000028)`
    );
  }
  return new Promise((resolve) => setTimeout(resolve, ms));
}
