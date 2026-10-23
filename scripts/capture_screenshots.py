import os
import http.server
import socketserver
import threading
from playwright.sync_api import sync_playwright

def start_server():
    os.chdir(os.path.abspath('.'))
    handler = http.server.SimpleHTTPRequestHandler
    httpd = socketserver.TCPServer(("", 8080), handler)
    thread = threading.Thread(target=httpd.serve_forever, daemon=True)
    thread.start()
    return httpd

def capture_all():
    base_dir = os.path.abspath('.')
    screenshots_dir = os.path.join(base_dir, 'assets', 'screenshots')
    os.makedirs(screenshots_dir, exist_ok=True)

    httpd = start_server()
    print("[OK] Local HTTP server started on port 8080")

    targets = [
        (1, 'http://localhost:8080/MERN_01/dist/index.html'),
        (2, 'http://localhost:8080/MERN_02/dist/index.html'),
        (3, 'http://localhost:8080/MERN_03/dist/index.html'),
        (4, 'http://localhost:8080/MERN_04/dist/index.html'),
        (5, 'http://localhost:8080/MERN_05/public/index.html'),
        (6, 'http://localhost:8080/MERN_06/public/index.html'),
        (7, 'http://localhost:8080/MERN_07/public/index.html'),
        (8, 'http://localhost:8080/MERN_08/public/index.html'),
        (9, 'http://localhost:8080/MERN_09/public/index.html'),
        (10, 'http://localhost:8080/MERN_10/backend/public/index.html'),
        (11, 'http://localhost:8080/MERN_11/public/index.html'),
        (12, 'http://localhost:8080/MERN_12/public/index.html'),
        (13, 'http://localhost:8080/MERN_13/public/index.html'),
    ]

    with sync_playwright() as p:
        browser = p.chromium.launch(channel='chrome')
        context = browser.new_context(viewport={'width': 1200, 'height': 800})
        page = context.new_page()

        for num, url in targets:
            out_file = os.path.join(screenshots_dir, f'output_{num:02d}.png')
            print(f'Capturing Practical {num:02d} from {url}...')
            page.goto(url)
            page.wait_for_timeout(1200)
            page.screenshot(path=out_file, full_page=False)
            print(f'Saved: output_{num:02d}.png')

        browser.close()

    httpd.shutdown()
    print('[OK] All 13 practical screenshots successfully captured from live HTTP server!')

if __name__ == '__main__':
    capture_all()
