# 📈 Market Intelligence Platform (V2 Strategy Engine)

[![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com)
[![Engine: Gemini 1.5 Flash](https://img.shields.io/badge/Engine-Gemini_1.5_Flash-emerald?style=flat-square&logo=google-gemini)](https://deepmind.google/technologies/gemini/)
[![Tech: FastAPI](https://img.shields.io/badge/Backend-FastAPI-009688?style=flat-square&logo=fastapi)](https://fastapi.tiangolo.com/)
[![Tech: Next.js](https://img.shields.io/badge/Frontend-Next.js-black?style=flat-square&logo=nextdotjs)](https://nextjs.org/)

**A premium, enterprise-grade Market Intelligence & Predictive Analytics platform.** This system synthesizes real-time market signals, industry-specific ML modeling, and RAG-driven research into "Board-Ready" strategic consultancy reports.

---

## 🚀 System Architecture & Workflow

### 🧠 Intelligence Path (RAG to PPT/PDF)
The platform uses a sophisticated multi-stage pipeline to transform raw market noise into actionable strategy.

```mermaid
graph TD
    A[User Query / Industry Target] --> B{Intelligence RAG}
    B -->|Fetch| C[Pinecone / Industry Research]
    B -->|Synthesize| D[Gemini 1.5 Flash]
    D --> E[Market Signal Extraction]
    E --> F{ML Ensemble Engine}
    F -->|Analyze| G[Shapley Attributions]
    F -->|Forecast| H[LSTM/Prophet Time-Series]
    G & H --> I[Strategic Verdict Synthesis]
    I --> J[Elite PDF Renderer]
    J --> K((Board-Ready Asset))
```

### 📂 Monorepo Structure
```mermaid
graph LR
    Root[market-intelligence-platform]
    Root --> Backend[backend/]
    Root --> Frontend[frontend/]
    
    Backend --> ML[services/ml_engine/]
    Backend --> LLM[services/llm_engine/]
    Backend --> PDF[services/pdf_engine/]
    
    Frontend --> App[app/dashboard/]
    Frontend --> Screens[app/reports/]
```

---

## ✨ Elite Feature Suite

- **💎 Partner-Level Consultancy**: Reports adopt a "Big Three" (McKinsey/BCG) strategic voice.
- **🔍 AI-Powered Explainability**: Real-time SHAP attributions visualize EXACTLY what drives market movements.
- **📊 Industry-Specific ML**: Custom inference engines for Pharmaceuticals, Tech, Cosmetics, and Printing.
- **🎙️ Intelligence RAG**: Deep-dive conversational interface querying thousands of synthesized market points.
- **📄 Pro PDF Generation**: Automated 3-page strategic masterplans with custom Emerald-on-Slate styling.

---

## 🛠️ Tech Stack

- **Backend**: Python 3.11, FastAPI, Uvicorn, Pydantic V2.
- **AI/ML**: Google Gemini 1.5 Flash, XGBoost, Scikit-learn, MLflow (Observability).
- **Frontend**: Next.js 14 (App Router), TypeScript, TailwindCSS, Framer Motion (Animations).
- **Data/Infra**: PostgreSQL, Redis, Docker, Render Blueprints.

---

## ⚙️ Local Setup

### 1. Backend
```bash
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
uvicorn backend.main:app --reload
```

### 2. Frontend
```bash
cd frontend
npm install
npm run dev
```

**Required Environment Variables (`.env`):**
- `GEMINI_API_KEY`: Your Google AI Studio key.
- `NEXT_PUBLIC_BACKEND_URL`: `http://localhost:8000` (Local).

---

## 🚢 Deployment (Render)

This project is cloud-ready with a pre-configured `render.yaml` Blueprint.

1. Push this repository to your GitHub.
2. On **Render Dashboard**, click **New +** ➔ **Blueprint**.
3. Select this repository.
4. Set the `GEMINI_API_KEY` in the service environment variables.
5. Launch!

---

## 📜 License
Privately developed for high-fidelity market research. All Rights Reserved.
