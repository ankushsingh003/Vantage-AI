"""
WebSocket endpoint that streams Kafka market signals to the browser in real-time.
"""
import asyncio
import json
import logging
from fastapi import APIRouter, WebSocket, WebSocketDisconnect
from backend.services.market_engine.kafka_producer import produce_market_signal

logger = logging.getLogger(__name__)
router = APIRouter()


@router.websocket("/ws/signals/{industry}/{company}")
async def market_signals_ws(websocket: WebSocket, industry: str, company: str):
    """
    WebSocket endpoint that continuously streams live market signals.
    Frontend connects with: ws://localhost:8000/ws/signals/{industry}/{company}
    """
    await websocket.accept()
    logger.info(f"[WS] Client connected for {company} / {industry}")
    try:
        while True:
            signal = await produce_market_signal(industry, company)
            await websocket.send_text(json.dumps(signal))
            await asyncio.sleep(2.5)  # Push a signal every 2.5 seconds
    except WebSocketDisconnect:
        logger.info(f"[WS] Client disconnected for {company} / {industry}")
    except Exception as e:
        logger.error(f"[WS] Error: {e}")
        await websocket.close()
