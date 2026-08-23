import { PageShell } from "../../components/layout/PageShell";
import { ScrollSection } from "../../viz-core/ScrollSection";
import { SectionNavRail } from "../../viz-core/SectionNavRail";
import { LayerStackDiagram } from "../../features/explainers/deep-learning-basics/LayerStackDiagram";

const SECTION_TITLES = ["What deep learning actually is", "Why stack layers at all", "The training loop, at a glance"];

const WHAT_STEPS = [
  "A deep learning model is a stack of simple mathematical functions, layers, each one transforming its input a little, with the output of one layer feeding the next.",
  "Every one of those transformations has adjustable numbers, weights. Learning means searching for weight values that make the whole stack produce the right output for the training examples.",
  "Nothing in the model is hand-coded rules. What it does is entirely a product of the data it saw and the weights that data produced.",
];

const WHY_STACK_STEPS = [
  "A single layer can only represent fairly simple relationships, a straight-line boundary in the simplest case, as the next page on the Perceptron shows directly.",
  "Stacking layers, each with a non-linearity in between, lets the model build up increasingly complex functions from these simple pieces. That's the core idea behind the field's name: it's deep because there are many layers between input and output.",
  "One sufficiently wide single layer can, in principle, approximate almost anything. In practice, going deep instead of just wide turns out to be a far more efficient way to represent complicated functions.",
];

const TRAINING_LOOP_STEPS = [
  "Every layer's weights start out random. Training repeatedly runs examples through the network, checks how wrong its answer was, and adjusts every weight a little to make that answer less wrong next time.",
  "That loop, run the network forward, measure the error, adjust the weights, has a name for each half: forward propagation and backpropagation. A dedicated page covers exactly how those work.",
  "Repeat that loop over enough examples, and the random numbers this page started with become weights that solve a real problem: recognizing images, predicting the next word, or almost anything else.",
];

/** Explainer page: the basic shape of deep learning, before any specific architecture. */
export function DeepLearningBasicsExplainer() {
  return (
    <PageShell wide>
      <SectionNavRail titles={SECTION_TITLES} />
      <header className="py-8">
        <h1 className="font-serif text-4xl leading-tight sm:text-5xl">Basics of deep learning</h1>
        <p className="mt-6 max-w-2xl text-lg text-[var(--color-text-muted)]">
          Before the Perceptron, before backpropagation, before any specific
          architecture: what actually makes a model "deep," and why that
          shape works at all.
        </p>
      </header>

      <ScrollSection
        index={1}
        title="What deep learning actually is"
        steps={WHAT_STEPS}
        renderGraphic={() => <LayerStackDiagram highlight="flow" />}
      />

      <ScrollSection
        index={2}
        title="Why stack layers at all"
        steps={WHY_STACK_STEPS}
        renderGraphic={() => <LayerStackDiagram highlight="weights" />}
      />

      <ScrollSection
        index={3}
        title="The training loop, at a glance"
        steps={TRAINING_LOOP_STEPS}
        renderGraphic={() => <LayerStackDiagram highlight="loop" />}
      />
    </PageShell>
  );
}
