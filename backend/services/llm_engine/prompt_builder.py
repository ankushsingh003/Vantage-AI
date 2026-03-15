class PromptBuilder:
    """
    Constructs the dynamic system prompt based on results from all other engines.
    """
    
    def build_consultancy_prompt(self, ml_output: dict, market_data: dict, company_input: dict) -> str:
        industry = company_input.get("industry", "Unknown Sector")
        company_name = company_input.get("company_name", "the company")
        
        return f"""
You are a senior strategy consultant specializing in the {industry} industry. 
Analyze the following data for {company_name} and produce a full, highly professional consultancy report.

1. DATA INPUTS

--- ML Model Verdict ---
Prediction: {ml_output.get('label', 'Unknown')}
Confidence Score: {ml_output.get('confidence', 0.0)}
Trajectory Forecast (LSTM): {ml_output.get('forecast_summary', 'N/A')}

--- Macroeconomic Context ---
Region: {market_data.get('macro', {}).get('region', 'N/A')}
GDP Growth: {market_data.get('macro', {}).get('gdp_growth', 'N/A')}%
Inflation Rate: {market_data.get('macro', {}).get('inflation_rate', 'N/A')}%
Summary finding: {market_data.get('macro', {}).get('summary', 'N/A')}

--- Microeconomic Factors ---
Industry CAGR: {market_data.get('micro', {}).get('industry_cagr', 'N/A')}%
Competitor Delta: {market_data.get('micro', {}).get('competitor_count_delta', 'N/A')}
Summary finding: {market_data.get('micro', {}).get('summary', 'N/A')}

--- Customer Sentiment Signals ---
Score (0-1): {market_data.get('sentiment', {}).get('social_sentiment_score', 'N/A')}
Trending Topics: {', '.join(market_data.get('sentiment', {}).get('trending_topics', []))}
Summary Finding: {market_data.get('sentiment', {}).get('summary', 'N/A')}

--- Provided Company Financials (Raw) ---
Revenue: {company_input.get('revenue', 'N/A')}
Debt/Equity Ratio: {company_input.get('debt_equity_ratio', 'N/A')}
Gross Margin: {company_input.get('gross_margin', 'N/A')}%

2. TASK INSTRUCTIONS

Using the data above, produce a comprehensive consultancy report formatted in clear Markdown. 
It MUST include exactly these top-level sections for the PDF generator to parse correctly:

# INDUSTRY GROWTH & MARKET INSIGHTS
(Analyze the broader sectoral trends using the Macro/Micro data provided)

# COMPANY-SPECIFIC FINANCIAL ANALYSIS
(Deep dive into the company's financials, margins, and its standing relative to the industry)

# STRATEGIC CONSULTANCY VERDICT
(Provide your expert strategic assessment based on the ML prediction and trajectory)

# ACTIONABLE RECOMMENDATIONS
(Provide 3-5 specific, high-impact recommendations to improve growth or mitigate risk)

Do not use conversational filler. Output ONLY the report text in Markdown starting from the first heading.
"""

prompt_builder = PromptBuilder()
