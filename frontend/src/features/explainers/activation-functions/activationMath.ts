/** The activation functions covered on the Activation Functions page, plus their derivatives where relevant. */

export function sigmoid(x: number): number {
  return 1 / (1 + Math.exp(-x));
}

export function sigmoidDerivative(x: number): number {
  const s = sigmoid(x);
  return s * (1 - s);
}

export function tanh(x: number): number {
  return Math.tanh(x);
}

export function relu(x: number): number {
  return Math.max(0, x);
}

export function leakyRelu(x: number, alpha = 0.1): number {
  return x >= 0 ? x : alpha * x;
}

export function elu(x: number, alpha = 1): number {
  return x >= 0 ? x : alpha * (Math.exp(x) - 1);
}

export function swish(x: number): number {
  return x * sigmoid(x);
}

export interface ActivationFn {
  slug: string;
  label: string;
  color: string;
  fn: (x: number) => number;
}
