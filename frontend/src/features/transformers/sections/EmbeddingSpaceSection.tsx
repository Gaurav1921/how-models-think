import { TokenFlowDiagram } from "../viz/TokenFlowDiagram";
import { EmbeddingCloud3D } from "../viz/EmbeddingCloud3D";
import { ScrollSection } from "../../../viz-core/ScrollSection";

const STEPS = [
  '"river bank" and "bank account" both contain the token "bank". Its starting embedding is identical in both sentences.',
  "But the two sentences clearly need different meanings for that word. A static, one-size-fits-all vector cannot capture that by itself.",
  "What the model needs is a way to let each token's vector shift based on the tokens around it, pulled toward whichever meaning the context supports.",
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
              tokens={["bank", "account"]}
              stage={activeStep === 0 ? "chips" : "vectors"}
            />
          </div>
        );
      }}
    />
  );
}
