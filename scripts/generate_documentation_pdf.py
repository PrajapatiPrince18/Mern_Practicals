import os
import re
import base64
from playwright.sync_api import sync_playwright
import pygments
from pygments.lexers import JavascriptLexer, BashLexer, JsonLexer, TextLexer
from pygments.formatters import HtmlFormatter

def get_base64_image(path):
    if os.path.exists(path):
        with open(path, "rb") as f:
            return "data:image/png;base64," + base64.b64encode(f.read()).decode("utf-8")
    return ""

def highlight_code(code_text, lang):
    lang = (lang or '').lower().strip()
    if lang in ['js', 'jsx', 'javascript', 'node']:
        lexer = JavascriptLexer()
    elif lang in ['bash', 'sh', 'shell', 'cmd']:
        lexer = BashLexer()
    elif lang in ['json']:
        lexer = JsonLexer()
    else:
        lexer = TextLexer()

    formatter = HtmlFormatter(style='one-dark', noclasses=True)
    highlighted = pygments.highlight(code_text, lexer, formatter)
    # Wrap in IDE container
    return f'<div class="code-editor-box">{highlighted}</div>'

def build_html():
    base_dir = os.path.abspath('.')
    md_file = os.path.join(base_dir, 'PRACTICAL_DOCUMENTATION.md')
    with open(md_file, 'r', encoding='utf-8') as f:
        content = f.read()

    # Base64 cache for all 13 real screenshots
    img_map = {}
    for i in range(1, 14):
        p = os.path.join(base_dir, 'assets', 'screenshots', f'output_{i:02d}.png')
        b64 = get_base64_image(p)
        img_map[f'./assets/screenshots/output_{i:02d}.png'] = b64
        img_map[f'assets/screenshots/output_{i:02d}.png'] = b64
        img_map[i] = b64

    html = """<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap');

  @page {
    size: A4;
    margin: 14mm 14mm 14mm 14mm;
    @bottom-right {
      content: "Page " counter(page);
      font-size: 8.5pt;
      color: #94a3b8;
      font-family: 'Plus Jakarta Sans', sans-serif;
    }
  }

  * { box-sizing: border-box; }
  body {
    font-family: 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif;
    color: #1e293b;
    line-height: 1.5;
    font-size: 9.5pt;
    margin: 0;
    padding: 0;
  }

  /* Cover Page */
  .cover-page {
    height: 92vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    padding: 1.5rem;
    page-break-after: always;
  }
  .univ-title {
    font-size: 30pt;
    font-weight: 800;
    color: #dc2626;
    margin-bottom: 0.3rem;
    letter-spacing: -0.5px;
  }
  .dept-title {
    font-size: 15pt;
    font-weight: 700;
    color: #334155;
    margin-bottom: 2rem;
  }
  .cover-bar {
    height: 4px;
    background: #b91c1c;
    width: 100%;
    margin-bottom: 2.5rem;
    border-radius: 2px;
  }
  .meta-card {
    border: 1px solid #cbd5e1;
    border-radius: 10px;
    padding: 1.8rem;
    background: #f8fafc;
    margin-bottom: 3rem;
  }
  .doc-title {
    font-size: 16pt;
    font-weight: 800;
    color: #0f172a;
    margin-bottom: 0.5rem;
  }
  .doc-sub {
    font-size: 12.5pt;
    font-weight: 700;
    color: #2563eb;
    margin-bottom: 0.3rem;
  }
  .doc-year {
    font-size: 10.5pt;
    color: #64748b;
  }
  .student-box {
    text-align: left;
    border-left: 5px solid #b91c1c;
    background: #f8fafc;
    padding: 1.25rem 1.5rem;
    border-radius: 0 8px 8px 0;
    width: 75%;
    margin: 0 auto;
    font-size: 11pt;
  }
  .student-name {
    font-size: 13pt;
    font-weight: 800;
    color: #0f172a;
  }
  .student-enrol {
    font-size: 12pt;
    font-weight: 700;
    color: #b91c1c;
  }

  /* Index Page */
  .index-page {
    padding: 0.5rem 0;
    page-break-after: always;
  }
  .index-header {
    font-size: 18pt;
    font-weight: 800;
    color: #0f172a;
    border-bottom: 2px solid #e2e8f0;
    padding-bottom: 0.5rem;
    margin-bottom: 1.25rem;
  }
  table.index-table {
    width: 100%;
    border-collapse: collapse;
    font-size: 9pt;
  }
  table.index-table th {
    background: #f1f5f9;
    border: 1px solid #cbd5e1;
    padding: 7px 10px;
    text-align: left;
    font-weight: 700;
    color: #1e293b;
  }
  table.index-table td {
    border: 1px solid #cbd5e1;
    padding: 6px 10px;
    vertical-align: middle;
  }
  table.index-table tr:nth-child(even) { background: #f8fafc; }

  /* Practical Block */
  .practical-block {
    page-break-before: always;
    margin-top: 0;
    padding-top: 0.5rem;
  }
  .practical-header {
    font-size: 14pt;
    font-weight: 800;
    color: #dc2626;
    margin-bottom: 0.85rem;
    line-height: 1.35;
    border-bottom: 2px solid #fecaca;
    padding-bottom: 0.4rem;
  }
  .section-h3 {
    font-size: 11pt;
    font-weight: 700;
    color: #0f172a;
    margin-top: 0.9rem;
    margin-bottom: 0.35rem;
  }
  .file-bullet {
    font-size: 9.5pt;
    font-weight: 700;
    color: #334155;
    margin-top: 0.65rem;
    margin-bottom: 0.25rem;
  }

  /* Code Editor Appearance (VS Code One Dark style) */
  .code-editor-box {
    margin: 0.4rem 0 0.8rem;
    border-radius: 8px;
    overflow: hidden;
    border: 1px solid #334155;
    box-shadow: 0 2px 6px rgba(0,0,0,0.15);
  }
  .code-editor-box .highlight {
    background: #21252b !important;
    padding: 10px 14px;
    margin: 0;
  }
  .code-editor-box pre {
    background: transparent !important;
    color: #abb2bf !important;
    font-family: 'JetBrains Mono', Consolas, monospace !important;
    font-size: 8pt !important;
    line-height: 1.4 !important;
    margin: 0 !important;
    padding: 0 !important;
    white-space: pre-wrap !important;
    word-break: break-word !important;
  }

  /* Output Section */
  .output-box {
    margin: 0.85rem 0 1rem;
    text-align: center;
    page-break-inside: avoid;
  }
  .output-img {
    max-width: 98%;
    max-height: 480px;
    border: 1px solid #94a3b8;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    display: inline-block;
  }
  .footer-note {
    text-align: center;
    padding: 1.5rem 0;
    font-size: 9pt;
    color: #64748b;
    border-top: 1px solid #e2e8f0;
    margin-top: 1.5rem;
  }
</style>
</head>
<body>
"""

    # 1. Cover Page
    html += """
    <div class="cover-page">
      <div class="univ-title">Ganpat University</div>
      <div class="dept-title">Department of Computer Science</div>
      <div class="cover-bar"></div>
      
      <div class="meta-card">
        <div class="doc-title">M.SC(CA & IT) SEM - 1 Practical Documentation</div>
        <div class="doc-sub">Subject : MERN Stack Development</div>
        <div class="doc-year">Academic Year : 2026-2027</div>
      </div>

      <div class="student-box">
        <div style="font-size: 9.5pt; color: #64748b; margin-bottom: 0.25rem;">Submitted by :</div>
        <div style="margin-bottom: 0.35rem;">Name : <span class="student-name">Prince Prajapati</span></div>
        <div>Enrolment Number : <span class="student-enrol">26084231038</span></div>
      </div>
    </div>
    """

    # 2. Index Page
    practicals_index = [
        ("01", "Build a React application using Functional Components, JSX and Component Reusability concepts."),
        ("02", "Develop a React application implementing Props, State Management and Event Handling."),
        ("03", "Create a Student Management System using React Forms, Controlled Components and Validation."),
        ("04", "Develop a Single Page Application (SPA) using React Router for navigation between multiple pages."),
        ("05", "Create a backend server using Express.js implementing routing and CRUD operation."),
        ("06", "Build RESTful APIs for Student Records Management using Express.js and Postman testing."),
        ("07", "Develop an Employee Management API integrating Express.js with MongoDB Atlas."),
        ("08", "Create a backend server using Express.js implementing routing, middleware and request handling."),
        ("09", "Create a file upload module using Multer and store file metadata in MongoDB."),
        ("10", "Develop a complete MERN application integrating React Frontend, Express Backend and MongoDB Database."),
        ("11", "Create a Blog Management System implementing CRUD Operations, Authentication and Role-Based Access Control."),
        ("12", "Develop a Real-Time Chat Application using Socket.IO, React and Node.js."),
        ("13", "Mini Project: Design and develop a full-stack industry-oriented MERN application (Document Management System).")
    ]

    html += """
    <div class="index-page">
      <div class="index-header">Index of Practicals</div>
      <table class="index-table">
        <thead>
          <tr>
            <th style="width: 14%; text-align: center;">Practical No.</th>
            <th style="width: 72%;">Practical Title</th>
            <th style="width: 14%; text-align: center;">Status</th>
          </tr>
        </thead>
        <tbody>
    """
    for num, title in practicals_index:
        html += f"""
          <tr>
            <td style="text-align: center; font-weight: bold; color: #b91c1c;">{num}</td>
            <td>{title}</td>
            <td style="text-align: center; color: #16a34a; font-weight: 700;">Completed</td>
          </tr>
        """
    html += """
        </tbody>
      </table>
    </div>
    """

    # 3. Practical Sections
    practical_sections = re.split(r'\n(?=# Practical)', content)

    for section in practical_sections:
        if not section.strip().startswith('# Practical'):
            continue

        lines = section.strip().split('\n')
        title_line = lines[0].replace('#', '').strip()
        body_text = '\n'.join(lines[1:])

        p_match = re.search(r'Practical\s*[-–]\s*(\d+)', title_line)
        p_num = int(p_match.group(1)) if p_match else 0

        html += f'<div class="practical-block">'
        html += f'<div class="practical-header">{title_line}</div>'

        # Replace image links with base64 img tags
        for img_rel in [f'./assets/screenshots/output_{p_num:02d}.png', f'assets/screenshots/output_{p_num:02d}.png']:
            b64 = img_map.get(img_rel, '')
            if b64:
                body_text = body_text.replace(f'![Practical {p_num:02d} Output]({img_rel})', f'<div class="output-box"><img src="{b64}" class="output-img" alt="Output {p_num}"/></div>')
                body_text = body_text.replace(f'![Practical Output]({img_rel})', f'<div class="output-box"><img src="{b64}" class="output-img" alt="Output {p_num}"/></div>')

        # Replace markdown headers
        body_text = re.sub(r'###\s*(\d+\.\s*[^:\n]+):?', r'<div class="section-h3">\1 :</div>', body_text)
        body_text = re.sub(r'####\s*•\s*`([^`]+)`\s*:?', r'<div class="file-bullet">• <code>\1</code> :</div>', body_text)

        # Pygments syntax highlighting on code blocks
        def code_highlight_callback(match):
            lang = match.group(1) or 'text'
            code = match.group(2)
            return highlight_code(code, lang)

        body_text = re.sub(r'```([a-zA-Z0-9]*)\n(.*?)```', code_highlight_callback, body_text, flags=re.DOTALL)

        # Ensure screenshot is present if not yet replaced
        if p_num in img_map and img_map[p_num] and 'class="output-img"' not in body_text:
            body_text += f'<div class="output-box"><img src="{img_map[p_num]}" class="output-img" alt="Practical {p_num} Output"/></div>'

        body_text = body_text.replace('---', '')
        html += body_text
        html += '</div>'

    html += """
      <div class="footer-note">
        🎓 <strong>Ganpat University • Department of Computer Science • M.SC(CA & IT) SEM - 1</strong><br>
        MERN Stack Development Practical Documentation • Prince Prajapati (Enrolment No: 26084231038)<br>
        <strong>End of Practical Journal</strong>
      </div>
    </body>
    </html>
    """

    out_html = os.path.join(base_dir, 'assets', 'documentation_full.html')
    with open(out_html, 'w', encoding='utf-8') as f:
        f.write(html)
    print(f"Generated HTML: {out_html}")
    return out_html

def convert_html_to_pdf(html_file, pdf_file):
    print(f"Rendering PDF with Playwright from {html_file} to {pdf_file}...")
    with sync_playwright() as p:
        browser = p.chromium.launch(channel='chrome')
        page = browser.new_page()
        page.goto(f'file:///{os.path.abspath(html_file).replace("\\", "/")}')
        page.wait_for_timeout(2000)
        page.pdf(
            path=pdf_file,
            format='A4',
            print_background=True,
            margin={'top': '14mm', 'bottom': '14mm', 'left': '14mm', 'right': '14mm'}
        )
        browser.close()
    print("[OK] PDF Generation Complete!")

if __name__ == '__main__':
    html_path = build_html()
    pdf_out = os.path.abspath('MERN_Stack_Practical_Documentation_Prince_Prajapati.pdf')
    convert_html_to_pdf(html_path, pdf_out)
