from fpdf import FPDF
import logging
import os
from datetime import datetime

logger = logging.getLogger(__name__)

class PDFRenderer:
    """Converts the report data into a beautiful PDF using FPDF2 (no system deps required)."""
    
    async def render(self, report_markdown: str, company_name: str, industry: str) -> bytes:
        logger.info(f"Rendering Premium PDF for {company_name}...")
        
        pdf = FPDF()
        pdf.set_auto_page_break(auto=True, margin=15)
        pdf.add_page()
        
        # --- Background Accent ---
        pdf.set_fill_color(248, 250, 252) # Light blue/gray
        pdf.rect(0, 0, 210, 40, "F")
        
        # --- Header ---
        pdf.set_font("helvetica", "B", 26)
        pdf.set_text_color(15, 23, 42) # Slate 900
        pdf.cell(0, 15, "STRATEGIC INTELLIGENCE REPORT", ln=True, align="L")
        
        pdf.set_font("helvetica", "B", 14)
        pdf.set_text_color(16, 185, 129) # Emerald 500
        pdf.cell(0, 10, f"{company_name.upper()} | {industry.upper()} SECTOR", ln=True, align="L")
        
        pdf.set_font("helvetica", "I", 9)
        pdf.set_text_color(100, 116, 139) # Slate 500
        pdf.cell(0, 5, f"Analysis Generated: {datetime.now().strftime('%d %b %Y, %H:%M')}", ln=True, align="L")
        pdf.ln(15)
        
        # --- Content Parsing ---
        pdf.set_text_color(30, 41, 59) # Slate 800
        
        lines = report_markdown.split("\n")
        print(f"DEBUG: Starting content parsing for {len(lines)} lines")
        for line in lines:
            line = line.strip()
            if not line:
                pdf.ln(4)
                continue
                
            if line.startswith("# "):
                pdf.ln(5)
                pdf.set_font("helvetica", "B", 18)
                pdf.set_text_color(15, 23, 42)
                # Bordered section header
                pdf.set_draw_color(16, 185, 129)
                pdf.set_line_width(0.8)
                pdf.line(pdf.get_x(), pdf.get_y()+10, pdf.get_x()+50, pdf.get_y()+10)
                pdf.cell(0, 12, line[2:].upper(), ln=True)
                pdf.ln(2)
                pdf.set_font("helvetica", size=11)
                pdf.set_text_color(30, 41, 59)
            elif line.startswith("## ") or line.startswith("### "):
                pdf.set_font("helvetica", "B", 13)
                pdf.cell(0, 10, line.strip("# "), ln=True)
                pdf.set_font("helvetica", size=11)
            elif line.startswith("- ") or line.startswith("* "):
                pdf.set_x(15)
                pdf.cell(5, 6, ">", ln=False) # Changed from bullet to > for safety
                pdf.multi_cell(0, 6, line[2:])
            else:
                pdf.multi_cell(0, 6, line)
        
        print("DEBUG: Content parsing complete")

        # --- Footer ---
        pdf.set_y(-20)
        pdf.set_font("helvetica", "I", 8)
        pdf.set_text_color(148, 163, 184) # Slate 400
        pdf.cell(0, 10, f"Page {pdf.page_no()} | Vantage AI Confidential", align="C")
        
        return pdf.output()

pdf_renderer = PDFRenderer()
