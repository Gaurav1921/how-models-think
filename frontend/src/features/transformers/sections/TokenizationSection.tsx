import { SENTENCE_TOKENS } from "../exampleData";
import { TokenFlowDiagram } from "../viz/TokenFlowDiagram";
import { ScrollSection } from "../../../viz-core/ScrollSection";

const STEPS = [
  "Before any of that math happens, text is split into tokens, roughly word-sized pieces.",
  "Each token is looked up in a table, learned during training, that maps it to a fixed-size vector of numbers: its embedding.",
  "That lookup table has no idea about context. The same token always starts from exactly the same vector, no matter what surrounds it.",
];

const STAGES: Array<"sentence" | "chips" | "vectors"> = ["sentence", "chips", "vectors"];

/** Section 2: tokenization and embeddings. */
export function TokenizationSection() {
  return (
    <ScrollSection
      index={2}
      title="Tokens and embeddings"
      math="x_i = E[\text{token}_i]"
      steps={STEPS}
      renderGraphic={(activeStep) => (
        <TokenFlowDiagram tokens={SENTENCE_TOKENS} stage={STAGES[activeStep]} />
      )}
    />
  );
}
