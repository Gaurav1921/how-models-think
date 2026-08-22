/** Deterministic pseudo-embedding generator, used only for illustrative visuals. */
export function hashTokenToVector(token: string, length: number): number[] {
  let seed = 0;
  for (let index = 0; index < token.length; index += 1) {
    seed = (seed * 31 + token.charCodeAt(index)) >>> 0;
  }
  const vector: number[] = [];
  for (let index = 0; index < length; index += 1) {
    seed = (seed * 1103515245 + 12345) >>> 0;
    vector.push((seed % 1000) / 1000);
  }
  return vector;
}

/** Illustrative stand-ins for the learned W_Q, W_K, W_V projections. */
export function projectQuery(vector: number[]): number[] {
  return vector.map((value, index) => (value + vector[(index + 2) % vector.length]) / 2);
}

export function projectKey(vector: number[]): number[] {
  return [...vector].reverse();
}

export function projectValue(vector: number[]): number[] {
  return vector.map((value) => 1 - value);
}

/** A small positional encoding vector, matching the real sin/cos formula's shape. */
export function positionalEncodingVector(position: number, length: number): number[] {
  return Array.from({ length }, (_, dimension) => {
    const frequency = 1 / Math.pow(10000, (2 * Math.floor(dimension / 2)) / length);
    const value = dimension % 2 === 0 ? Math.sin(position * frequency) : Math.cos(position * frequency);
    return (value + 1) / 2;
  });
}
