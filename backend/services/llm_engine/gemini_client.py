import google.generativeai as genai
import os
import logging
import dotenv
from typing import Optional
from groq import Groq

logger = logging.getLogger(__name__)

class GeminiClient:
    """
    Unified LLM Client.
    Prioritizes Groq (for speed & free tier) and falls back to Gemini.
    """
    
    def __init__(self):
        # Load from multiple potential .env locations for maximum reliability
        possible_envs = [
            os.path.join(os.getcwd(), ".env"),
            os.path.join(os.getcwd(), "backend", ".env"),
            os.path.join(os.path.dirname(__file__), "..", "..", ".env"),
            os.path.expanduser("~/.env")
        ]
        for env in possible_envs:
            if os.path.exists(env):
                dotenv.load_dotenv(env, override=True)
                logger.info(f"Loaded environment from {env}")

        # Initialize Groq (Primary) - prioritizing OS environment directly too
        self.groq_key = os.environ.get("GROQ_API_KEY") or os.environ.get("GROq_API_KEY")
        self.groq_client = None
        if self.groq_key:
            try:
                self.groq_client = Groq(api_key=self.groq_key)
                self.groq_model = "llama-3.3-70b-versatile"
                logger.info(f"Groq engine verified (Key prefix: {self.groq_key[:4]}...)")
            except Exception as e:
                logger.error(f"Failed to initialize Groq: {e}")

        # Initialize Gemini (Secondary/Fallback)
        self.gemini_key = os.environ.get("GEMINI_API_KEY")
        self.gemini_model = None
        if self.gemini_key:
            try:
                genai.configure(api_key=self.gemini_key)
                self.gemini_model = genai.GenerativeModel('gemini-2.0-flash')
                logger.info("Gemini initialized as secondary LLM engine.")
            except Exception as e:
                logger.error(f"Failed to initialize Gemini: {e}")

        self.mock_mode = not (self.groq_client or self.gemini_model)
        if self.mock_mode:
            logger.warning("No LLM keys found. Running in MOCK mode.")
            
    async def generate(self, prompt: str, max_tokens: int = 4000, retries: int = 5) -> str:
        """Sends a prompt to the best available LLM with fallbacks."""
        
        # 1. Try Groq (Primary)
        if self.groq_client:
            models_to_try = [self.groq_model, "llama-3.1-8b-instant", "llama3-70b-8192", "mixtral-8x7b-32768"]
            for model_name in models_to_try:
                try:
                    logger.info(f"Using Groq engine ({model_name})...")
                    chat_completion = self.groq_client.chat.completions.create(
                        messages=[{"role": "user", "content": prompt}],
                        model=model_name,
                        max_tokens=max_tokens,
                    )
                    return chat_completion.choices[0].message.content
                except Exception as e:
                    if "429" in str(e):
                        logger.warning(f"Groq {model_name} rate limited (429). Trying fallback model...")
                        import asyncio
                        await asyncio.sleep(0.5) # Tiny breather
                        continue
                    logger.warning(f"Groq engine ({model_name}) failed: {e}. Attempting next...")
                    if model_name == models_to_try[-1]:
                        break # All Groq models failed

        # 2. Try Gemini (Secondary)
        if self.gemini_model:
            import asyncio
            for attempt in range(retries):
                try:
                    logger.info(f"Using Gemini engine (Attempt {attempt + 1})...")
                    response = await self.gemini_model.generate_content_async(
                        prompt,
                        generation_config=genai.types.GenerationConfig(
                            max_output_tokens=max_tokens,
                        )
                    )
                    return response.text
                except Exception as e:
                    if "429" in str(e) and attempt < retries - 1:
                        wait_time = (2 ** attempt) + 1
                        await asyncio.sleep(wait_time)
                        continue
                    logger.error(f"Gemini fallback failed: {e}")
                    break

        # 3. Final Mock Fallback (only if all keys are missing or failing)
        if self.mock_mode:
            return self._mock_response(prompt)
            
        return "Error: All LLM services failed to respond."
            
    def _mock_response(self, prompt: str) -> str:
        # Minimal mock to avoid the "constant fixed" feeling
        return f"MOCK ENGINE: AI Intelligence for industry detected from prompt. (No API keys active). \n\nPrompt summary: {prompt[:100]}..."

gemini_client = GeminiClient()
