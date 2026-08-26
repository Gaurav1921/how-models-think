import { TokenFlowDiagram } from "../viz/TokenFlowDiagram";
import { EmbeddingCloud3D } from "../viz/EmbeddingCloud3D";
import { ScrollSection } from "../../../viz-core/ScrollSection";

const STEPS = [
  '"river bank" and "savings bank" both contain the token "bank". Its starting embedding is identical in both phrases.',
  "But the two phrases clearly need different meanings for that word. A static, one-size-fits-all vector cannot capture that by itself.",
  "What the model needs is a way to let each token's vector shift based on the tokens before it, pulled toward whichever meaning the earlier context supports. (Both examples here put the disambiguating word first, on purpose: a decoder can only look backward, never forward, as the next section covers.)",
];

/** Section 3: motivating attention by showing why static embeddings aren't enough. */
export function EmbeddingSpaceSection() {
  return (
    <ScrollSection
      index={3}
      title="Why embeddings alone aren't enough"
      steps={STEPS}
      renderGraphic={(activeStep) => {
        if (activeStep === 2) return <EmbeddingCloud3D />;
        return (
          <div className="flex flex-col gap-6">
            <TokenFlowDiagram
              tokens={["river", "bank"]}
              stage={activeStep === 0 ? "chips" : "vectors"}
            />
            <TokenFlowDiagram
              tokens={["savings", "bank"]}
              stage={activeStep === 0 ? "chips" : "vectors"}
            />
          </div>
        );
      }}
    />
  );
}
