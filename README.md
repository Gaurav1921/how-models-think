# How Models Think

A visual, plain-language site explaining neural networks, transformers,
attention, and how large language models work, in the spirit of
3Blue1Brown's style of explanation. It covers "Attention Is All You Need,"
the foundations behind it (RNNs, backpropagation, feed-forward networks),
a timeline of how we got from rule-based systems to modern LLMs, an inline
glossary of ML terms, and a blog on prompt, context, harness, and agent
engineering.

## Quickstart

See [docs/ENVIRONMENT_SETUP.md](docs/ENVIRONMENT_SETUP.md) for full setup.
Short version:

```powershell
# Backend
cd backend
& "$env:USERPROFILE\miniconda3\envs\transformers-site\python.exe" -m uvicorn app.main:app --reload

# Frontend, in a second terminal
cd frontend
npm install
npm run dev
```

Then open http://localhost:5173.

## Project standards

See [CLAUDE.md](CLAUDE.md) for coding, writing, and security standards
that apply throughout this repository.
