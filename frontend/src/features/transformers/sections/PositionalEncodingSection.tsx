import { hashTokenToVector, positionalEncodingVector } from "../embeddingHash";
import { PositionalWavePlot } from "../viz/PositionalWavePlot";
import { VectorArrow } from "../viz/VectorArrow";
import { ScrollSection } from "../../../viz-core/ScrollSection";
import { vizColors } from "../../../viz-core/colors";

const STEPS = [
  "Attention, as described so far, has no notion of distance. The causal mask already tells a token which positions came before it, but nothing about how far back, one step earlier and a hundred steps earlier look identical without more information.",
  "So before attention runs, a positional encoding vector, built from sine and cosine waves at different frequencies, is added directly onto each token's embedding (first scaled up by sqrt(d_model), so its size is comparable to the positional signal being added to it).",
  "The paper chose these specific sine and cosine waves over a learned position vector for two reasons: the fixed, regular pattern should make it easy for the model to learn to attend by relative position, and it should let the model handle sequences longer than any it saw during training.",
  "In practice, this means every position in the sequence gets added a different, but consistent, fingerprint.",
];

/** Section 7: positional encoding. */
export function PositionalEncodingSection() {
  return (
    <ScrollSection
      index={7}
      title="Positional encoding"
      math="PE_{(pos,\,2i)} = \sin\!\left(\frac{pos}{10000^{2i/d}}\right), \quad PE_{(pos,\,2i+1)} = \cos\!\left(\frac{pos}{10000^{2i/d}}\right)"
      steps={STEPS}
      renderGraphic={(activeStep) => {
        if (activeStep < 3) return <PositionalWavePlot />;
        const embedding = hashTokenToVector("cat", 8);
        const positional = positionalEncodingVector(1, 8);
        const scaledEmbedding = embedding.map((value) => value * Math.sqrt(embedding.length));
        const summed = scaledEmbedding.map((value, index) => value + positional[index]);
        return (
          <div className="flex flex-col gap-3">
            <span className="text-xs text-[var(--color-text-muted)]">token "cat" at position 1</span>
            <VectorArrow fromVector={embedding} toVector={summed} toColor={vizColors.position} label="+ PE" />
          </div>
        );
      }}
    />
  );
}
