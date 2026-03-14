import asyncio
import sys
import os

# Add the parent directory to Python path to allow running directly
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from backend.core.orchestrator import orchestrator

async def main():
    print("=== Testing Market Intelligence Orchestrator ===\n")
    
    # Mock Input
    company_input = {
        "company_name": "Lumière Cosmetics",
        "industry": "cosmetics",
        "region": "Global",
        "revenue": 12500000,
        "debt_equity_ratio": 0.4,
        "gross_margin": 68.5,
        "historical_financials": [
            {"quarter": "Q1", "revenue": 10000000},
            {"quarter": "Q2", "revenue": 10500000},
            {"quarter": "Q3", "revenue": 11200000},
            {"quarter": "Q4", "revenue": 12500000}
        ]
    }
    
    print(f"Triggering analysis for {company_input['company_name']}...\n")
    
    result = await orchestrator.run_full_analysis(company_input)
    
    print("\n=== Results ===")
    print(f"Status: {result['status']}")
    print(f"ML Verdict: {result['ml_verdict']['label']} ({result['ml_verdict']['confidence']} conf)")
    print(f"PDF Generated at: {result['pdf_url']}")
    print(f"\n--- Claude Report Snippet ---")
    print(result['report_markdown'][:300] + "...\n")
    
if __name__ == "__main__":
    asyncio.run(main())
