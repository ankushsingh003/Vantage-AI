from fpdf import FPDF
from datetime import datetime

def test_pdf():
    try:
        pdf = FPDF()
        pdf.add_page()
        pdf.set_font("helvetica", "B", 16)
        pdf.cell(0, 10, "Test Report", ln=True)
        pdf.set_font("helvetica", size=12)
        pdf.multi_cell(0, 10, "# Header\nThis is a test paragraph.\n## Subheader\nMore text.")
        res = pdf.output()
        print(f"Success! Bytes length: {len(res)}")
    except Exception as e:
        print(f"Failed: {e}")

if __name__ == "__main__":
    test_pdf()
