"""
Kafka Producer: Simulates streaming real-time market data signals
to the 'market-signals' topic for the backend to consume.
"""
import asyncio
import json
import logging
import random
import time
from datetime import datetime

logger = logging.getLogger(__name__)

MARKET_SIGNALS_TOPIC = "market-signals"

async def produce_market_signal(industry: str, company: str) -> dict:
    """
    Generates a mock real-time market signal and simulates publishing to Kafka.
    In production, this would use `confluent_kafka.Producer`.
    """
    signal = {
        "timestamp": datetime.utcnow().isoformat(),
        "industry": industry,
        "company": company,
        "signal_type": random.choice(["price_movement", "news_sentiment", "trade_volume", "competitor_event"]),
        "value": round(random.uniform(-5.0, 5.0), 3),
        "confidence": round(random.uniform(0.6, 0.99), 2),
        "source": random.choice(["Bloomberg", "Reuters", "SEC Filing", "SerpAPI", "Twitter/X"]),
    }
    
    # Simulate Kafka producer publish latency
    await asyncio.sleep(0.05)
    logger.info(f"[Kafka] → Produced to '{MARKET_SIGNALS_TOPIC}': {signal['signal_type']} | {signal['value']:+.3f} ({signal['source']})")
    return signal


async def stream_signals(industry: str, company: str, count: int = 5) -> list[dict]:
    """Simulate streaming `count` market signals from Kafka"""
    signals = []
    for _ in range(count):
        s = await produce_market_signal(industry, company)
        signals.append(s)
        await asyncio.sleep(0.1)
    return signals
