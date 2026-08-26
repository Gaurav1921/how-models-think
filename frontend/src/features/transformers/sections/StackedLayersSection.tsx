import { StackedBlocksDiagram } from "../viz/StackedBlocksDiagram";
import { LayerNormDemo } from "../viz/LayerNormDemo";
import { ScrollSection } from "../../../viz-core/ScrollSection";
import { Term } from "../../../components/common/Term";

const STEPS = [
  "One pass of attention is not enough. The transformer stacks many identical blocks, each one refining every token's representation a bit further. The original paper stacks 6 on the decoder side; modern LLMs typically stack far more.",
  <>
    Inside each block, the attention output is added back to its input, a{" "}
    <Term slug="residual-connection">residual connection</Term>, then
    normalized with{" "}
    <Term slug="layer-normalization">LayerNorm</Term>. This keeps gradients
    well-behaved as more blocks stack up.
  </>,
  <>
    The residual connection matters because it gives gradients a direct,
    unobstructed path backward: instead of a block having to learn the whole
    next representation from scratch, it only has to learn a correction, an
    "add this on top" delta, on top of an identity path that always passes
    the input straight through. That shortcut is what makes stacking dozens
    of blocks trainable at all.
  </>,
  <>
    LayerNorm does something more literal: for each token's vector on its
    own, it subtracts that vector's mean and divides by its standard
    deviation, forcing every token into the same predictable scale (mean 0,
    variance 1) before it enters the next block, then applies a small learned
    rescale. Watch the values below: same shape, same relative pattern, just
    rescaled onto common ground.
  </>,
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
      math="z = \text{LayerNorm}(x + \text{Attention}(x)), \quad y = \text{LayerNorm}(z + \text{FFN}(z))"
      steps={STEPS}
      renderGraphic={(activeStep) => {
        if (activeStep === 3) return <LayerNormDemo />;
        return (
          <StackedBlocksDiagram
            blockCount={3}
            highlightStage={activeStep === 0 ? null : activeStep === 4 ? "ffn" : "addnorm"}
          />
        );
      }}
    />
  );
}
