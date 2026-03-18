from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List, Optional
import logging
from backend.services.market_engine.kb_service import kb_service
from backend.services.llm_engine.gemini_client import gemini_client

router = APIRouter()
logger = logging.getLogger(__name__)

class RAGQuery(BaseModel):
    query: str
    industry: Optional[str] = "Restaurants"
    context_window: Optional[int] = 3

class RAGResponse(BaseModel):
    answer: str
    sources: List[str]
    confidence: float

@router.post("/query", response_model=RAGResponse)
async def query_intelligence(payload: RAGQuery):
    """
    Retrieval-Augmented Generation endpoint for deep market intelligence.
    Uses ChromaDB for context and Gemini/Groq for synthesis.
    """
    logger.info(f"[RAG] Processing query: {payload.query} (Industry: {payload.industry})")
    
    # 1. Retrieve Context from ChromaDB
    try:
        context_fragments = kb_service.retrieve_context(payload.industry, payload.query, n_results=payload.context_window)
        context_text = "\n".join([f"- {f}" for f in context_fragments]) if context_fragments else "No specific sectoral data found in latent store."
    except Exception as e:
        logger.warning(f"[RAG] ChromaDB retrieval failed: {e}")
        context_text = "Primary context retrieval unavailable."
        context_fragments = []
    
    prompt = f"""
    Role: Senior Market Intelligence Strategist.
    Context from Market Intelligence Store ({payload.industry}):
    {context_text}
    
    User Query: {payload.query}
    
    Task: Use the provided context AND your expansive market knowledge to provide an authoritative, data-driven answer.
    Cite numbers from the context (e.g., $3,215 volume) if available.
    
    FORMATTING RULES:
    1. Use clear headers (###) for sections.
    2. Use bullet points ( - ) for insights.
    3. Bold key metrics.
    
    Structure:
    - Executive Summary
    - Data-Grounded Insights
    - Strategic Recommendations
    """
    
    try:
        response_text = await gemini_client.generate(prompt)
        
        return RAGResponse(
            answer=response_text,
            sources=[f"{payload.industry} Vector Store", "Square POS Analytics"],
            confidence=0.92 if context_fragments else 0.70
        )
    except Exception as e:
        logger.error(f"[RAG] Error: {e}")
        raise HTTPException(status_code=500, detail="Intelligence Engine failed")
