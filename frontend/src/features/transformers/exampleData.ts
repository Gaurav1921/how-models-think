import { maskFuturePositions, softmaxMatrix } from "./math";

export const SENTENCE_TOKENS = ["The", "cat", "sat", "on", "the", "mat"];

export const NEXT_TOKEN_CANDIDATES = ["mat", "floor", "chair", "roof", "moon"];
export const NEXT_TOKEN_PROBABILITIES = [0.62, 0.18, 0.09, 0.06, 0.05];

export const D_K = 8;
const SCALE_FACTOR = 1 / Math.sqrt(D_K);

/** Illustrative, hand-picked raw attention scores (not from a real model). */
export const RAW_SCORES: number[][] = [
  [3.0, 1.0, 0.5, 0.0, 0.2, 0.1],
  [1.0, 3.0, 1.5, 0.2, 0.3, 0.1],
  [0.3, 2.8, 2.0, 1.0, 0.2, 0.4],
  [0.1, 0.3, 1.2, 2.0, 0.5, 1.5],
  [0.5, 0.2, 0.3, 0.8, 2.0, 2.5],
  [0.1, 0.4, 1.0, 1.2, 2.2, 2.6],
];

export const SCALED_SCORES: number[][] = RAW_SCORES.map((row) =>
  row.map((value) => value * SCALE_FACTOR),
);

/**
 * A token predicting the next word can only look at itself and earlier
 * tokens, never ones after it, so future positions are masked out before
 * softmax runs. This is what makes the attention matrix lower-triangular.
 */
export const MASKED_SCALED_SCORES: number[][] = maskFuturePositions(SCALED_SCORES);

export const SOFTMAX_WEIGHTS: number[][] = softmaxMatrix(MASKED_SCALED_SCORES);

const rowMax = (row: number[]) => Math.max(...row.filter((value) => Number.isFinite(value)));
const normalizeForDisplay = (row: number[]) => {
  const max = rowMax(row);
  return row.map((value) => (Number.isFinite(value) ? value / max : 0));
};

export const SAT_ROW_INDEX = 2;
export const SAT_MASKED_COLUMNS = SENTENCE_TOKENS.map((_, index) => index > SAT_ROW_INDEX);
export const SAT_RAW_DISPLAY = normalizeForDisplay(RAW_SCORES[SAT_ROW_INDEX]);
export const SAT_SCALED_DISPLAY = normalizeForDisplay(SCALED_SCORES[SAT_ROW_INDEX]);
export const SAT_MASKED_DISPLAY = normalizeForDisplay(MASKED_SCALED_SCORES[SAT_ROW_INDEX]);
export const SAT_SOFTMAX_DISPLAY = SOFTMAX_WEIGHTS[SAT_ROW_INDEX];

export const HEAD_TOKENS = ["The", "cat", "sat", "mat"];

/**
 * Four heads with deliberately distinct, illustrative attention patterns.
 * Causally masked, same as the main attention matrix: a head can still
 * only route information from a token's own position or earlier.
 */
export const MULTI_HEAD_WEIGHTS: number[][][] = [
  softmaxMatrix(
    maskFuturePositions([
      [3, 0.2, 0.1, 0.1],
      [0.2, 3, 0.2, 0.1],
      [0.1, 0.2, 3, 0.2],
      [0.1, 0.1, 0.2, 3],
    ]),
  ),
  softmaxMatrix(
    maskFuturePositions([
      [1, 2.5, 0.2, 0.1],
      [0.2, 2.5, 0.2, 0.1],
      [0.1, 2.6, 1, 0.2],
      [0.1, 2.4, 0.2, 1],
    ]),
  ),
  softmaxMatrix(
    maskFuturePositions([
      [1, 1, 1, 1],
      [1, 1, 1, 1],
      [1, 1, 1, 1],
      [1, 1, 1, 1],
    ]),
  ),
  softmaxMatrix(
    maskFuturePositions([
      [0.1, 0.1, 0.2, 2.6],
      [0.1, 0.2, 0.2, 2.5],
      [0.1, 0.1, 0.3, 2.6],
      [0.2, 0.1, 0.2, 1],
    ]),
  ),
];
