from fpdf import FPDF
import logging
import os
from datetime import datetime

logger = logging.getLogger(__name__)

class PDFRenderer:
    """Converts the report data into a beautiful PDF using FPDF2 (no system deps required)."""
    
    async def render(self, report_markdown: str, company_name: str, industry: str) -> bytes:
        logger.info(f"Rendering PDF for {company_name} using FPDF2...")
        
        pdf = FPDF()
        pdf.add_page()
        
        # Header
        pdf.set_font("helvetica", "B", 24)
        pdf.set_text_color(26, 54, 93) # Dark blue
        pdf.cell(0, 20, "Vantage AI Market Report", ln=True, align="C")
        
        pdf.set_font("helvetica", "B", 16)
        pdf.set_text_color(43, 108, 176)
        pdf.cell(0, 10, f"{company_name} - {industry} Sector", ln=True, align="C")
        
        pdf.set_font("helvetica", "I", 10)
        pdf.set_text_color(113, 128, 150)
        pdf.cell(0, 10, f"Generated on: {datetime.now().strftime('%B %d, %Y')}", ln=True, align="C")
        pdf.ln(10)
        
        # Content Parsing (Simple Line-based Markdown Mock)
        pdf.set_font("helvetica", size=11)
        pdf.set_text_color(51, 51, 51)
        
        lines = report_markdown.split("\n")
        for line in lines:
            if not line.strip():
                pdf.ln(2)
                continue
                
            if line.startswith("# "):
                pdf.set_font("helvetica", "B", 18)
                pdf.cell(0, 12, line[2:], ln=True)
                pdf.set_font("helvetica", size=11)
            elif line.startswith("## "):
                pdf.set_font("helvetica", "B", 14)
                pdf.cell(0, 10, line[3:], ln=True)
                pdf.set_font("helvetica", size=11)
            elif line.startswith("### "):
                pdf.set_font("helvetica", "B", 12)
                pdf.cell(0, 8, line[4:], ln=True)
                pdf.set_font("helvetica", size=11)
            else:
                pdf.multi_cell(0, 6, line)
                pdf.ln(2)

        # Footer
        pdf.set_y(-25)
        pdf.set_font("helvetica", "I", 8)
        pdf.set_text_color(128, 128, 128)
        pdf.cell(0, 10, "Confidential - Vantage AI Market Intelligence Platform", align="C")
        
        return pdf.output()

pdf_renderer = PDFRenderer()
