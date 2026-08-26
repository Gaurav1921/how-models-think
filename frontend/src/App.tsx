import { BrowserRouter, Route, Routes } from "react-router-dom";
import { NavBar } from "./components/layout/NavBar";
import { Footer } from "./components/layout/Footer";
import { ScrollProgressBar } from "./components/layout/ScrollProgressBar";
import { ScrollToTop } from "./components/layout/ScrollToTop";
import { Home } from "./routes/Home";
import { About } from "./routes/About";
import { Learn } from "./routes/Learn";
import { LearnDomain } from "./routes/LearnDomain";
import { Timeline } from "./routes/Timeline";
import { BlogIndex } from "./routes/BlogIndex";
import { BlogPost } from "./routes/BlogPost";
import { TransformersExplainer } from "./routes/TransformersExplainer";
import { RNNExplainer } from "./routes/explainers/RNNExplainer";
import { BackpropagationExplainer } from "./routes/explainers/BackpropagationExplainer";
import { FeedForwardExplainer } from "./routes/explainers/FeedForwardExplainer";
import { DeepLearningBasicsExplainer } from "./routes/explainers/DeepLearningBasicsExplainer";
import { PerceptronExplainer } from "./routes/explainers/PerceptronExplainer";
import { EmbeddingsExplainer } from "./routes/explainers/EmbeddingsExplainer";
import { ActivationFunctionsExplainer } from "./routes/explainers/ActivationFunctionsExplainer";
import { LossFunctionsExplainer } from "./routes/explainers/LossFunctionsExplainer";
import { NotFound } from "./routes/NotFound";
import { GlossaryProvider } from "./lib/GlossaryContext";

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
          </div>
          <Footer />
        </div>
      </GlossaryProvider>
    </BrowserRouter>
  );
}
