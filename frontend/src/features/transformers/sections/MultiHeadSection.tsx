import { HEAD_TOKENS, MULTI_HEAD_WEIGHTS } from "../exampleData";
import { AttentionMatrix } from "../viz/AttentionMatrix";
import { ScrollSection } from "../../../viz-core/ScrollSection";

const STEPS = [
  "A single attention head has to average over everything it looks at, which the paper's authors point out inhibits capturing more than one kind of relationship at a time. Running several heads in parallel, each with its own learned projections, lets the model jointly attend to different representation subspaces at once.",
  "Each head has its own learned Query, Key, and Value matrices, so each one can end up focused on something different: nearby words, subject-verb pairs, sentence position. The original paper uses 8 heads, each working in a 64-dimensional subspace of the model's 512 dimensions. The four below are simplified stand-ins so the different patterns are easy to see; a real trained head rarely looks this clean.",
  "The outputs of every head are concatenated back together and passed through one more learned matrix, W_O, mixing what each head found into a single vector per token. Nothing forces a head to specialize this way, it falls out of training because different patterns each help minimize the loss, and researchers have found this kind of specialization by inspecting real trained models.",
];

const HEAD_PATTERNS = [
  "self-focused: each token attends mostly to itself",
  "fixed-token: every row leans on \"cat\", regardless of which token is asking",
  "broad context: attention spreads roughly evenly across every earlier token",
  "recency: every row leans on the most recent token it's allowed to see",
];

function HeadsGrid({ count }: { count: number }) {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
      {MULTI_HEAD_WEIGHTS.slice(0, count).map((weights, index) => (
        <div key={index} className="flex flex-col gap-1">
          <span className="text-xs text-[var(--color-text-muted)]">head {index + 1}</span>
          <AttentionMatrix tokens={HEAD_TOKENS} weights={weights} causal />
          <span className="mt-1 text-xs text-[var(--color-text-muted)]">{HEAD_PATTERNS[index]}</span>
        </div>
      ))}
    </div>
  );
}

/** Section 6: multi-head attention. */
export function MultiHeadSection() {
  return (
    <ScrollSection
      index={6}
      title="Multi-head attention"
      math="MultiHead(Q, K, V) = Concat(head_1, ..., head_h) W_O"
      steps={STEPS}
      renderGraphic={(activeStep) => {
        if (activeStep === 0) return <HeadsGrid count={1} />;
        if (activeStep === 1) return <HeadsGrid count={4} />;
        return (
          <div className="flex flex-col gap-3">
            <HeadsGrid count={4} />
            <p className="font-mono text-xs text-[var(--color-text-muted)]">
              concat(head_1..head_4) -&gt; W_O -&gt; one output vector per token
            </p>
          </div>
        );
      }}
    />
  );
}
