import { StackedBlocksDiagram } from "../viz/StackedBlocksDiagram";
import { ScrollSection } from "../../../viz-core/ScrollSection";
import { Term } from "../../../components/common/Term";

const STEPS = [
  "One pass of attention is not enough. The transformer stacks many identical blocks, each one refining every token's representation a bit further. The original paper stacks 6 on the decoder side; modern LLMs typically stack far more.",
  "Inside each block, the attention output is added back to its input, a residual connection, then normalized. This keeps gradients well-behaved as more blocks stack up.",
  <>
    After that, a <Term slug="feed-forward-network">feedforward network</Term>{" "}
    processes each token's vector independently, expanding it to a wider
    hidden size and back down (512 to 2048 and back, in the original paper)
    before the next block begins.
  </>,
];

/** Section 8: stacked layers, residual connections, and the feedforward block. */
export function StackedLayersSection() {
  return (
    <ScrollSection
      index={8}
      title="Stacking blocks"
      math="z = LayerNorm(x + Attention(x)),  y = LayerNorm(z + FFN(z))"
      steps={STEPS}
      renderGraphic={(activeStep) => (
        <StackedBlocksDiagram
          blockCount={3}
          highlightStage={activeStep === 0 ? null : activeStep === 1 ? "addnorm" : "ffn"}
        />
      )}
    />
  );
}
