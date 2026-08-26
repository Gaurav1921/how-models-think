import { PageShell } from "../../components/layout/PageShell";
import { BackLink } from "../../components/common/BackLink";
import { ScrollSection } from "../../viz-core/ScrollSection";
import { SectionNavRail } from "../../viz-core/SectionNavRail";
import { ScrollEnd } from "../../viz-core/ScrollEnd";
import { Term } from "../../components/common/Term";
import { RegressionLossExplorer } from "../../features/explainers/loss-functions/RegressionLossExplorer";
import { BCEExplorer } from "../../features/explainers/loss-functions/BCEExplorer";

const SECTION_TITLES = ["Loss vs. cost", "Regression losses", "Classification losses", "Matching losses to tasks"];

const LOSS_VS_COST_STEPS = [
  "A loss function measures how wrong a single prediction was. Training rarely works one example at a time, though: it passes a whole batch through the network before updating anything, since a single unusual example would otherwise swing every weight update.",
  "The per-example loss becomes a per-batch cost: the average loss across every example in that batch. Cost is just loss, averaged, before backpropagation runs. A batch size of 32 or 64 is a common compromise, large enough to smooth out noisy examples, small enough to keep each step fast.",
];

const REGRESSION_STEPS = [
  "Mean Squared Error (MSE) is the default for regression: half the squared difference between the true value and the prediction. Squaring makes it a quadratic, the exact bowl shape gradient descent needs, but it also means one large outlier contributes disproportionately to the loss.",
  "Mean Absolute Error (MAE) uses the absolute difference instead. It grows linearly, so a large outlier contributes proportionally to its size rather than its square, at the cost of a sharp corner at zero error where the slope is undefined.",
  "Huber loss is a deliberate compromise: quadratic like MSE for small errors, linear like MAE for large ones, switching over at a threshold. Drag the slider and watch MSE curve upward fastest while MAE grows in a straight line.",
];

const CLASSIFICATION_STEPS = [
  "Classification losses measure something different: how well a predicted probability matches a true category. Binary Cross-Entropy (BCE) is used whenever the output is a single sigmoid probability, for a yes-or-no prediction.",
  "The shape below is the entire point of using a logarithm instead of a simple difference. When the true label is 1 and the model predicts a probability close to 1, the loss is nearly 0. But as that probability drifts toward 0, the loss doesn't grow gently, it shoots toward infinity: a confident, wrong prediction is punished far more than a hesitant one.",
];

const MATCHING_STEPS = [
  "Categorical Cross-Entropy (CCE) is the multi-class generalization of BCE, paired with a softmax output layer. Because softmax gives a probability for every class and exactly one is correct, the loss collapses to the negative log of the probability assigned to the correct class.",
  "The output activation and the loss function are always chosen together, as a matched pair, driven entirely by the task, not independently.",
];

const MATCHING_ROWS = [
  { task: "Regression", activation: "Linear (no activation)", loss: "MSE, MAE, or Huber" },
  { task: "Binary classification", activation: "Sigmoid", loss: "Binary Cross-Entropy" },
  { task: "Multi-class classification", activation: "Softmax", loss: "Categorical Cross-Entropy" },
];

/** Explainer page: loss and cost functions, regression and classification, and how they pair with output activations. */
export function LossFunctionsExplainer() {
  return (
    <PageShell wide>
      <SectionNavRail titles={SECTION_TITLES} />
      <div className="pt-8">
        <BackLink to="/learn/deep-learning" label="Deep Learning" />
      </div>
      <header className="py-8">
        <h1 className="font-serif text-4xl leading-tight sm:text-5xl">Loss functions</h1>
        <p className="mt-6 max-w-2xl text-lg text-[var(--color-text-muted)]">
          The single number training is always trying to shrink, and why
          regression and classification each need a different kind of
          number entirely.
        </p>
      </header>

      <ScrollSection
        index={1}
        title="Loss vs. cost"
        steps={LOSS_VS_COST_STEPS}
        renderGraphic={() => (
          <div className="flex flex-col gap-2 font-mono text-sm text-[var(--color-text-muted)]">
            <p>loss(example_1), loss(example_2), ..., loss(example_32)</p>
            <p style={{ color: "var(--color-attention)" }}>cost = average of all 32 -&gt; one weight update</p>
          </div>
        )}
      />

      <ScrollSection
        index={2}
        title="Regression losses"
        math="\text{MSE}(e) = \tfrac{1}{2} e^2, \qquad \text{MAE}(e) = |e|"
        steps={REGRESSION_STEPS}
        renderGraphic={() => <RegressionLossExplorer />}
      />

      <ScrollSection
        index={3}
        title="Classification losses"
        math="\text{BCE} = -\left[y \log(p) + (1-y)\log(1-p)\right]"
        steps={CLASSIFICATION_STEPS}
        renderGraphic={() => <BCEExplorer />}
      />

      <ScrollSection
        index={4}
        title="Matching losses to tasks"
        steps={MATCHING_STEPS}
        renderGraphic={() => (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[420px] border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-[var(--color-border)] text-[var(--color-text-muted)]">
                  <th className="px-3 py-2 font-medium">Task</th>
                  <th className="px-3 py-2 font-medium">Output activation</th>
                  <th className="px-3 py-2 font-medium">Loss</th>
                </tr>
              </thead>
              <tbody>
                {MATCHING_ROWS.map((row) => (
                  <tr key={row.task} className="border-b border-[var(--color-border)] last:border-b-0">
                    <td className="px-3 py-2 font-medium">{row.task}</td>
                    <td className="px-3 py-2 text-[var(--color-text-muted)]">{row.activation}</td>
                    <td className="px-3 py-2 text-[var(--color-text-muted)]">{row.loss}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      />

      <section className="max-w-2xl py-10">
        <p className="text-sm text-[var(--color-text-muted)]">
          See also <Term slug="loss-function">loss function</Term> in the
          glossary, and how a computed loss actually updates weights on the{" "}
          <a href="/explainers/backpropagation" className="text-[var(--color-query)] hover:underline">
            backpropagation page
          </a>
          .
        </p>
      </section>
      <ScrollEnd />
    </PageShell>
  );
}
