import { PageShell } from "../components/layout/PageShell";
import { Term } from "../components/common/Term";
import { BackLink } from "../components/common/BackLink";
import { SectionNavRail } from "../viz-core/SectionNavRail";
import { ScrollEnd } from "../viz-core/ScrollEnd";
import { IntroSection } from "../features/transformers/sections/IntroSection";
import { TokenizationSection } from "../features/transformers/sections/TokenizationSection";
import { EmbeddingSpaceSection } from "../features/transformers/sections/EmbeddingSpaceSection";
import { QKVSection } from "../features/transformers/sections/QKVSection";
import { ScaledDotProductSection } from "../features/transformers/sections/ScaledDotProductSection";
import { MultiHeadSection } from "../features/transformers/sections/MultiHeadSection";
import { PositionalEncodingSection } from "../features/transformers/sections/PositionalEncodingSection";
import { StackedLayersSection } from "../features/transformers/sections/StackedLayersSection";
import { OutputProjectionSection } from "../features/transformers/sections/OutputProjectionSection";
import { TrainingSection } from "../features/transformers/sections/TrainingSection";

const SECTION_TITLES = [
  "Predicting the next token",
  "Tokens and embeddings",
  "Why embeddings alone aren't enough",
  "Query, Key, Value",
  "Scaled dot-product attention",
  "Multi-head attention",
  "Positional encoding",
  "Stacking blocks",
  "Back to a probability distribution",
  "How these weights get learned",
];

/** The Transformers and Attention Is All You Need explainer page. */
export function TransformersExplainer() {
  return (
    <PageShell wide>
      <SectionNavRail titles={SECTION_TITLES} />
      <div className="pt-8">
        <BackLink to="/learn/transformers" label="Transformers" />
      </div>
      <header className="py-8">
        <h1 className="font-serif text-4xl leading-tight sm:text-5xl">
          Transformers and Attention Is All You Need
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-[var(--color-text-muted)]">
          Scroll to walk through how a transformer turns text into a
          prediction, one mechanism at a time, from tokens to attention to
          the next word. Unlike a{" "}
          <Term slug="recurrent-neural-network">recurrent neural network</Term>,
          which reads a sequence one token at a time, a transformer looks at
          every token at once, which is what makes it so much faster to train.
        </p>
        <div className="mt-8 max-w-2xl rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-raised)] px-5 py-4 text-sm text-[var(--color-text-muted)]">
          <span className="font-medium text-[var(--color-text)]">Scope of this page: </span>
          the 2017 paper actually describes a full encoder-decoder built for
          machine translation: an encoder that reads the input sentence, and
          a decoder that generates the output one token at a time, attending
          both to its own earlier outputs and, through a separate
          cross-attention sublayer, to the encoder's output. This page
          covers the decoder half on its own, which is the architecture
          GPT-style LLMs actually use for next-token prediction. The core
          interface below, attention, <Term slug="multi-head-attention">multi-head attention</Term>,
          residual-and-normalize blocks stacked on top of each other, is the
          same shape either way. Some details have moved on since 2017,
          though: most modern decoder-only models place normalization inside
          the residual branch rather than after it (Pre-LN, easier to train
          at depth), and swap the paper's fixed sinusoidal{" "}
          <Term slug="positional-encoding">positional encoding</Term> for
          schemes like RoPE or ALiBi. This page teaches the original paper's
          version of both, since the reasoning behind them carries over.
          Cross-attention and the encoder side get their own explainer later.
        </div>
      </header>

      <IntroSection />
      <TokenizationSection />
      <EmbeddingSpaceSection />
      <QKVSection />
      <ScaledDotProductSection />
      <MultiHeadSection />
      <PositionalEncodingSection />
      <StackedLayersSection />
      <OutputProjectionSection />
      <TrainingSection />
      <ScrollEnd />
    </PageShell>
  );
}
