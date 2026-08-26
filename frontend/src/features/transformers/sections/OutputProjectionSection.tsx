import { NEXT_TOKEN_CANDIDATES, NEXT_TOKEN_PROBABILITIES } from "../exampleData";
import { AttentionRowBars } from "../viz/AttentionRowBars";
import { ScrollSection } from "../../../viz-core/ScrollSection";
import { Term } from "../../../components/common/Term";

const RAW_LOGITS = [4.1, 2.6, 1.9, 1.5, 1.4].map((value) => value / 4.1);

const STEPS = [
  <>
    After the last block, the final token's vector has absorbed information
    from the whole sequence, filtered through every layer of attention and{" "}
    <Term slug="feed-forward-network">feedforward</Term> processing.
  </>,
  <>
    That vector is projected back to the size of the vocabulary: one score, a{" "}
    <Term slug="logit">logit</Term>, for every token the model knows about.
    The paper reuses the embedding table itself as this projection, rather
    than learning a separate matrix, so the same weights map a token to a
    vector and a vector back to token scores.
  </>,
  <>
    <Term slug="softmax">Softmax</Term> turns those scores into the same kind
    of probability distribution we started with, this time computed from the
    model's real internal state instead of illustration.
  </>,
];

/** Section 9: projecting the final vector back to a probability distribution. */
export function OutputProjectionSection() {
  return (
    <ScrollSection
      index={9}
      title="Back to a probability distribution"
      math="\text{logits} = h_{\text{final}}\, E^T, \qquad P = \text{softmax}(\text{logits})"
      steps={STEPS}
      renderGraphic={(activeStep) => (
        <AttentionRowBars
          tokens={NEXT_TOKEN_CANDIDATES}
          values={activeStep < 2 ? RAW_LOGITS : NEXT_TOKEN_PROBABILITIES}
          label={activeStep < 2 ? "logits (relative scale)" : "softmax probabilities"}
        />
      )}
    />
  );
}
