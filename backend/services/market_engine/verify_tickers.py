import asyncio
import sys
import os

# Add the project root to sys.path
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "..", "..")))

from backend.services.market_engine.competitor_analyzer import competitor_analyzer
from backend.services.llm_engine.gemini_client import gemini_client

async def verify_tickers():
    print("--- Starting Ticker Verification ---")
    
    # Force mock mode for deterministic testing if needed, 
    # but here we want to see if our mock logic works too.
    gemini_client.mock_mode = True
    
    industries = ["oil", "tech", "pharma"]
    
    for industry in industries:
        print(f"\nAnalyzing industry: {industry}")
        result = await competitor_analyzer.get_industry_intelligence(industry)
        
        competitors = result.get("competitors", [])
        if not competitors:
            print(f"FAILED: No competitors returned for {industry}")
            continue
            
        for comp in competitors:
            name = comp.get("name")
            ticker = comp.get("ticker")
            share = comp.get("market_share")
            
            if not ticker or ticker == "TICKER":
                print(f"FAILED: Missing or placeholder ticker for {name}")
            else:
                print(f"PASS: {name} -> {ticker} ({share}%)")

if __name__ == "__main__":
    asyncio.run(verify_tickers())
