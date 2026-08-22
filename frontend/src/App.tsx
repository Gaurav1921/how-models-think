import { BrowserRouter, Route, Routes } from "react-router-dom";
import { NavBar } from "./components/layout/NavBar";
import { Footer } from "./components/layout/Footer";
import { Home } from "./routes/Home";
import { About } from "./routes/About";
import { Timeline } from "./routes/Timeline";
import { BlogIndex } from "./routes/BlogIndex";
import { BlogPost } from "./routes/BlogPost";
import { TransformersExplainer } from "./routes/TransformersExplainer";
import { RNNExplainer } from "./routes/explainers/RNNExplainer";
import { BackpropagationExplainer } from "./routes/explainers/BackpropagationExplainer";
import { FeedForwardExplainer } from "./routes/explainers/FeedForwardExplainer";
import { NotFound } from "./routes/NotFound";
import { GlossaryProvider } from "./lib/GlossaryContext";

/** Root application component: router and page shell. */
export function App() {
  return (
    <BrowserRouter>
      <GlossaryProvider>
        <div className="flex min-h-screen flex-col">
          <NavBar />
          <div className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/timeline" element={<Timeline />} />
              <Route path="/blog" element={<BlogIndex />} />
              <Route path="/blog/:slug" element={<BlogPost />} />
              <Route path="/transformers" element={<TransformersExplainer />} />
              <Route path="/explainers/rnn" element={<RNNExplainer />} />
              <Route path="/explainers/backpropagation" element={<BackpropagationExplainer />} />
              <Route path="/explainers/feed-forward-networks" element={<FeedForwardExplainer />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </GlossaryProvider>
    </BrowserRouter>
  );
}
