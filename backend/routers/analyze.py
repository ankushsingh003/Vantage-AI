from fastapi import APIRouter
from pydantic import BaseModel
from typing import Optional, List, Dict, Any

from backend.core.orchestrator import orchestrator

router = APIRouter()

class CompanyInput(BaseModel):
    company_name: str
    industry: str
    region: Optional[str] = "Global"
    revenue: Optional[float] = 0.0
    debt_equity_ratio: Optional[float] = 0.0
    gross_margin: Optional[float] = 0.0
    historical_financials: Optional[List[Dict[str, Any]]] = []

@router.post("/analyze")
async def trigger_full_analysis(payload: CompanyInput):
    """
    Kicks off the full pipeline: Data -> ML -> LLM -> PDF
    """
    result = await orchestrator.run_full_analysis(payload.model_dump())
    return result
