import { PageShell } from "../../components/layout/PageShell";
import { ScrollSection } from "../../viz-core/ScrollSection";
import { ForwardBackwardDiagram } from "../../features/explainers/backpropagation/ForwardBackwardDiagram";
import { LossDescentPlot } from "../../features/transformers/viz/LossDescentPlot";

const FORWARD_STEPS = [
  "Forward propagation is just running the network: input goes through one layer, that layer's output goes through the next, and so on, until you get a prediction. This is the direction data flows every single time the model is used, training or not.",
  "Compare that prediction to the correct answer with a loss function, one number that measures how wrong the guess was. A perfect guess gives a loss near 0; a bad one gives a large loss.",
];

const BACKWARD_STEPS = [
  "Backpropagation runs the same network in reverse: starting from the loss, it uses the chain rule from calculus to work out how much each weight contributed to the error.",
  "Every weight ends up with a gradient, a number saying which direction, and how strongly, changing that one weight would increase the loss. A weight that barely affected the output gets a small gradient; one that mattered a lot gets a large one.",
];

const DESCENT_STEPS = [
  "Gradient descent uses those gradients to actually update the weights, nudging each one a small step in the opposite direction, the direction that decreases the loss.",
  "The learning rate controls how big that step is. Too large and training overshoots and destabilizes; too small and it crawls. Repeat this across billions of examples, and the weights slowly converge on values that make good predictions.",
];

/** Explainer page: forward propagation, backpropagation, and gradient descent. */
export function BackpropagationExplainer() {
  return (
    <PageShell wide>
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
        math="y_hat = f(W_2 f(W_1 x)),  L = loss(y_hat, y)"
        steps={FORWARD_STEPS}
        renderGraphic={() => <ForwardBackwardDiagram direction="forward" />}
      />

      <ScrollSection
        index={2}
        title="Backpropagation: assigning blame"
        math="dL/dw = (dL/dy_hat) * (dy_hat/dh) * (dh/dw)"
        steps={BACKWARD_STEPS}
        renderGraphic={() => <ForwardBackwardDiagram direction="backward" />}
      />

      <ScrollSection
        index={3}
        title="Gradient descent: taking the step"
        math="w <- w - eta * dL/dw"
        steps={DESCENT_STEPS}
        renderGraphic={(activeStep) => <LossDescentPlot progress={activeStep / (DESCENT_STEPS.length - 1)} />}
      />
    </PageShell>
  );
}
