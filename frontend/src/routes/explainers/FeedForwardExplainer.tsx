import { PageShell } from "../../components/layout/PageShell";
import { BackLink } from "../../components/common/BackLink";
import { ScrollSection } from "../../viz-core/ScrollSection";
import { SectionNavRail } from "../../viz-core/SectionNavRail";
import { ScrollEnd } from "../../viz-core/ScrollEnd";
import { FeedForwardDiagram } from "../../features/explainers/feedforward/FeedForwardDiagram";
import { ActivationCurve } from "../../features/explainers/feedforward/ActivationCurve";

const SECTION_TITLES = ["Expand, then contract", "Why you need a non-linearity"];

const SHAPE_STEPS = [
  "After attention mixes information across tokens, each token's vector is passed through a small two-layer network, the same weights reused at every position, but each token processed independently. Nothing mixes between tokens at this step, attention already did that part.",
  "The first layer expands the vector to a wider hidden size. The original paper goes from 512 dimensions to 2048, then applies a non-linearity.",
  "The second layer projects back down to the original size. This expand, bend, contract pattern is where most of a transformer's parameters, and most of its raw compute, actually live.",
];

const NONLINEARITY_STEPS = [
  "Without a non-linearity in between, two linear layers stacked together collapse into one bigger linear layer, mathematically identical to skipping the expansion entirely. Expanding the width alone would add zero expressive power.",
  "The original paper used ReLU, which zeroes out every negative value. Most modern LLMs use GELU instead, a smoothed version of the same idea. Either way, the bend is what lets the network represent curves and thresholds a straight line never could.",
];

/** Explainer page: the feed-forward block inside every transformer layer. */
export function FeedForwardExplainer() {
  return (
    <PageShell wide>
      <SectionNavRail titles={SECTION_TITLES} />
      <div className="pt-8">
        <BackLink to="/learn/deep-learning" label="Deep Learning" />
      </div>
      <header className="py-8">
        <h1 className="font-serif text-4xl leading-tight sm:text-5xl">Feed-forward networks</h1>
        <p className="mt-6 max-w-2xl text-lg text-[var(--color-text-muted)]">
          The other half of every transformer block, applied to each token on
          its own, right after attention has finished mixing information
          across tokens.
        </p>
      </header>

      <ScrollSection
        index={1}
        title="Expand, then contract"
        math="\text{FFN}(x) = \text{activation}(xW_1 + b_1)\,W_2 + b_2"
        steps={SHAPE_STEPS}
        renderGraphic={(activeStep) => (
          <FeedForwardDiagram stage={activeStep === 0 ? "narrow" : activeStep === 1 ? "wide" : "narrow-again"} />
        )}
      />

      <ScrollSection
        index={2}
        title="Why you need a non-linearity"
        steps={NONLINEARITY_STEPS}
        renderGraphic={(activeStep) => <ActivationCurve highlight={activeStep === 0 ? "relu" : "gelu"} />}
      />

      <section className="max-w-2xl py-10">
        <p className="text-sm text-[var(--color-text-muted)]">
          ReLU and GELU are two points in a much bigger design space. The{" "}
          <a href="/explainers/activation-functions" className="text-[var(--color-query)] hover:underline">
            activation functions page
          </a>{" "}
          compares sigmoid, tanh, the whole ReLU family, and Swish side by
          side, and lets you play with each one.
        </p>
      </section>
      <ScrollEnd />
    </PageShell>
  );
}
