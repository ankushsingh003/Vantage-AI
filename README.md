# ⚡ Vantage AI — Market Intelligence Engine

An enterprise-grade, AI-powered platform for generating real-time strategic consultancy reports, analyzing competitive landscapes, and surfacing predictive financial models across multiple industries.

## 🚀 Features

- **Automated Consultancy Reports**: Generate comprehensive, board-ready strategic reports instantly for 15+ industries (Tech, Pharma, Oil & Gas, Finance, etc.).
- **Live Contextual RAG**: Retrieves real-time data, filings, and macroeconomic metrics to feed into the Gemini 2.0 Flash generation pipeline.
- **Predictive ML Ensembles**: Four-model ensemble architecture for forecasting market volatility, CAGR, and competitor trajectory.
- **Dynamic PDF Rendering**: On-the-fly generation of stylized PDF dossiers containing data visualizations, markdown tables, and comprehensive analysis.
- **Agentic Chat Interface**: Instantly surface industry "Intelligence Assets" by interacting with a natural-language AI consultant.
- **Responsive Analytics Dashboard**: Built with Next.js, Framer Motion, and Tailwind CSS. Fully responsive layout ranging from mobile to ultra-wide displays.

## 🛠️ Tech Stack

### Frontend
- **Next.js 14** (App Router, Server Actions)
- **React & TypeScript**
- **Tailwind CSS** (Custom responsive bento-grids, glassmorphism UI)
- **Framer Motion** (Micro-interactions and data visualization animations)
- **Lucide React** (Vector iconography)

### Backend
- **FastAPI** (Python 3.10+)
- **Google Gemini 2.0 Flash SDK** (LLM inference)
- **ReportLab & Markdown rendering pipelines** (PDF generation)
- **Pandas & Scikit-learn** (Data processing and mock predictive ensembles)

## 🏁 Getting Started

### Prerequisites
- Node.js (v18+)
- Python (3.10+)
- Google Gemini API Key

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Create a virtual environment and install dependencies:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   pip install -r requirements.txt
   ```
3. Create a `.env` file in the `backend/` directory:
   ```env
   GEMINI_API_KEY=your_api_key_here
   ```
4. Start the FastAPI server:
   ```bash
   uvicorn main:app --reload --port 8000
   ```

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env.local` file (optional if your backend runs on port 8000):
   ```env
   NEXT_PUBLIC_BACKEND_URL=http://localhost:8000
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

## 📈 Recent Updates
- Transitioned to the `gemini-2.0-flash` model for 4x faster intelligence synthesis.
- Rebuilt frontend with robust, mobile-first responsive design principles.
- Added instant zero-latency intelligence card surfacing in the chat interface.

---

*Powered by Google Gemini · Built for the Future of Strategy*
