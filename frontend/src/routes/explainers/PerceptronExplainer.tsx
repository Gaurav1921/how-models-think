import { PageShell } from "../../components/layout/PageShell";
import { ScrollSection } from "../../viz-core/ScrollSection";
import { SectionNavRail } from "../../viz-core/SectionNavRail";
import { ScatterDiagram } from "../../features/explainers/perceptron/ScatterDiagram";

const SECTION_TITLES = ["A single artificial neuron", "A straight line through your data", "Where it breaks"];

const NEURON_STEPS = [
  "The Perceptron, introduced by Frank Rosenblatt in 1958, is the simplest possible model of a neuron: take a set of inputs, multiply each by a weight, add them up, and add one more number called a bias.",
  "Then check whether that sum clears a threshold. If it does, the perceptron fires and outputs 1. If not, it stays silent and outputs 0. That's the entire model: a weighted vote, thresholded.",
];

const LINE_STEPS = [
  "Geometrically, a perceptron's weights and bias define a straight line, or with more inputs, a flat plane, that cuts the space of possible inputs in two. Everything on one side fires; everything on the other doesn't.",
  "Learning means adjusting the weights and bias so that line ends up in the right place. The perceptron learning rule nudges it a little every time it misclassifies an example; correct answers leave it alone.",
];

const LIMIT_STEPS = [
  "A single perceptron can only separate data that's linearly separable, points some straight line can actually divide. Anything more tangled, most famously the XOR pattern, is mathematically impossible for one perceptron to solve, no matter how it's trained.",
  "That limitation, formalized by Minsky and Papert in 1969, is exactly what stacking multiple layers fixes: each layer draws its own line, and combining them can carve out far more complex regions. That combination is a feed-forward network, covered next.",
];

const SEPARABLE_POINTS = [
  { x: 60, y: 150, classIndex: 0 as const },
  { x: 90, y: 170, classIndex: 0 as const },
  { x: 50, y: 110, classIndex: 0 as const },
  { x: 110, y: 140, classIndex: 0 as const },
  { x: 170, y: 60, classIndex: 1 as const },
  { x: 200, y: 90, classIndex: 1 as const },
  { x: 150, y: 40, classIndex: 1 as const },
  { x: 210, y: 50, classIndex: 1 as const },
];

const XOR_POINTS = [
  { x: 60, y: 50, classIndex: 0 as const },
  { x: 200, y: 150, classIndex: 0 as const },
  { x: 200, y: 50, classIndex: 1 as const },
  { x: 60, y: 150, classIndex: 1 as const },
];

/** Explainer page: the single-neuron Perceptron model, and why it motivated multi-layer networks. */
export function PerceptronExplainer() {
  return (
    <PageShell wide>
      <SectionNavRail titles={SECTION_TITLES} />
      <header className="py-8">
        <h1 className="font-serif text-4xl leading-tight sm:text-5xl">The Perceptron</h1>
        <p className="mt-6 max-w-2xl text-lg text-[var(--color-text-muted)]">
          The single-neuron model that started it all: a weighted sum, a
          threshold, and a straight line through your data.
        </p>
      </header>

      <ScrollSection
        index={1}
        title="A single artificial neuron"
        math="y = step(w1*x1 + w2*x2 + ... + b)"
        steps={NEURON_STEPS}
        renderGraphic={() => <ScatterDiagram points={SEPARABLE_POINTS} />}
      />

      <ScrollSection
        index={2}
        title="A straight line through your data"
        steps={LINE_STEPS}
        renderGraphic={() => <ScatterDiagram points={SEPARABLE_POINTS} showLine />}
      />

      <ScrollSection
        index={3}
        title="Where it breaks"
        steps={LIMIT_STEPS}
        renderGraphic={() => <ScatterDiagram points={XOR_POINTS} impossible />}
      />
    </PageShell>
  );
}
