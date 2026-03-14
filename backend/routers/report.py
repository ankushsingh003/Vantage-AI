from fastapi import APIRouter, Response
import logging
from backend.services.pdf_engine.renderer import pdf_renderer

logger = logging.getLogger(__name__)

router = APIRouter()

@router.get("/report/download/{report_id}")
async def download_report(report_id: str):
    """Generates and returns the PDF report for download."""
    
    # Mock report data - in real app, fetch from DB by ID
    mock_markdown = f"""
# Strategic Analysis Report
## ID: {report_id}

### Executive Summary
This report provides a comprehensive overview of the market intelligence gathered for the current period.

### Key Insights
- Market volatility remains high but stabilized in Q2.
- Consumer sentiment in the Cosmetics sector shows a 12% increase in sustainability interest.
- Supply chain logistics have improved by 8%.

### Recommendation
Strategic investment in R&D for organic product lines is recommended based on the ensemble model predictions.
"""
    
    logger.info(f"Generating PDF for report ID: {report_id}")
    try:
        pdf_bytes = await pdf_renderer.render(
            report_markdown=mock_markdown,
            company_name="Vantage Corp",
            industry="Cosmetics & Beauty"
        )
        logger.info(f"Successfully rendered PDF, size: {len(pdf_bytes)}")
        
        return Response(
            content=bytes(pdf_bytes), # type: ignore
            media_type="application/pdf",
            headers={
                "Content-Disposition": f"attachment; filename=Vantage_Report_{report_id}.pdf"
            }
        )
    except Exception as e:
        logger.error(f"Error generating PDF: {e}")
        raise e

@router.post("/report")
async def generate_pdf_only():
    """Trigger just the PDF Engine on existing data."""
    return {"message": "Hook for PDF generation (V1 stub)"}
