# Environment setup

## Backend (Python 3.12, FastAPI)

This machine has no `python`/`py` launcher on PATH by default (only a
Windows Store stub). The project uses a dedicated conda environment
instead:

```powershell
& "$env:USERPROFILE\miniconda3\Scripts\conda.exe" create -n transformers-site python=3.12
& "$env:USERPROFILE\miniconda3\envs\transformers-site\python.exe" -m pip install -r backend/requirements.txt
```

`.vscode/settings.json` already points VS Code's Python extension at this
environment's interpreter.

Run the API:

```powershell
cd backend
& "$env:USERPROFILE\miniconda3\envs\transformers-site\python.exe" -m uvicorn app.main:app --reload
```

Or use the "Run backend (FastAPI)" VS Code task (Terminal > Run Task).

Run tests and lint:

```powershell
cd backend
& "$env:USERPROFILE\miniconda3\envs\transformers-site\python.exe" -m pytest
& "$env:USERPROFILE\miniconda3\envs\transformers-site\python.exe" -m ruff check .
& "$env:USERPROFILE\miniconda3\envs\transformers-site\python.exe" -m ruff format --check .
```

## Frontend (Node 24, Vite + React)

```powershell
cd frontend
npm install
npm run dev
```

Or use the "Run frontend (Vite)" VS Code task. Lint and build:

```powershell
cd frontend
npm run lint
npm run build
```

## Pre-commit hooks

Requires `pre-commit` (`pip install pre-commit` into any environment with
Python, or `pipx install pre-commit`).

```powershell
pre-commit install
pre-commit run --all-files
```
