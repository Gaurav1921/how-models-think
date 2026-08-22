---
slug: few-shot-prompting-and-system-prompts
title: "Prompt engineering in practice: few-shot examples, system prompts, and output formatting"
summary: "A closer look at the three tools that do most of the work in prompt engineering, with concrete examples of each."
date: 2026-08-24
tags: ["prompt-engineering", "few-shot", "system-prompts"]
---

Our last post laid out where prompt engineering sits relative to context, harness, and
agent engineering. This post goes deeper on the discipline itself: three specific
techniques that account for most of what "writing a good prompt" actually means in
practice. None of them are exotic. All three are things you can try in a chat window
right now.

## Zero-shot versus few-shot

A "zero-shot" prompt asks a model to do a task with no examples, just an instruction.
Most simple requests work fine zero-shot: "summarize this email" or "translate this to
French" rarely need help. But for tasks where the output format or the judgment call is
unusual, showing the model a few worked examples before your real question, a "few-shot"
prompt, tends to produce more consistent results than describing the format in words
alone.

For example, if you want a model to classify support tickets into a specific set of
categories your team uses, describing the categories in a paragraph works less reliably
than giving it three or four example tickets, each paired with the category you would
assign. The model picks up the pattern from the examples rather than from your
description of it. This matters more as the task gets more idiosyncratic to your
situation, since the model has no way to infer your house style from an instruction
alone.

Few-shot prompting was one of the first widely documented behaviors of large language
models: GPT-3's original 2020 paper showed the model completing new tasks correctly from
just a handful of examples given in the prompt, with no retraining involved. That
capability is still the mechanism behind few-shot prompting today.

## System prompts

Most chat-based model APIs let you send a "system" message alongside the user's message,
a set of standing instructions that shape how the model behaves for the whole
conversation rather than for one message. A system prompt is where you put things that
should be true for every response: the persona to adopt, the tone to use, topics to
avoid, or a standing constraint like "always answer in under 200 words unless asked for
more."

The practical benefit of a system prompt over repeating instructions in every message is
consistency. If you tell a model once, in the system prompt, to always cite its sources,
you do not have to remember to ask for that on every single turn of a long
conversation. It also keeps your actual questions shorter and easier to read, since the
standing rules live in one place instead of being restated each time.

## Output formatting

Getting a model to answer in a specific, parseable shape, JSON with particular field
names, a markdown table, a numbered list with a fixed number of items, is its own
skill. The most reliable approach is to show the exact shape you want, not just describe
it. Pasting an empty or example JSON object into your prompt and asking the model to fill
it in tends to work better than writing "respond in JSON format" and hoping the model
guesses your schema correctly.

It also helps to say explicitly what to do when the task does not fit the format
cleanly, for example, what value to use for a field that has no good answer given the
input. Models are more likely to produce malformed output on edge cases you did not
anticipate than on the cases you tested.

## Where this fits

These three techniques operate entirely within a single model call: what you write, what
standing instructions you set, and what shape you ask for back. They do not touch what
information the model has access to in the first place, that is the job of context
engineering, which we will cover next.
