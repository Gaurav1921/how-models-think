/** Small numeric helpers used by the transformer explainer's example data. */

export function softmaxRow(scores: number[]): number[] {
  const max = Math.max(...scores);
  const exponentials = scores.map((score) => Math.exp(score - max));
  const sum = exponentials.reduce((total, value) => total + value, 0);
  return exponentials.map((value) => value / sum);
}

export function softmaxMatrix(matrix: number[][]): number[][] {
  return matrix.map(softmaxRow);
}

/**
 * Applies a causal mask: position j is blocked for row i whenever j > i,
 * since a token predicting the next word can only attend to itself and
 * tokens before it, never ones that come later in the sequence.
 */
export function maskFuturePositions(matrix: number[][]): number[][] {
  return matrix.map((row, rowIndex) =>
    row.map((value, columnIndex) => (columnIndex > rowIndex ? -Infinity : value)),
  );
}
