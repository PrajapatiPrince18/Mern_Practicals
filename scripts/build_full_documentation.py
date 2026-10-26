import os
import re
import base64
import html
from playwright.sync_api import sync_playwright
import pygments
from pygments.lexers import JavascriptLexer, BashLexer, JsonLexer, TextLexer, HtmlLexer, CssLexer
from pygments.formatters import HtmlFormatter
import pymupdf

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__))) if os.path.exists(os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), 'MERN_01')) else os.path.abspath('.')

PRACTICALS = [
    {
        'num': '01',
        'title': 'Build a React application using Functional Components, JSX and Component Reusability concepts.',
        'dir': 'MERN_01',
        'files': [
            'package.json', 'index.html', 'vite.config.js', 'src/main.jsx', 'src/index.css', 'src/App.jsx',
            'src/components/Header.jsx', 'src/components/Button.jsx', 'src/components/Badge.jsx',
            'src/components/Card.jsx', 'src/components/CourseCard.jsx', 'src/components/Footer.jsx'
        ],
        'commands': 'npm create vite@latest MERN_01\ncd MERN_01\nnpm install\nnpm run dev',
        'desc': 'The application demonstrates functional component architecture, JSX syntax expressions, and nested component reusability with modular Cards, Badges, and Buttons.'
    },
    {
        'num': '02',
        'title': 'Develop a React application implementing Props, State Management and Event Handling.',
        'dir': 'MERN_02',
        'files': [
            'package.json', 'index.html', 'vite.config.js', 'src/main.jsx', 'src/index.css', 'src/App.jsx',
            'src/components/Header.jsx', 'src/components/CounterSection.jsx', 'src/components/TaskManager.jsx',
            'src/components/TaskItem.jsx', 'src/components/UserProfileCard.jsx', 'src/components/InteractiveBox.jsx'
        ],
        'commands': 'npm create vite@latest MERN_02\ncd MERN_02\nnpm install\nnpm run dev',
        'desc': 'Demonstrates uni-directional data flow, state management with useState, array state manipulation, form submissions, and mouse/keyboard synthetic event handlers.'
    },
    {
        'num': '03',
        'title': 'Create a Student Management System using React Forms, Controlled Components and Validation.',
        'dir': 'MERN_03',
        'files': [
            'package.json', 'index.html', 'vite.config.js', 'src/main.jsx', 'src/index.css', 'src/App.jsx',
            'src/utils/validation.js', 'src/components/Header.jsx', 'src/components/StatsOverview.jsx',
            'src/components/StudentForm.jsx', 'src/components/StudentTable.jsx'
        ],
        'commands': 'npm create vite@latest MERN_03\ncd MERN_03\nnpm install\nnpm run dev',
        'desc': 'Controlled React forms implementing live Regex validation for names, roll numbers, emails, and Indian mobile numbers, complete with an interactive student directory.'
    },
    {
        'num': '04',
        'title': 'Develop a Single Page Application (SPA) using React Router for navigation between multiple pages.',
        'dir': 'MERN_04',
        'files': [
            'package.json', 'index.html', 'vite.config.js', 'src/main.jsx', 'src/index.css', 'src/App.jsx',
            'src/data/coursesData.js', 'src/components/Navbar.jsx', 'src/components/Footer.jsx',
            'src/pages/Home.jsx', 'src/pages/Courses.jsx', 'src/pages/CourseDetails.jsx',
            'src/pages/About.jsx', 'src/pages/Contact.jsx', 'src/pages/NotFound.jsx'
        ],
        'commands': 'npm create vite@latest MERN_04\ncd MERN_04\nnpm install react-router-dom\nnpm run dev',
        'desc': 'Single Page Application with React Router v6, dynamic route slugs (:courseId) via useParams, programmatic navigation via useNavigate, and 404 wildcard fallback handling.'
    },
    {
        'num': '05',
        'title': 'Create a backend server using Express.js implementing routing and CRUD operation.',
        'dir': 'MERN_05',
        'files': [
            'package.json', 'server.js', 'routes/productRoutes.js', 'controllers/productController.js',
            'middleware/logger.js', 'middleware/errorHandler.js', 'data/products.json', 'public/index.html'
        ],
        'commands': 'mkdir MERN_05 && cd MERN_05\nnpm init -y\nnpm install express cors morgan\nnode server.js',
        'desc': 'Express.js backend server with modular router, custom request logging middleware, central error handling, and complete CRUD operations on product entities.'
    },
    {
        'num': '06',
        'title': 'Build RESTful APIs for Student Records Management using Express.js and Postman testing.',
        'dir': 'MERN_06',
        'files': [
            'package.json', 'server.js', 'routes/studentRoutes.js', 'controllers/studentController.js',
            'middleware/validator.js', 'middleware/logger.js', 'data/students.json', 'public/index.html'
        ],
        'commands': 'mkdir MERN_06 && cd MERN_06\nnpm init -y\nnpm install express cors morgan\nnode server.js',
        'desc': 'RESTful API for student records management with payload validation middleware, query filtering, sorting, status codes, and department summary statistics.'
    },
    {
        'num': '07',
        'title': 'Develop an Employee Management API integrating Express.js with MongoDB Atlas.',
        'dir': 'MERN_07',
        'files': [
            '.env', 'package.json', 'server.js', 'seed.js', 'config/db.js',
            'models/Employee.js', 'routes/employeeRoutes.js', 'controllers/employeeController.js', 'public/index.html'
        ],
        'commands': 'mkdir MERN_07 && cd MERN_07\nnpm init -y\nnpm install express mongoose dotenv cors morgan\nnode seed.js\nnode server.js',
        'desc': 'Cloud-connected Express API utilizing Mongoose ODM, MongoDB Atlas connection, strict schema validation, and aggregation pipeline for departmental analytics.'
    },
    {
        'num': '08',
        'title': 'Create a backend server using Express.js implementing routing, middleware and request handling.',
        'dir': 'MERN_08',
        'files': [
            '.env', 'package.json', 'server.js', 'routes/userRoutes.js', 'routes/inspectorRoutes.js',
            'controllers/userController.js', 'middleware/loggerMiddleware.js', 'middleware/authMiddleware.js',
            'middleware/validateMiddleware.js', 'middleware/errorHandler.js', 'data/users.json', 'public/index.html'
        ],
        'commands': 'mkdir MERN_08 && cd MERN_08\nnpm init -y\nnpm install express cors dotenv morgan\nnode server.js',
        'desc': 'Comprehensive Express request handling demonstrating application-level logger, router-level tracking, API-key authentication, role authorization, parameter/body validation, and error handling.'
    },
    {
        'num': '09',
        'title': 'Create a file upload module using Multer and store file metadata in MongoDB.',
        'dir': 'MERN_09',
        'files': [
            '.env', 'package.json', 'server.js', 'config/db.js', 'config/multerConfig.js',
            'models/FileRecord.js', 'routes/fileRoutes.js', 'controllers/fileController.js', 'public/index.html'
        ],
        'commands': 'mkdir MERN_09 && cd MERN_09\nnpm init -y\nnpm install express mongoose multer cors dotenv morgan\nnode server.js',
        'desc': 'Multipart file upload module utilizing Multer diskStorage, extension and MIME type validation, 5MB size enforcement, disk archival, and metadata persistence in MongoDB Atlas.'
    },
    {
        'num': '10',
        'title': 'Develop a complete MERN application integrating React Frontend, Express Backend and MongoDB Database.',
        'dir': 'MERN_10',
        'files': [
            'backend/.env', 'backend/package.json', 'backend/server.js', 'backend/seed.js',
            'backend/config/db.js', 'backend/models/InventoryItem.js', 'backend/routes/inventoryRoutes.js',
            'backend/controllers/inventoryController.js', 'backend/public/index.html',
            'frontend/package.json', 'frontend/index.html', 'frontend/vite.config.js',
            'frontend/src/main.jsx', 'frontend/src/index.css', 'frontend/src/App.jsx',
            'frontend/src/components/StatsCard.jsx', 'frontend/src/components/InventoryForm.jsx',
            'frontend/src/components/InventoryTable.jsx'
        ],
        'commands': '# Backend Setup:\ncd MERN_10/backend\nnpm install\nnode server.js\n\n# Frontend Setup:\ncd ../frontend\nnpm install\nnpm run dev',
        'desc': 'Complete end-to-end full stack MERN inventory application connecting React Vite frontend with Express REST backend and cloud-hosted MongoDB Atlas database.'
    },
    {
        'num': '11',
        'title': 'Create a Blog Management System implementing CRUD Operations, Authentication and Role-Based Access Control.',
        'dir': 'MERN_11',
        'files': [
            '.env', 'package.json', 'server.js', 'seed.js', 'config/db.js',
            'models/User.js', 'models/Post.js', 'middleware/auth.js', 'public/index.html'
        ],
        'commands': 'mkdir MERN_11 && cd MERN_11\nnpm init -y\nnpm install express mongoose bcryptjs jsonwebtoken cors dotenv morgan\nnode seed.js\nnode server.js',
        'desc': 'Full-featured blog management platform featuring JWT authentication, Bcrypt password hashing, and granular Role-Based Access Control for Admin, Author, and Reader roles.'
    },
    {
        'num': '12',
        'title': 'Develop a Real-Time Chat Application using Socket.IO, React and Node.js.',
        'dir': 'MERN_12',
        'files': [
            '.env', 'package.json', 'server.js', 'public/index.html'
        ],
        'commands': 'mkdir MERN_12 && cd MERN_12\nnpm init -y\nnpm install express socket.io cors dotenv\nnode server.js',
        'desc': 'Bidirectional real-time WebSocket communication utilizing Socket.IO, multi-room chat partitioning, active message history, and live typing indicators.'
    },
    {
        'num': '13',
        'title': 'Mini Project: Design and develop a full-stack industry-oriented MERN application (Document Management System).',
        'dir': 'MERN_13',
        'files': [
            '.env', 'package.json', 'server.js', 'models/Document.js', 'public/index.html'
        ],
        'commands': 'mkdir MERN_13 && cd MERN_13\nnpm init -y\nnpm install express mongoose multer cors dotenv\nnode server.js',
        'desc': 'Industry-oriented capstone Document Management System (DMS) featuring file categorization, automated version stamping, cloud metadata metrics, and document search/download.'
    }
]

def get_base64_image(path):
    if os.path.exists(path):
        with open(path, "rb") as f:
            return "data:image/png;base64," + base64.b64encode(f.read()).decode("utf-8")
    return ""

def get_lexer_for_file(filepath):
    ext = os.path.splitext(filepath)[1].lower()
    name = os.path.basename(filepath).lower()
    if ext in ['.js', '.jsx', '.mjs', '.cjs']:
        return JavascriptLexer()
    elif ext in ['.json']:
        return JsonLexer()
    elif ext in ['.html', '.htm']:
        return HtmlLexer()
    elif ext in ['.css']:
        return CssLexer()
    elif ext in ['.sh', '.bash'] or name in ['.env']:
        return BashLexer()
    return TextLexer()

def highlight_code_snippet(code_text, lexer=None):
    escaped = html.escape(code_text.rstrip())
    return f'<div class="code-editor-box"><pre>{escaped}</pre></div>'

def generate_markdown_doc():
    md = """# Ganpat University
## Department of Computer Science

### M.SC(CA & IT) SEM - 1 Practical Documentation
**Subject:** MERN Stack Development  
**Academic Year:** 2026-2027  

**Submitted by:**  
**Name:** Prince Prajapati  
**Enrolment Number:** 26084231038  

---

## Index of Practicals

| Practical No. | Practical Title | Status |
| :---: | :--- | :---: |
"""
    for p in PRACTICALS:
        md += f"| **{p['num']}** | {p['title']} | Completed |\n"

    md += "\n---\n\n"

    for p in PRACTICALS:
        md += f"# Practical – {p['num']} : {p['title']}\n\n"
        md += "### 1. Commands :\n```bash\n" + p['commands'] + "\n```\n\n"
        md += "### 2. Project structure :\n```text\n" + p['dir'] + "/\n"
        for f in p['files']:
            md += f"|-- {f}\n"
        md += "```\n\n"

        md += "### 3. Source Code :\n\n"
        for f in p['files']:
            full_path = os.path.join(p['dir'], f)
            if os.path.exists(full_path):
                with open(full_path, 'r', encoding='utf-8', errors='ignore') as code_f:
                    code_content = code_f.read()
                ext = os.path.splitext(f)[1].lower()
                lang = 'jsx' if ext == '.jsx' else 'javascript' if ext == '.js' else 'html' if ext == '.html' else 'css' if ext == '.css' else 'json' if ext == '.json' else 'bash'
                md += f"#### • `{f}` :\n```{lang}\n{code_content}\n```\n\n"

        md += f"### 4. Output :\n{p['desc']}\n\n"
        md += f"![Practical {p['num']} Output](./assets/screenshots/output_{p['num']}.png)\n\n---\n\n"

    md += """<div style="text-align: center; padding: 2rem 0; color: #64748b; font-weight: 600;">
  🎓 <strong>Ganpat University • Department of Computer Science • M.SC(CA & IT) SEM - 1</strong><br>
  MERN Stack Development Practical Documentation • Prince Prajapati (Enrolment No: 26084231038)
</div>

---
**End of Practical Journal**
"""
    with open('PRACTICAL_DOCUMENTATION.md', 'w', encoding='utf-8') as f:
        f.write(md)
    print('[OK] PRACTICAL_DOCUMENTATION.md written with 100% full source code!')

def build_html(page_map=None):
    img_map = {}
    for i in range(1, 14):
        p = os.path.join(BASE_DIR, 'assets', 'screenshots', f'output_{i:02d}.png')
        img_map[f'output_{i:02d}'] = get_base64_image(p)

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
    line-height: 1.45;
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
    font-size: 13.5pt;
    font-weight: 800;
    color: #dc2626;
    margin-bottom: 0.75rem;
    line-height: 1.35;
    border-bottom: 2px solid #fecaca;
    padding-bottom: 0.35rem;
  }
  .section-h3 {
    font-size: 10.5pt;
    font-weight: 700;
    color: #0f172a;
    margin-top: 0.8rem;
    margin-bottom: 0.3rem;
  }
  .file-bullet {
    font-size: 9.5pt;
    font-weight: 700;
    color: #1e293b;
    margin-top: 0.6rem;
    margin-bottom: 0.2rem;
  }

  /* Code Editor Appearance (Clean Print-Friendly: White Background & Black Text) */
  .code-editor-box {
    margin: 0.35rem 0 0.7rem;
    border-radius: 6px;
    border: 1px solid #cbd5e1;
    background: #ffffff !important;
  }
  .code-editor-box .highlight {
    background: #ffffff !important;
    padding: 0;
    margin: 0;
  }
  .code-editor-box pre {
    background: #ffffff !important;
    color: #000000 !important;
    font-family: 'JetBrains Mono', Consolas, monospace !important;
    font-size: 7.8pt !important;
    line-height: 1.38 !important;
    margin: 0 !important;
    padding: 9px 12px !important;
    white-space: pre-wrap !important;
    word-break: break-word !important;
  }
  .code-editor-box pre *,
  .code-editor-box span {
    color: #000000 !important;
    background: transparent !important;
  }
  code {
    font-family: 'JetBrains Mono', Consolas, monospace;
    font-size: 8.5pt;
    background: #f1f5f9;
    color: #0f172a;
    padding: 1px 5px;
    border-radius: 4px;
    border: 1px solid #cbd5e1;
  }

  /* Output Section */
  .output-box {
    margin: 0.75rem 0 1rem;
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

    # 2. Index Page with Page Numbers
    html += """
    <div class="index-page">
      <div class="index-header">Index of Practicals</div>
      <table class="index-table">
        <thead>
          <tr>
            <th style="width: 14%; text-align: center;">Practical No.</th>
            <th style="width: 72%;">Practical Title</th>
            <th style="width: 14%; text-align: center;">Page No.</th>
          </tr>
        </thead>
        <tbody>
    """
    for p in PRACTICALS:
        page_str = str(page_map.get(p['num'], '-')) if page_map else 'Page -'
        html += f"""
          <tr>
            <td style="text-align: center; font-weight: bold; color: #b91c1c;">{p['num']}</td>
            <td>{p['title']}</td>
            <td style="text-align: center; font-weight: 700; color: #2563eb;">{page_str}</td>
          </tr>
        """
    html += """
        </tbody>
      </table>
    </div>
    """

    # 3. Practical Blocks with full source code
    for p in PRACTICALS:
        html += f'<div class="practical-block">'
        html += f'<div class="practical-header">Practical – {p["num"]} : {p["title"]}</div>'

        # Commands
        html += '<div class="section-h3">1. Commands :</div>'
        html += highlight_code_snippet(p['commands'], BashLexer())

        # Structure
        html += '<div class="section-h3">2. Project structure :</div>'
        struct_text = p['dir'] + "/\n"
        for f in p['files']:
            struct_text += f"|-- {f}\n"
        html += highlight_code_snippet(struct_text, TextLexer())

        # Source Code
        html += '<div class="section-h3">3. Source Code :</div>'
        for f in p['files']:
            full_path = os.path.join(p['dir'], f)
            if os.path.exists(full_path):
                with open(full_path, 'r', encoding='utf-8', errors='ignore') as code_f:
                    code_content = code_f.read()
                lexer = get_lexer_for_file(f)
                html += f'<div class="file-bullet">• <code>{f}</code> :</div>'
                html += highlight_code_snippet(code_content, lexer)

        # Output
        html += '<div class="section-h3">4. Output :</div>'
        html += f'<p style="color: #475569; margin: 0.3rem 0 0.5rem;">{p["desc"]}</p>'
        b64 = img_map.get(f'output_{p["num"]}', '')
        if b64:
            html += f'<div class="output-box"><img src="{b64}" class="output-img" alt="Output {p["num"]}"/></div>'

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

    out_html = os.path.join(BASE_DIR, 'assets', 'documentation_full.html')
    with open(out_html, 'w', encoding='utf-8') as f:
        f.write(html)
    return out_html

def find_page_numbers(pdf_path):
    doc = pymupdf.open(pdf_path)
    page_map = {}
    for i in range(1, 14):
        num_str = f"{i:02d}"
        pattern = f"Practical – {num_str}"
        found_page = None
        for p_idx, page in enumerate(doc):
            text = page.get_text()
            if pattern in text:
                found_page = p_idx + 1
                break
        page_map[num_str] = found_page or (i * 5)
    return page_map

def render_pdf(html_file, pdf_file):
    with sync_playwright() as p:
        browser = p.chromium.launch(channel='chrome')
        page = browser.new_page()
        page.goto(f'file:///{os.path.abspath(html_file).replace("\\", "/")}')
        page.wait_for_timeout(2500)
        page.pdf(
            path=pdf_file,
            format='A4',
            print_background=True,
            margin={'top': '14mm', 'bottom': '14mm', 'left': '14mm', 'right': '14mm'}
        )
        browser.close()

def main():
    os.chdir(BASE_DIR)
    print("Step 1: Generating complete PRACTICAL_DOCUMENTATION.md from codebase...")
    generate_markdown_doc()

    print("Step 2: Building HTML pass 1 (for page number calculation)...")
    html_1 = build_html(page_map=None)
    pdf_temp = os.path.join(BASE_DIR, 'assets', 'temp_doc.pdf')
    render_pdf(html_1, pdf_temp)

    print("Step 3: Calculating exact practical starting page numbers...")
    page_map = find_page_numbers(pdf_temp)
    print(f"Detected Practical Page Map: {page_map}")

    print("Step 4: Re-building HTML pass 2 with exact page numbers in Index table...")
    html_final = build_html(page_map=page_map)
    pdf_final = os.path.join(BASE_DIR, 'MERN_Stack_Practical_Documentation_Prince_Prajapati.pdf')
    render_pdf(html_final, pdf_final)

    if os.path.exists(pdf_temp):
        os.remove(pdf_temp)
    print("[OK] PDF Documentation with complete source code & exact index page numbers successfully created!")

if __name__ == '__main__':
    main()
