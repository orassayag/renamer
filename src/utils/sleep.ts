/**
 * Sleep for specified milliseconds.
 */
export function sleep(ms: number): Promise<void> {
  if (ms < 0) {
    throw new Error('sleep() duration must be non-negative (1000028)');
  }
  return new Promise((resolve) => setTimeout(resolve, ms));
}
