import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { NavBar } from "./components/layout/NavBar";
import { Footer } from "./components/layout/Footer";
import { ScrollProgressBar } from "./components/layout/ScrollProgressBar";
import { ScrollToTop } from "./components/layout/ScrollToTop";
import { LoadingState } from "./components/common/LoadingState";
import { Home } from "./routes/Home";
import { GlossaryProvider } from "./lib/GlossaryContext";

const About = lazy(() => import("./routes/About").then((module) => ({ default: module.About })));
const Learn = lazy(() => import("./routes/Learn").then((module) => ({ default: module.Learn })));
const LearnDomain = lazy(() =>
  import("./routes/LearnDomain").then((module) => ({ default: module.LearnDomain })),
);
const Timeline = lazy(() =>
  import("./routes/Timeline").then((module) => ({ default: module.Timeline })),
);
const BlogIndex = lazy(() =>
  import("./routes/BlogIndex").then((module) => ({ default: module.BlogIndex })),
);
const BlogPost = lazy(() =>
  import("./routes/BlogPost").then((module) => ({ default: module.BlogPost })),
);
const TransformersExplainer = lazy(() =>
  import("./routes/TransformersExplainer").then((module) => ({
    default: module.TransformersExplainer,
  })),
);
const RNNExplainer = lazy(() =>
  import("./routes/explainers/RNNExplainer").then((module) => ({ default: module.RNNExplainer })),
);
const BackpropagationExplainer = lazy(() =>
  import("./routes/explainers/BackpropagationExplainer").then((module) => ({
    default: module.BackpropagationExplainer,
  })),
);
const FeedForwardExplainer = lazy(() =>
  import("./routes/explainers/FeedForwardExplainer").then((module) => ({
    default: module.FeedForwardExplainer,
  })),
);
const DeepLearningBasicsExplainer = lazy(() =>
  import("./routes/explainers/DeepLearningBasicsExplainer").then((module) => ({
    default: module.DeepLearningBasicsExplainer,
  })),
);
const PerceptronExplainer = lazy(() =>
  import("./routes/explainers/PerceptronExplainer").then((module) => ({
    default: module.PerceptronExplainer,
  })),
);
const EmbeddingsExplainer = lazy(() =>
  import("./routes/explainers/EmbeddingsExplainer").then((module) => ({
    default: module.EmbeddingsExplainer,
  })),
);
const ActivationFunctionsExplainer = lazy(() =>
  import("./routes/explainers/ActivationFunctionsExplainer").then((module) => ({
    default: module.ActivationFunctionsExplainer,
  })),
);
const LossFunctionsExplainer = lazy(() =>
  import("./routes/explainers/LossFunctionsExplainer").then((module) => ({
    default: module.LossFunctionsExplainer,
  })),
);
const NotFound = lazy(() =>
  import("./routes/NotFound").then((module) => ({ default: module.NotFound })),
);

/** Root application component: router and page shell. */
export function App() {
  return (
    <BrowserRouter>
      <GlossaryProvider>
        <ScrollToTop />
        <ScrollProgressBar />
        <div className="flex min-h-screen flex-col">
          <NavBar />
          <div className="flex-1">
            <Suspense fallback={<LoadingState />}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/learn" element={<Learn />} />
                <Route path="/learn/:domainSlug" element={<LearnDomain />} />
                <Route path="/timeline" element={<Timeline />} />
                <Route path="/blog" element={<BlogIndex />} />
                <Route path="/blog/:slug" element={<BlogPost />} />
                <Route path="/transformers" element={<TransformersExplainer />} />
                <Route path="/explainers/rnn" element={<RNNExplainer />} />
                <Route path="/explainers/backpropagation" element={<BackpropagationExplainer />} />
                <Route path="/explainers/feed-forward-networks" element={<FeedForwardExplainer />} />
                <Route path="/explainers/deep-learning-basics" element={<DeepLearningBasicsExplainer />} />
                <Route path="/explainers/perceptron" element={<PerceptronExplainer />} />
                <Route path="/explainers/embeddings" element={<EmbeddingsExplainer />} />
                <Route path="/explainers/activation-functions" element={<ActivationFunctionsExplainer />} />
                <Route path="/explainers/loss-functions" element={<LossFunctionsExplainer />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </div>
          <Footer />
        </div>
      </GlossaryProvider>
    </BrowserRouter>
  );
}
