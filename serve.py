#!/usr/bin/env python3
"""Optional local preview, including HTTP byte ranges for video seeking."""
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
import argparse, os, re

ROOT = Path(__file__).resolve().parent

class Handler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(ROOT), **kwargs)

    def send_head(self):
        self.bytes_remaining = None
        path = Path(self.translate_path(self.path))
        if not path.is_file():
            return super().send_head()
        source = path.open('rb')
        size = os.fstat(source.fileno()).st_size
        start, end = 0, size - 1
        value = self.headers.get('Range')
        if value:
            match = re.fullmatch(r'bytes=(\d*)-(\d*)', value.strip())
            if not match or not any(match.groups()):
                source.close(); self.send_error(416); return None
            left, right = match.groups()
            if left:
                start = int(left)
                if right: end = min(int(right), end)
            else:
                start = max(0, size - int(right))
            if start > end or start >= size:
                source.close()
                self.send_response(416)
                self.send_header('Content-Range', f'bytes */{size}')
                self.send_header('Content-Length', '0')
                self.end_headers()
                return None
            self.send_response(206)
            self.send_header('Content-Range', f'bytes {start}-{end}/{size}')
        else:
            self.send_response(200)
        self.send_header('Content-Type', self.guess_type(str(path)))
        self.send_header('Accept-Ranges', 'bytes')
        self.send_header('Content-Length', str(end - start + 1))
        self.send_header('Cache-Control', 'no-cache')
        self.end_headers()
        source.seek(start)
        self.bytes_remaining = end - start + 1
        return source

    def copyfile(self, source, target):
        if self.bytes_remaining is None:
            return super().copyfile(source, target)
        try:
            remaining = self.bytes_remaining
            while remaining > 0:
                chunk = source.read(min(1024 * 1024, remaining))
                if not chunk: break
                target.write(chunk)
                remaining -= len(chunk)
        except (BrokenPipeError, ConnectionResetError):
            pass

if __name__ == '__main__':
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--port', type=int, default=8000)
    args = parser.parse_args()
    server = ThreadingHTTPServer(('127.0.0.1', args.port), Handler)
    print(f'Local preview: http://127.0.0.1:{args.port}', flush=True)
    try: server.serve_forever()
    except KeyboardInterrupt: pass
    finally: server.server_close()
