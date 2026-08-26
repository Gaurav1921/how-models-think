import { LossDescentPlot } from "../viz/LossDescentPlot";
import { ScrollSection } from "../../../viz-core/ScrollSection";
import { Term } from "../../../components/common/Term";

const STEPS = [
  <>
    Every weight matrix used above, the embedding table, W_Q, W_K, W_V, W_O, the{" "}
    <Term slug="feed-forward-network">feedforward</Term> weights, starts out random.
  </>,
  <>
    Training feeds in real text, compares the predicted next-token distribution to
    the actual next token with a <Term slug="loss-function">loss function</Term>,
    and measures how wrong the guess was.
  </>,
  <>
    <Term slug="backpropagation">Backpropagation</Term> computes how much each
    individual weight contributed to that error, by running the error signal
    back through the network, the reverse of the normal{" "}
    <Term slug="forward-propagation">forward propagation</Term> direction.{" "}
    <Term slug="gradient-descent">Gradient descent</Term> then nudges every
    weight slightly in the direction that would have made the correct answer
    more likely.
  </>,
  "Repeat that across billions of examples, and the random matrices we started with become the ones that produced every visualization on this page. The full mechanics of backpropagation are their own topic, for a future explainer.",
];

/** Section 10: a brief, honest treatment of how training adjusts the weights. */
export function TrainingSection() {
  return (
    <ScrollSection
      index={10}
      title="How these weights get learned"
      math="L = -\log P(\text{correct token}), \qquad w \leftarrow w - \eta \frac{\partial L}{\partial w}"
      steps={STEPS}
      renderGraphic={(activeStep) => (
        <LossDescentPlot progress={activeStep / (STEPS.length - 1)} />
      )}
    />
  );
}
