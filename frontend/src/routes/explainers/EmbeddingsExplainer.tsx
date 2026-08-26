import { PageShell } from "../../components/layout/PageShell";
import { BackLink } from "../../components/common/BackLink";
import { ScrollSection } from "../../viz-core/ScrollSection";
import { SectionNavRail } from "../../viz-core/SectionNavRail";
import { ScrollEnd } from "../../viz-core/ScrollEnd";
import { TokenFlowDiagram } from "../../features/transformers/viz/TokenFlowDiagram";
import { EmbeddingCloud3D } from "../../features/transformers/viz/EmbeddingCloud3D";

const SECTION_TITLES = ["Turning words into numbers", "Why every text architecture starts here"];

const NUMBERS_STEPS = [
  "Before any network, recurrent or otherwise, can do math on text, every token needs to become a vector: a fixed-length list of numbers. That vector is called an embedding.",
  "The embedding isn't arbitrary. It's learned so that tokens used in similar contexts end up with similar vectors, positioned close together in that numeric space.",
];

const WHY_STEPS = [
  "An RNN's hidden state math, matrix multiplications and additions, only works on numbers. Feed it raw words directly and there's nothing to compute; embeddings are the translation layer that makes text usable by any neural network at all.",
  "This is why the same first step shows up everywhere. Transformers, RNNs, and every other text-based architecture all start by turning tokens into embeddings before their own specific mechanism, attention, recurrence, or anything else, takes over.",
];

/** Explainer page: word/token embeddings, the shared first step behind every text architecture. */
export function EmbeddingsExplainer() {
  return (
    <PageShell wide>
      <SectionNavRail titles={SECTION_TITLES} />
      <div className="pt-8">
        <BackLink to="/learn/nlp" label="NLP" />
      </div>
      <header className="py-8">
        <h1 className="font-serif text-4xl leading-tight sm:text-5xl">Embeddings</h1>
        <p className="mt-6 max-w-2xl text-lg text-[var(--color-text-muted)]">
          How text becomes something a network can actually compute on, the
          first step behind every NLP architecture, RNNs included.
        </p>
      </header>

      <ScrollSection
        index={1}
        title="Turning words into numbers"
        math="x_i = E[\text{token}_i]"
        steps={NUMBERS_STEPS}
        renderGraphic={(activeStep) => (
          <div className="flex flex-col gap-6">
            <TokenFlowDiagram tokens={["river", "bank"]} stage={activeStep === 0 ? "chips" : "vectors"} />
            <TokenFlowDiagram tokens={["bank", "account"]} stage={activeStep === 0 ? "chips" : "vectors"} />
          </div>
        )}
      />

      <ScrollSection
        index={2}
        title="Why every text architecture starts here"
        steps={WHY_STEPS}
        renderGraphic={() => <EmbeddingCloud3D />}
      />
      <ScrollEnd />
    </PageShell>
  );
}
