import { PageShell } from "../../components/layout/PageShell";
import { BackLink } from "../../components/common/BackLink";
import { ScrollSection } from "../../viz-core/ScrollSection";
import { SectionNavRail } from "../../viz-core/SectionNavRail";
import { ScrollEnd } from "../../viz-core/ScrollEnd";
import { RNNChainDiagram } from "../../features/explainers/rnn/RNNChainDiagram";
import { GradientDecayBars } from "../../features/explainers/rnn/GradientDecayBars";

const TOKENS = ["The", "cat", "sat", "mat"];

const SECTION_TITLES = ["One token at a time", "Vanishing gradients", "Why transformers replaced them"];

const CHAIN_STEPS = [
  "A recurrent neural network (RNN) reads a sequence one token at a time. At each step it combines the new token with a hidden state, a running summary vector carried over from the previous step.",
  "That hidden state is the network's only memory of everything it has seen so far. Whatever doesn't fit into that one fixed-size vector is effectively forgotten.",
  "To produce the hidden state after token 3, the network first needs the hidden state after token 2, which needs the one after token 1. Processing is inherently sequential, step by step, with no shortcut.",
];

const GRADIENT_STEPS = [
  "Training an RNN means backpropagating the error at the last step all the way back through every earlier step, repeatedly multiplying by roughly the same derivative each time.",
  "Multiply a number smaller than 1 by itself dozens of times and it shrinks toward zero. That's the vanishing gradient problem: the training signal from distant tokens barely reaches the early weights, so the network struggles to learn long-range dependencies.",
  "Variants like LSTMs and GRUs added gating mechanisms specifically to fight this, and they helped a lot in practice, but the sequential, one-step-at-a-time bottleneck itself remained.",
];

const WHY_REPLACED_STEPS = [
  "Self-attention lets every token look directly at every other token in a single step, regardless of how far apart they are. No chain of hidden states in between, no information bottleneck.",
  "Because there's no step-by-step dependency, every token's attention can be computed in parallel on a GPU. That parallelism, more than anything else, is what made training today's large models feasible.",
  "The tradeoff: attention over a sequence of length n costs O(n^2) since every token compares against every other token, which scales worse than an RNN's O(n) for very long sequences. Both approaches have limits, just different ones.",
];

/** Explainer page: recurrent neural networks, and why transformers replaced them. */
export function RNNExplainer() {
  return (
    <PageShell wide>
      <SectionNavRail titles={SECTION_TITLES} />
      <div className="pt-8">
        <BackLink to="/learn/deep-learning" label="Deep Learning" />
      </div>
      <header className="py-8">
        <h1 className="font-serif text-4xl leading-tight sm:text-5xl">Recurrent neural networks</h1>
        <p className="mt-6 max-w-2xl text-lg text-[var(--color-text-muted)]">
          Before transformers, this is how models processed sequences, one
          token at a time, and it's why a fully parallel alternative was such
          a big deal.
        </p>
      </header>

      <ScrollSection
        index={1}
        title="One token at a time"
        math="h_t = f(W_h h_{t-1} + W_x x_t)"
        steps={CHAIN_STEPS}
        renderGraphic={(activeStep) => <RNNChainDiagram tokens={TOKENS} activeIndex={activeStep + 1} />}
      />

      <ScrollSection
        index={2}
        title="Vanishing gradients"
        math="\frac{\partial L}{\partial h_1} = \frac{\partial L}{\partial h_T} \cdot \frac{\partial h_T}{\partial h_{T-1}} \cdots \frac{\partial h_2}{\partial h_1}"
        steps={GRADIENT_STEPS}
        renderGraphic={(activeStep) => (
          <GradientDecayBars stepCount={6} decayFactor={activeStep === 0 ? 0.85 : 0.55} />
        )}
      />

      <ScrollSection
        index={3}
        title="Why transformers replaced them"
        steps={WHY_REPLACED_STEPS}
        renderGraphic={() => (
          <div className="flex flex-col gap-3 font-mono text-sm">
            <p className="text-[var(--color-text-muted)]">RNN: step 1 -&gt; step 2 -&gt; step 3 -&gt; step 4 (sequential)</p>
            <p style={{ color: "var(--color-attention)" }}>
              Transformer: step 1, step 2, step 3, step 4 (all at once)
            </p>
          </div>
        )}
      />
      <ScrollEnd />
    </PageShell>
  );
}
