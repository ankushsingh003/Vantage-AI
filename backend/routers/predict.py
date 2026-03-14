from fastapi import APIRouter

router = APIRouter()

@router.post("/predict")
async def predict_only():
    """Trigger just the ML Engine."""
    return {"message": "Hook for ML-only prediction (V1 stub)"}
