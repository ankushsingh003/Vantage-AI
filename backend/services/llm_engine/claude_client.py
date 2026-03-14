import anthropic
import os
import logging

logger = logging.getLogger(__name__)

class ClaudeClient:
    """Wrapper for the Anthropic API to generate reports."""
    
    def __init__(self):
        # Allow running without API key for initial scaffolding/testing
        api_key = os.environ.get("CLAUDE_API_KEY", "mock_key")
        
        if api_key == "mock_key":
            logger.warning("No CLAUDE_API_KEY found. Running in MOCK mode.")
            self.mock_mode = True
        else:
            self.client = anthropic.AsyncAnthropic(api_key=api_key)
            self.mock_mode = False
            
    async def generate(self, prompt: str, max_tokens: int = 4000) -> str:
        """Sends a prompt to Claude and returns the generated text."""
        if self.mock_mode:
            return self._mock_response()
            
        logger.info("Sending request to Claude API...")
        try:
            response = await self.client.messages.create(
                model="claude-3-5-sonnet-20240620", # or whichever model preferred
                max_tokens=max_tokens,
                messages=[
                    {"role": "user", "content": prompt}
                ]
            )
            return response.content[0].text
        except Exception as e:
            logger.error(f"Error calling Claude API: {e}")
            return f"Error connecting to LLM Service: {str(e)}"
            
    def _mock_response(self) -> str:
        return """
# Consultancy Report (MOCK OUTPUT)

## 1. Executive Summary
This company is showing strong resilience in a volatile market. The ML model predicts **Growth** with 85% confidence.

## 2. Current Market Position
Operating in a highly competitive sector with a 5.2% CAGR. The company maintains a leading edge due to strong customer retention.

## 3. Growth / Saturation / Decline Analysis
The trajectory is upward, driven by recent expansions and a stable supply chain.

## 4. Key Risk Factors
- Inflationary pressures increasing costs.
- Aggressive new entrants (competitor delta: +4).

## 5. Strategic Recommendations
1. Secure long-term supply contracts.
2. Leverage high customer sentiment for upcoming launches.
3. Invest heavily in digital transformation.

## 6. 12-Month Outlook
Steady upward climb over the next 4 quarters, outperforming the industry baseline.
        """

claude_client = ClaudeClient()
