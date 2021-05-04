from http.server import BaseHTTPRequestHandler, HTTPServer
from urllib.parse import parse_qs, urlparse

from makeLoft import makeLoftCAD
import json
import base64

PORT = 5000
address = ('0.0.0.0', PORT)

#-------------------------------------------------------
#-------------------------------------------------------

class MyHTTPRequestHandler(BaseHTTPRequestHandler):
    server_version = "HTTP Stub/0.1"

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

    def do_GET(self):
         print('path = {}'.format(self.path))

         parsed_path = urlparse(self.path)
         print('parsed: path = {}, query = {}'.format(parsed_path.path, parse_qs(parsed_path.query)))

         print('headers\r\n-----\r\n{}-----'.format(self.headers))
                                       
         self.send_response(200)
         self.send_header('Content-Type', 'text/plain; charset=utf-8')
         self.end_headers()
         self.wfile.write(b'Hello from do_GET')

    def do_POST(self):
        print('path = {}'.format(self.path),  flush=True)

        parsed_path = urlparse(self.path)
        print('parsed: path = {}, query = {}'.format(parsed_path.path, parse_qs(parsed_path.query)), flush=True)

        if(parsed_path.path =="/node/make"):
            print('headers\r\n-----\r\n{}-----'.format(self.headers), flush=True)
    
            content_length = int(self.headers['content-length'])

            body = self.rfile.read(content_length).decode('utf-8')            
            js = json.loads(body)
            sections2=js["sections2"]
            blob = makeLoftCAD(sections2)

            self.send_response(200)
            self.send_header('Content-Type', 'text/plain; charset=utf-8')
            self.end_headers()
            self.wfile.write(blob)


        else:
            self.send_response(200)
            self.send_header('Content-Type', 'text/plain; charset=utf-8')
            self.end_headers()
            self.wfile.write(b'test')



                                                              
with HTTPServer(address, MyHTTPRequestHandler) as server:
    server.serve_forever()

