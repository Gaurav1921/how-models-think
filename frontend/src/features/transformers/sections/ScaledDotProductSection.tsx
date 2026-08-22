import {
  SAT_MASKED_COLUMNS,
  SAT_MASKED_DISPLAY,
  SAT_RAW_DISPLAY,
  SAT_SCALED_DISPLAY,
  SAT_SOFTMAX_DISPLAY,
  SENTENCE_TOKENS,
  SOFTMAX_WEIGHTS,
} from "../exampleData";
import { AttentionMatrix } from "../viz/AttentionMatrix";
import { AttentionRowBars } from "../viz/AttentionRowBars";
import { ScrollSection } from "../../../viz-core/ScrollSection";

const STEPS = [
  "For every pair of tokens, take the dot product of one token's Query with the other's Key. A high dot product means that Key looks like what the Query is searching for.",
  "Those raw scores are divided by the square root of the key dimension. Without this, large dot products push softmax into regions where its gradient is nearly flat, which makes the model much harder to train.",
  "Since this model is predicting the next token, a token is also blocked from attending to anything that comes after it. Those positions are masked to negative infinity before softmax runs, so they get exactly zero weight.",
  "Softmax turns each token's row of remaining scores into a proper probability distribution: every value positive, the whole row summing to 1.",
  "Do this for every token at once and you get the full attention matrix, lower-triangular because of the mask: how much each token attends to itself and everything before it.",
];

/** Section 5: scaled dot-product attention, with the causal mask that makes next-token prediction well-defined. */
export function ScaledDotProductSection() {
  return (
    <ScrollSection
      index={5}
      title="Scaled dot-product attention"
      math="softmax(QK^T / sqrt(d_k) + mask) V"
      steps={STEPS}
      renderGraphic={(activeStep) => {
        if (activeStep === 0) {
          return <AttentionRowBars tokens={SENTENCE_TOKENS} values={SAT_RAW_DISPLAY} label='raw scores for "sat"' />;
        }
        if (activeStep === 1) {
          return <AttentionRowBars tokens={SENTENCE_TOKENS} values={SAT_SCALED_DISPLAY} label='scaled scores for "sat"' />;
        }
        if (activeStep === 2) {
          return (
            <AttentionRowBars
              tokens={SENTENCE_TOKENS}
              values={SAT_MASKED_DISPLAY}
              maskedIndices={SAT_MASKED_COLUMNS}
              label='masked scores for "sat" (on, the, mat come later)'
            />
          );
        }
        if (activeStep === 3) {
          return (
            <AttentionRowBars
              tokens={SENTENCE_TOKENS}
              values={SAT_SOFTMAX_DISPLAY}
              maskedIndices={SAT_MASKED_COLUMNS}
              label='softmax weights for "sat"'
            />
          );
        }
        return <AttentionMatrix tokens={SENTENCE_TOKENS} weights={SOFTMAX_WEIGHTS} causal />;
      }}
    />
  );
}
