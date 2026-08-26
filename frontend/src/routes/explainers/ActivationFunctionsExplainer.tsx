import { PageShell } from "../../components/layout/PageShell";
import { BackLink } from "../../components/common/BackLink";
import { ScrollSection } from "../../viz-core/ScrollSection";
import { SectionNavRail } from "../../viz-core/SectionNavRail";
import { ScrollEnd } from "../../viz-core/ScrollEnd";
import { Term } from "../../components/common/Term";
import { ActivationExplorer } from "../../features/explainers/activation-functions/ActivationExplorer";

const SOFTMAX_SCORES = [2.0, 1.0, 0.1, -1.0];

function softmax(scores: number[]): number[] {
  const exponentials = scores.map((score) => Math.exp(score));
  const total = exponentials.reduce((sum, value) => sum + value, 0);
  return exponentials.map((value) => value / total);
}

const SECTION_TITLES = [
  "Why you need a non-linearity",
  "Sigmoid and tanh: smooth, but they saturate",
  "The ReLU family",
  "Swish and GELU",
  "Choosing one",
];

const WHY_STEPS = [
  "Without a non-linearity in between, two linear layers stacked together collapse into one bigger linear layer, mathematically identical to skipping the extra layer entirely, no matter how many you stack.",
  "An activation function decides whether, and how strongly, a neuron fires. That bend is what lets a network represent curves and thresholds a straight line never could. Drag the slider below and watch every function bend differently around the same input.",
];

const SIGMOID_TANH_STEPS = [
  "Sigmoid squashes any real number into 0 to 1, which reads naturally as a probability. Its derivative peaks at exactly 0.25 when x is 0, and tapers toward 0 at either extreme, that flattening is called saturation.",
  "Tanh has the same S-shape, rescaled to -1 to 1 instead. Being centered on zero helps the next layer train slightly better, but tanh saturates too, for the same reason: both functions flatten out for large positive or negative inputs.",
];

const RELU_STEPS = [
  "ReLU passes positive inputs through unchanged and zeroes out everything negative. Its derivative is exactly 1 for any positive input, not a fraction, so it does not shrink no matter how many layers it passes back through. It's also far cheaper to compute: no exponentials, just a comparison against zero.",
  "The tradeoff is dying ReLU: once a neuron's input goes negative, its gradient becomes exactly 0 and stays there. Leaky ReLU and ELU both fix this by letting a small negative signal through instead of a hard zero, at a small cost in computation.",
];

const SWISH_STEPS = [
  "Swish multiplies the input by its own sigmoid, self-gating: sigmoid(x) acts as a gate between 0 and 1 that decides how much of x to let through, using the input itself to control the gate rather than a separate signal.",
  "Unlike ReLU, Swish is smooth everywhere and dips slightly below zero just left of the origin instead of flattening completely, which keeps a small gradient alive for mildly negative inputs. It performs competitively with ReLU on deep networks, at extra computational cost.",
  "GELU (Gaussian Error Linear Unit) is built the same way, weighting the input by roughly how likely it is to be \"kept\" under a standard normal distribution, rather than by its own sigmoid. It behaves almost identically to Swish, smooth, non-monotonic, a small negative dip, and it's the activation most modern LLMs actually use inside their feed-forward blocks, including the one on this site's transformer page.",
];

const CHOOSING_STEPS = [
  "Hidden layers default to ReLU: cheap, no vanishing gradient for positive inputs, and it works well in most architectures. If dead neurons show up in practice, switch to Leaky ReLU, PReLU, or ELU, in roughly that order of complexity.",
  "The output layer is a different decision, driven entirely by the task: sigmoid for binary classification, softmax for multi-class classification, and no activation at all (a linear output) for regression, since the prediction needs to be an unrestricted real number.",
];

const COMPARISON_ROWS = [
  { name: "Sigmoid", range: "0 to 1", strength: "Smooth; clean probability-like output", weakness: "Vanishing gradient; not zero-centered; slow" },
  { name: "Tanh", range: "-1 to 1", strength: "Zero-centered, unlike sigmoid", weakness: "Still vanishes for large inputs" },
  { name: "ReLU", range: "0 to infinity", strength: "Very fast; no vanishing gradient for positive inputs", weakness: "Dead neurons: negative inputs get a zero gradient" },
  { name: "Leaky ReLU / PReLU", range: "-infinity to infinity", strength: "Fixes dead neurons with a small negative slope", weakness: "Extra hyperparameter (or learned parameter)" },
  { name: "ELU", range: "-alpha to infinity", strength: "Smooth negative side; closer to zero-centered", weakness: "More expensive to compute than ReLU" },
  { name: "Swish", range: "≈ -0.28 to infinity", strength: "Smooth everywhere; competitive with ReLU", weakness: "More expensive to compute (uses sigmoid)" },
  { name: "GELU", range: "≈ -0.17 to infinity", strength: "Smooth, probabilistic weighting; the default in most modern LLMs", weakness: "More expensive to compute than ReLU" },
  { name: "Softmax", range: "0 to 1, sums to 1", strength: "Turns raw scores into class probabilities", weakness: "Output layer only, multi-class problems" },
];

/** Explainer page: the activation function zoo, sigmoid through Swish, and how to choose one. */
export function ActivationFunctionsExplainer() {
  return (
    <PageShell wide>
      <SectionNavRail titles={SECTION_TITLES} />
      <div className="pt-8">
        <BackLink to="/learn/deep-learning" label="Deep Learning" />
      </div>
      <header className="py-8">
        <h1 className="font-serif text-4xl leading-tight sm:text-5xl">Activation functions</h1>
        <p className="mt-6 max-w-2xl text-lg text-[var(--color-text-muted)]">
          Every option in the <Term slug="feed-forward-network">feed-forward</Term> block's
          "bend," compared side by side, and playable: drag the slider on any
          section below and watch every curve move at once.
        </p>
      </header>

      <ScrollSection
        index={1}
        title="Why you need a non-linearity"
        steps={WHY_STEPS}
        renderGraphic={() => <ActivationExplorer />}
      />

      <ScrollSection
        index={2}
        title="Sigmoid and tanh: smooth, but they saturate"
        steps={SIGMOID_TANH_STEPS}
        renderGraphic={() => <ActivationExplorer visible={["sigmoid", "tanh"]} />}
      />

      <ScrollSection
        index={3}
        title="The ReLU family"
        steps={RELU_STEPS}
        renderGraphic={() => <ActivationExplorer visible={["relu", "leaky-relu", "elu"]} />}
      />

      <ScrollSection
        index={4}
        title="Swish and GELU"
        steps={SWISH_STEPS}
        renderGraphic={(activeStep) => <ActivationExplorer visible={activeStep < 2 ? ["swish"] : ["swish", "gelu"]} />}
      />

      <ScrollSection
        index={5}
        title="Choosing one"
        steps={CHOOSING_STEPS}
        renderGraphic={() => <ActivationExplorer />}
      />

      <section className="py-10">
        <h2 className="mb-5 text-sm font-medium tracking-wide text-[var(--color-text-muted)] uppercase">
          Comparison
        </h2>
        <div className="overflow-x-auto rounded-xl border border-[var(--color-border)]">
          <table className="w-full min-w-[640px] border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-[var(--color-border)] text-[var(--color-text-muted)]">
                <th className="px-4 py-3 font-medium">Function</th>
                <th className="px-4 py-3 font-medium">Output range</th>
                <th className="px-4 py-3 font-medium">Strength</th>
                <th className="px-4 py-3 font-medium">Weakness</th>
              </tr>
            </thead>
            <tbody>
              {COMPARISON_ROWS.map((row) => (
                <tr key={row.name} className="border-b border-[var(--color-border)] last:border-b-0">
                  <td className="px-4 py-3 font-medium">{row.name}</td>
                  <td className="px-4 py-3 font-mono text-xs text-[var(--color-text-muted)]">{row.range}</td>
                  <td className="px-4 py-3 text-[var(--color-text-muted)]">{row.strength}</td>
                  <td className="px-4 py-3 text-[var(--color-text-muted)]">{row.weakness}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="max-w-2xl py-10">
        <h2 className="mb-4 text-sm font-medium tracking-wide text-[var(--color-text-muted)] uppercase">
          Softmax: a special case
        </h2>
        <p className="text-[var(--color-text-muted)]">
          Softmax isn't plotted above because it doesn't act on one number at
          a time, it takes every output score at once and turns them into a
          probability distribution. Given raw scores of 2.0, 1.0, 0.1, and
          -1.0 across four classes, softmax exponentiates each one and
          divides by the total:
        </p>
        <div className="mt-4 flex flex-wrap gap-3 font-mono text-sm">
          {softmax(SOFTMAX_SCORES).map((probability, index) => (
            <div
              key={SOFTMAX_SCORES[index]}
              className="rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-raised)] px-3 py-2"
            >
              <span className="text-[var(--color-text-muted)]">{SOFTMAX_SCORES[index].toFixed(1)} -&gt; </span>
              <span style={{ color: "var(--color-attention)" }}>{probability.toFixed(2)}</span>
            </div>
          ))}
        </div>
        <p className="mt-4 text-[var(--color-text-muted)]">
          The highest score doesn't just win outright, it gets amplified
          into the largest probability, but every class keeps some nonzero
          share. Softmax is effectively sigmoid generalized to more than two
          classes, and it's used only at the output layer of a multi-class
          classifier.
        </p>
      </section>
      <ScrollEnd />
    </PageShell>
  );
}
