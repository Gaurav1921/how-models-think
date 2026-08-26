import { NEXT_TOKEN_CANDIDATES, NEXT_TOKEN_PROBABILITIES } from "../exampleData";
import { AttentionRowBars } from "../viz/AttentionRowBars";
import { ScrollSection } from "../../../viz-core/ScrollSection";

const EMPTY = NEXT_TOKEN_PROBABILITIES.map(() => 0);

const STEPS = [
  "Type anything into a chatbot, and underneath the conversation is one repeated operation: given the text so far, guess what comes next.",
  "That guess is not a single word. It is a probability spread across the model's entire vocabulary, every possible next token ranked by how likely it is.",
  "Everything else on this page, tokenization, embeddings, attention, stacked layers, is really just how that probability distribution gets computed.",
];

/** Section 1: framing LLMs as next-token prediction. */
export function IntroSection() {
  return (
    <ScrollSection
      index={1}
      title="Predicting the next token"
      math="P(\text{next token} \mid \text{tokens so far})"
      steps={STEPS}
      renderGraphic={(activeStep) => (
        <div className="flex flex-col gap-6">
          <p className="font-serif text-xl">
            The cat sat on the{" "}
            <span className="text-[var(--color-attention)]">
              {activeStep === 2 ? "mat" : "___"}
            </span>
          </p>
          <AttentionRowBars
            tokens={NEXT_TOKEN_CANDIDATES}
            values={activeStep === 0 ? EMPTY : NEXT_TOKEN_PROBABILITIES}
            label="candidate next tokens"
          />
        </div>
      )}
    />
  );
}
