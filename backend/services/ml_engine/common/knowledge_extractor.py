import json
import logging
from typing import Dict, Any, List
from backend.services.llm_engine.gemini_client import gemini_client

logger = logging.getLogger(__name__)

class KnowledgeExtractor:
    """
    Uses Gemini to extract real-world financial data and market conditions 
    for training/simulating industry-specific ML models.
    """
    
    async def extract_industry_data(self, industry: str, quarter: str = "Q4", year: str = "2023") -> Dict[str, Any]:
        logger.info(f"[KnowledgeExtractor] Extracting deep financial data for {industry} ({quarter} {year})")
        
        prompt = f"""
        Role: Senior Financial Analyst & Market Intelligence Expert.
        Task: Extract/Synthesize a detailed dataset for the '{industry}' industry specifically for '{quarter} {year}'.
        
        CRITICAL INSTRUCTIONS:
        - The data MUST reflect the specific seasonality and macro-economic conditions of {quarter}. 
        - For example, if {quarter} is Q4, consider holiday spending or year-end budget exhaustion.
        - If Q1, consider new fiscal year allocations.
        - Ensure "quarterly_growth_yoy" and "income_statement" values vary significantly if the user switches quarters.
        
        Return a JSON object with:
        1. "market_conditions": {{ "demand_index": float(0-1), "supply_index": float(0-1), "inflation_impact": float }}
        2. "players": array of {{
            "name": string,
            "balance_sheet": {{ "total_assets": float, "total_liabilities": float, "equity": float }},
            "income_statement": {{ "revenue": float, "net_income": float, "operating_margin": float }},
            "quarterly_growth_yoy": float
           }}
        3. "industry_features": {{ 
            "descriptive_metric_name_1": float, 
            "descriptive_metric_name_2": float 
           }} (Use human-readable keys like "ink_availability" or "fpa_pipeline_health")
        
        Industry-specific focus:
        - If Printing: focus on Ink costs, paper shortage.
        - If Pharma: focus on R&D spend, FDA pipeline.
        - If Tech: focus on Chip supply, AI investment.
        - If Cosmetics: focus on Consumer sentiment, brand equity.
        
        Output ONLY valid JSON.
        """
        
        try:
            res = await gemini_client.generate(prompt)
            print(f"DEBUG: [KnowledgeExtractor] RAW response: {res[:500]}...")
            
            import re
            # Find the largest {...} block
            match = re.search(r"(\{.*\})", res, re.DOTALL)
            if match:
                clean_json = match.group(1)
            else:
                clean_json = res.strip()
                
            data = json.loads(clean_json)
            print(f"DEBUG: [KnowledgeExtractor] SUCCESS parsed JSON for {industry} ({quarter})")
            return data
        except Exception as e:
            print(f"DEBUG: [KnowledgeExtractor] FAILED: {str(e)}")
            logger.error(f"[KnowledgeExtractor] Failed to extract data for {industry}: {e}")
            return self._get_fallback_data(industry, quarter)

    def _get_fallback_data(self, industry: str, quarter: str) -> Dict[str, Any]:
        """Provides plausible static data with slight quarterly variance if LLM fails."""
        q_map = {"Q1": 0.95, "Q2": 1.05, "Q3": 1.02, "Q4": 1.0}
        factor = q_map.get(quarter, 1.0)
        
        # Custom descriptive features for each industry fallback
        industry_metrics = {
            "printing": {"ink_cost_index": 0.8, "paper_supply_resilience": 0.4},
            "pharma": {"fda_pipeline_health": 0.7, "rd_efficiency": 0.6},
            "tech": {"chip_supply_stability": 0.5, "ai_adoption_rate": 0.9},
            "cosmetics": {"brand_loyalty_index": 0.8, "raw_material_availability": 0.5}
        }
        
        return {
            "market_conditions": {
                "demand_index": round(0.7 * factor, 2),
                "supply_index": round(0.6 / factor, 2),
                "inflation_impact": 0.04
            },
            "players": [
                {
                    "name": f"{industry.capitalize()} Leader A",
                    "balance_sheet": {"total_assets": 1000000, "total_liabilities": 400000, "equity": 600000},
                    "income_statement": {"revenue": 500000 * factor, "net_income": 50000 * factor, "operating_margin": 0.1},
                    "quarterly_growth_yoy": 0.05 * factor
                }
            ],
            "industry_features": industry_metrics.get(industry, {"market_volatility": 0.5, "digital_readiness": 0.6})
        }

knowledge_extractor = KnowledgeExtractor()
