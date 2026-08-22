---
slug: why-context-engineering-matters
title: "Why context engineering matters: what happens when you just add more text"
summary: "A model with a perfect prompt still fails if it gets the wrong information. A look at the research behind why context has to be engineered, not just enlarged."
date: 2026-08-26
tags: ["context-engineering", "rag", "long-context"]
---

It is tempting to think of a model's context window as a simple storage problem: if a
model can accept 200,000 or even a million tokens, just put everything relevant in there
and let the model sort it out. Real research on how models use long contexts says
otherwise, and understanding why is the whole reason context engineering exists as a
discipline separate from prompt engineering.

## The "lost in the middle" problem

In 2023, researchers at Stanford and elsewhere (Liu, Lin, Hewitt, Paranjape, Bevilacqua,
Petroni, and Liang) published a study called "Lost in the Middle: How Language Models
Use Long Contexts." They tested models on tasks like multi-document question answering,
where the correct answer depends on one relevant document buried among several
irrelevant ones, and varied where in the input the relevant document appeared.

The result was a clear U-shaped curve. Models were most accurate when the relevant
information was at the very beginning or the very end of the input, and accuracy dropped
noticeably, by more than 30 percentage points in some tests, when the same information
sat in the middle of a long context. This pattern held across multiple model families,
including both open and closed models available at the time. In other words, giving a
model more text does not just add information for free. Where you put that information
inside the context changes whether the model actually uses it.

This is why context engineering is a distinct problem from having a bigger context
window. Even as commercial models pushed context limits into the hundreds of thousands
and then millions of tokens through 2024, the question of what to put in the context and
in what order did not go away. A bigger window gives you more room to make the same
mistake.

## Retrieval instead of "just include everything"

The standard answer to this problem is retrieval-augmented generation, or RAG: instead of
stuffing a model's context with every document that might be relevant, a separate
retrieval step searches a knowledge base for the specific passages most relevant to the
current question, and only those get placed into the prompt. The idea traces back to a
2020 paper from Meta AI researchers (Lewis et al.), and it became a standard part of
production LLM applications through 2023 as teams ran into the limits of what a model's
training data covered and needed a reliable way to ground answers in current or private
information.

Retrieval does two things at once. It reduces how much irrelevant text the model has to
sift through, which directly addresses the lost-in-the-middle problem by keeping the
context shorter and more focused. And it lets an application answer questions about
information the model was never trained on, like a company's internal documentation or
yesterday's news, without retraining anything.

## What this means in practice

Context engineering is the set of decisions that determine what a model sees before it
sees your prompt: what gets retrieved, how it gets ranked, where it gets placed in the
context, and what gets left out or summarized. None of this is about phrasing. A model
can have a perfectly engineered prompt and still give a wrong or generic answer if the
context handed to it buried the one relevant fact in the middle of ten irrelevant ones,
or omitted it entirely.

This is also why context engineering keeps mattering even as context windows keep
growing. More room to include text is not the same as a good strategy for deciding what
belongs there and where.
