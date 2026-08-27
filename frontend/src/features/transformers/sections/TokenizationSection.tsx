import { SENTENCE_TOKENS } from "../exampleData";
import { TokenFlowDiagram } from "../viz/TokenFlowDiagram";
import { ScrollSection } from "../../../viz-core/ScrollSection";
import { vizColors } from "../../../viz-core/colors";

const STEPS = [
  "Before any of that math happens, text is split into tokens, roughly word-sized pieces.",
  "Each token is looked up in a table, learned during training, that maps it to a fixed-size vector of numbers: its embedding.",
  "That lookup table has no idea about context. The same token always starts from exactly the same vector, no matter what surrounds it.",
  "\"Roughly\" word-sized is doing real work in that first sentence: a real tokenizer only keeps common words whole. A rarer or unfamiliar word gets split into multiple subword pieces instead, which is a big part of why LLMs sometimes stumble on letter-counting or unusual spellings, the model never sees that word as one atomic unit to begin with.",
];

const STAGES: Array<"sentence" | "chips" | "vectors"> = ["sentence", "chips", "vectors"];
const SUBWORD_EXAMPLE = ["token", "ization"];

/** Section 2: tokenization and embeddings. */
export function TokenizationSection() {
  return (
    <ScrollSection
      index={2}
      title="Tokens and embeddings"
      math="x_i = E[\text{token}_i]"
      steps={STEPS}
      renderGraphic={(activeStep) =>
        activeStep === 3 ? (
          <div className="flex flex-col gap-4">
            <span className="text-xs text-[var(--color-text-muted)]">
              "tokenization" as a rarer word: not one token, but two subword pieces
            </span>
            <span
              className="w-fit rounded-md border px-3 py-1.5 font-mono text-sm text-[var(--color-text-muted)] line-through decoration-1"
              style={{ borderColor: vizColors.border }}
            >
              tokenization
            </span>
            <div className="flex items-center gap-2">
              {SUBWORD_EXAMPLE.map((piece) => (
                <span
                  key={piece}
                  className="rounded-md border px-3 py-1.5 font-mono text-sm"
                  style={{ borderColor: vizColors.query, color: vizColors.query }}
                >
                  {piece}
                </span>
              ))}
            </div>
          </div>
        ) : (
          <TokenFlowDiagram tokens={SENTENCE_TOKENS} stage={STAGES[activeStep]} />
        )
      }
    />
  );
}
