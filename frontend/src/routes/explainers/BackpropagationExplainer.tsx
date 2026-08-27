import { PageShell } from "../../components/layout/PageShell";
import { BackLink } from "../../components/common/BackLink";
import { ScrollSection } from "../../viz-core/ScrollSection";
import { SectionNavRail } from "../../viz-core/SectionNavRail";
import { ScrollEnd } from "../../viz-core/ScrollEnd";
import { ForwardBackwardDiagram } from "../../features/explainers/backpropagation/ForwardBackwardDiagram";
import { VanishingGradientExplorer } from "../../features/explainers/backpropagation/VanishingGradientExplorer";
import { GradientDescentBowl } from "../../features/explainers/backpropagation/GradientDescentBowl";

const SECTION_TITLES = [
  "Forward propagation: making a guess",
  "Backpropagation: assigning blame",
  "Gradient descent: taking the step",
  "The vanishing gradient problem",
];

const FORWARD_STEPS = [
  "Forward propagation is just running the network: input goes through one layer, that layer's output goes through the next, and so on, until you get a prediction. This is the direction data flows every single time the model is used, training or not.",
  "Compare that prediction to the correct answer with a loss function, one number that measures how wrong the guess was. A perfect guess gives a loss near 0; a bad one gives a large loss.",
];

const BACKWARD_STEPS = [
  "Backpropagation runs the same network in reverse: starting from the loss, it uses the chain rule from calculus to work out how much each weight contributed to the error.",
  "Every weight ends up with a gradient, a number saying which direction, and how strongly, changing that one weight would increase the loss. A weight that barely affected the output gets a small gradient; one that mattered a lot gets a large one.",
  "A weight near the start of the network isn't directly connected to the loss, it only affects it indirectly, through every neuron between it and the output. The chain rule handles that by multiplying the local derivative at every step along the path back. When a neuron's output feeds into more than one neuron ahead of it, the chain rule sums the contribution from every path.",
];

const DESCENT_STEPS = [
  "Gradient descent uses those gradients to actually update the weights, nudging each one a small step in the opposite direction, the direction that decreases the loss. The curve below shows a squared-error loss traced against a single weight in a simple linear model, a parabola, or bowl, with one lowest point. Once that weight sits behind a non-linearity inside a real multi-layer network, the loss traced against it is no longer guaranteed to be this clean: deep-net loss landscapes are generally non-convex, with saddle points and multiple local minima, which is exactly why momentum, adaptive learning rates, and good initialization matter in practice.",
  "The gradient at any point is just the slope of that bowl there, drag the weight slider and watch the tangent line (and the dL/dw readout) flip sign on either side of the minimum. Gradient descent always steps in the opposite direction of that slope.",
  "The learning rate controls how big that step is. Too large and training overshoots and destabilizes; too small and it crawls. Press \"take a gradient step\" a few times from anywhere on the curve and watch it walk downhill toward the minimum, exactly the update rule below, repeated.",
];

const VANISHING_STEPS = [
  "Because backpropagation multiplies one derivative per layer, the exact chain rule from the last section, a deep stack of layers multiplies many numbers together on the way back to the first weight.",
  "Sigmoid's derivative never exceeds 0.25. Multiply several numbers all smaller than 0.25 and the product shrinks fast: with almost no gradient reaching them, the earliest layers barely learn at all, even while later layers keep training normally. That's the vanishing gradient problem, and it's the main reason ReLU-family activations replaced sigmoid and tanh in hidden layers.",
  "Try it: push the depth slider up with sigmoid selected and watch the bars vanish within a handful of layers. Switch to ReLU, whose derivative is exactly 1 for positive inputs, not a fraction, and the bars stop shrinking from that cause. This demo isolates only the activation-derivative term, though: real gradients also multiply by the weight matrices at every layer, so depth still needs careful initialization, normalization, or residual connections even with ReLU.",
];

/** Explainer page: forward propagation, backpropagation, and gradient descent. */
export function BackpropagationExplainer() {
  return (
    <PageShell wide>
      <SectionNavRail titles={SECTION_TITLES} />
      <div className="pt-8">
        <BackLink to="/learn/deep-learning" label="Deep Learning" />
      </div>
      <header className="py-8">
        <h1 className="font-serif text-4xl leading-tight sm:text-5xl">
          Backpropagation and gradient descent
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-[var(--color-text-muted)]">
          How a network turns a wrong guess into a slightly better set of
          weights, and does that billions of times over.
        </p>
      </header>

      <ScrollSection
        index={1}
        title="Forward propagation: making a guess"
        math="\hat{y} = f(W_2\, f(W_1 x)), \qquad L = \text{loss}(\hat{y}, y)"
        steps={FORWARD_STEPS}
        renderGraphic={() => <ForwardBackwardDiagram direction="forward" />}
      />

      <ScrollSection
        index={2}
        title="Backpropagation: assigning blame"
        math="\frac{\partial L}{\partial w} = \frac{\partial L}{\partial \hat{y}} \cdot \frac{\partial \hat{y}}{\partial h} \cdot \frac{\partial h}{\partial w}"
        steps={BACKWARD_STEPS}
        renderGraphic={() => <ForwardBackwardDiagram direction="backward" />}
      />

      <ScrollSection
        index={3}
        title="Gradient descent: taking the step"
        math="w \leftarrow w - \eta \frac{\partial L}{\partial w}"
        steps={DESCENT_STEPS}
        renderGraphic={() => <GradientDescentBowl />}
      />

      <ScrollSection
        index={4}
        title="The vanishing gradient problem"
        steps={VANISHING_STEPS}
        renderGraphic={() => <VanishingGradientExplorer />}
      />
      <ScrollEnd />
    </PageShell>
  );
}
