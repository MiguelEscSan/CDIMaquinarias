export class DeadlineExceededError extends Error {
  constructor(readonly ms: number) {
    super(`Deadline of ${ms}ms exceeded`);
    this.name = "DeadlineExceededError";
  }
}

/**
 * Runs `task` and rejects with DeadlineExceededError after `ms`, aborting the
 * signal handed to the task. The timer is always cleared once settled.
 */
export async function withDeadline<T>(
  task: (signal: AbortSignal) => Promise<T>,
  ms: number,
): Promise<T> {
  const controller = new AbortController();
  let timer: ReturnType<typeof setTimeout> | undefined;
  const deadline = new Promise<never>((_, reject) => {
    timer = setTimeout(() => {
      controller.abort();
      reject(new DeadlineExceededError(ms));
    }, ms);
  });
  try {
    return await Promise.race([task(controller.signal), deadline]);
  } finally {
    clearTimeout(timer);
  }
}
