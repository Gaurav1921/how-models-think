import { PageShell } from "../../components/layout/PageShell";
import { BackLink } from "../../components/common/BackLink";
import { ScrollSection } from "../../viz-core/ScrollSection";
import { SectionNavRail } from "../../viz-core/SectionNavRail";
import { ScrollEnd } from "../../viz-core/ScrollEnd";
import { LayerStackDiagram } from "../../features/explainers/deep-learning-basics/LayerStackDiagram";
import { AIMLDLDiagram } from "../../features/explainers/deep-learning-basics/AIMLDLDiagram";

const SECTION_TITLES = [
  "AI, ML, DL, and where this fits",
  "What deep learning actually is",
  "Why stack layers at all",
  "The training loop, at a glance",
];

const TAXONOMY_STEPS = [
  "Artificial Intelligence is the broadest term: an application that performs a task on its own, without a human specifying every step, by learning from data instead. Machine Learning is a subset of that, statistical tools and algorithms for prediction, forecasting, and clustering.",
  "Deep Learning is a subset of Machine Learning, specifically the multi-layered neural networks this whole domain covers. The research dates back to 1958, but it only became mainstream in the last decade, driven by two things arriving together: an explosion of available data, and GPU hardware that makes training large networks practical.",
  "Data Science doesn't nest neatly inside this picture. A data scientist's work touches AI, ML, or DL depending on the task, sometimes it's building a predictive model, sometimes training a deep network, sometimes just cleaning and analyzing data. The tool changes; the goal, shipping something useful from data, doesn't.",
];

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
      <div className="pt-8">
        <BackLink to="/learn/deep-learning" label="Deep Learning" />
      </div>
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
        title="AI, ML, DL, and where this fits"
        steps={TAXONOMY_STEPS}
        renderGraphic={() => <AIMLDLDiagram />}
      />

      <ScrollSection
        index={2}
        title="What deep learning actually is"
        steps={WHAT_STEPS}
        renderGraphic={() => <LayerStackDiagram highlight="flow" />}
      />

      <ScrollSection
        index={3}
        title="Why stack layers at all"
        steps={WHY_STACK_STEPS}
        renderGraphic={() => <LayerStackDiagram highlight="weights" />}
      />

      <ScrollSection
        index={4}
        title="The training loop, at a glance"
        steps={TRAINING_LOOP_STEPS}
        renderGraphic={() => <LayerStackDiagram highlight="loop" />}
      />
      <ScrollEnd />
    </PageShell>
  );
}
