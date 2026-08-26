/** Loss functions covered on the Loss Functions page, as functions of the prediction error e = y_hat - y. */

export function mse(error: number): number {
  return 0.5 * error ** 2;
}

export function mae(error: number): number {
  return Math.abs(error);
}

export function huber(error: number, delta = 1): number {
  const absError = Math.abs(error);
  return absError <= delta ? 0.5 * error ** 2 : delta * (absError - 0.5 * delta);
}

/** Binary cross-entropy for a true label of 1, as a function of the predicted probability p. */
export function bceForPositiveLabel(p: number): number {
  return -Math.log(Math.max(p, 1e-6));
}
