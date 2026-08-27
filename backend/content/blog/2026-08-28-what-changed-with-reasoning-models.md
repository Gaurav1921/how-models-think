---
slug: what-changed-with-reasoning-models
title: "What changed with reasoning models"
summary: "A plain-language look at inference-time reasoning: what it is, why it showed up when it did, and how it differs from just using a bigger model."
date: 2026-08-28
tags: ["reasoning", "inference-time-scaling"]
---

For years, the main way to make a language model better was to make it bigger: more
parameters, more training data, more compute spent during training. That trend produced
GPT-2, then GPT-3, then GPT-4, each one larger and more capable than the last. Starting
in 2024, a second lever showed up alongside it: spending more compute at the moment the
model answers your question, not just during training. This post explains what that
means and why it is a genuinely different idea, not just a rebrand of an old one.

## Thinking longer before answering

The core trick behind "reasoning models" is not new in principle. Researchers had
already shown, in a 2022 paper on chain-of-thought prompting by Jason Wei and
colleagues, that asking a model to write out its intermediate reasoning steps before
giving a final answer made it noticeably better at math and logic problems, even without
changing the model itself. What changed with models like OpenAI's o1, whose preview
shipped in September 2024 ahead of a full release that December, is that this behavior
got trained into the model directly, using
reinforcement learning, rather than relying on a user to prompt for it. The model
learns, from its own training process, when a problem calls for a long chain of internal
reasoning and when a short direct answer is fine.

This approach is often called "inference-time scaling" or "test-time compute," because
the extra computation happens at the moment you ask the question (inference time), not
while the model is being trained. A simple factual question still gets answered quickly.
A hard math or coding problem might cause the model to generate thousands of tokens of
internal reasoning, checking its own work and backtracking, before it produces the
answer you actually see. That reasoning process costs more time and more compute per
answer, which is the real tradeoff: reasoning models are typically slower and more
expensive to run than a standard model of similar size, in exchange for meaningfully
better accuracy on problems that benefit from step-by-step work.

## It spread fast, including to open models

This was not a one-company idea. In January 2025, the Chinese AI lab DeepSeek released
R1, an open-weights reasoning model trained largely through reinforcement learning, that
matched OpenAI's o1 on a range of benchmarks while reportedly costing far less to train,
and unlike o1 at the time, it showed users its full chain of reasoning rather than
hiding it. That release mattered beyond the benchmark scores: it showed inference-time
reasoning was a general technique other labs could reproduce, not something only one
company's training pipeline could produce, and it put a capable reasoning model into the
hands of anyone who wanted to download and run it themselves.

Through 2025, reasoning had stopped being a separate, specialized model you had to
choose. Anthropic's Claude 4 models shipped in May 2025 with hybrid reasoning built in,
and OpenAI's GPT-5 followed in August with its own auto-routing between a fast direct
answer and an extended reasoning pass, instead of asking the user to pick between two
different model names.

## Why this matters if you are building with these models

If you have noticed a model take noticeably longer to answer a hard question, or seen an
option labeled "thinking" or "extended reasoning," this is what is happening underneath.
It is worth knowing because it changes how you should think about cost and latency: a
harder question is not just harder for the model to get right, it may now also be
literally more expensive to ask, since the model is spending more compute answering it.
