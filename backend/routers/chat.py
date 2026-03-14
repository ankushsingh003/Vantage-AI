from fastapi import APIRouter

router = APIRouter()

@router.post("/chat")
async def chat_consultant():
    """Trigger the consultant chat (V1 stub)"""
    return {"message": "Hook for Chat Interface (V1 stub)"}
