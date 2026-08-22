---
slug: prompt-engineering-basics
title: "What we mean by prompt, context, and harness engineering"
summary: "A short roadmap for the AI center: the four disciplines this blog will cover and how they fit together."
date: 2026-08-22
tags: ["prompt-engineering", "context-engineering", "harness-engineering", "agent-engineering", "roadmap"]
---

If you have spent any time around large language models, you have probably
heard "prompt engineering" used to mean everything from "typing a good
question" to "designing an entire multi-step agent." That looseness makes
the term less useful than it should be. This blog is going to treat four
related but distinct disciplines separately, and this post is a short map
of each one before we go deep on any of them.

**Prompt engineering** is the narrowest of the four: choosing the words,
structure, and examples you put directly in front of a model for a single
call, so that its output matches what you actually want. Few-shot examples,
system instructions, output formatting constraints, this is the layer
most people mean when they say "prompt engineering."

**Context engineering** is the layer above that: deciding what information
reaches the model at all, and in what order. A model with a perfect prompt
but the wrong documents, stale data, or a context window stuffed with
irrelevant history will still fail. This is retrieval, memory, and
summarization strategy, not word choice.

**Harness engineering** is the scaffolding around the model: the loop that
decides when to call the model again, which tools it can reach, how errors
get retried, and how state persists between calls. A model by itself
answers one question. A harness is what turns that into an agent that can
plan, act, observe, and continue.

**Agent engineering** sits on top of all three: designing the actual
multi-step behavior you want, how a task is decomposed, when to ask a human,
when to stop. It draws on prompt, context, and harness engineering as
building blocks rather than replacing them.

We are starting this site with the fundamentals, because none of the four
disciplines above make sense without a working mental model of what a
transformer actually does under the hood. Once that foundation is in place,
this blog will come back to prompt, context, harness, and agent engineering
one at a time, with the same visual, plain-language approach.
