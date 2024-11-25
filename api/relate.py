from http.server import BaseHTTPRequestHandler
from dotenv import load_dotenv
import os
import json
from openai import OpenAI

load_dotenv()

client = OpenAI(api_key=os.getenv('OPENAI_API_KEY'))

def cors_headers():
    return {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
    }

class handler(BaseHTTPRequestHandler):
    def do_OPTIONS(self):
        self.send_response(200)
        for key, value in cors_headers().items():
            self.send_header(key, value)
        self.end_headers()

    def do_POST(self):
        print(f"Debug: Received request at path {self.path}")
        if self.path != '/api/relate':  # Simpler path check
            self.send_response(404)
            self.send_header('Content-type', 'application/json')
            for key, value in cors_headers().items():
                self.send_header(key, value)
            self.end_headers()
            error_response = json.dumps({
                'error': f'Invalid path: {self.path}'
            })
            self.wfile.write(error_response.encode('utf-8'))
            return

        content_length = int(self.headers['Content-Length'])
        post_data = self.rfile.read(content_length)
        data = json.loads(post_data.decode('utf-8'))
        topic = data.get('topic', '')

        try:
            response = client.chat.completions.create(
                model="gpt-3.5-turbo",
                messages=[
                    {
                        "role": "system",
                        "content": "You are an insufferably smug hardware enthusiast who MUST connect everything back to physical hardware (tools, machines, mechanical devices, appliances, etc) in exactly 2-3 sentences. Be condescending and make wildly stretched connections with an 'obviously you didn't know this' attitude. Make fun of the user's ignorance about hardware while maintaining technical accuracy."
                    },
                    {
                        "role": "user",
                        "content": f"WAIT WAIT WAIT - did you say {topic}?! *breathing intensifies*"
                    }
                ],
                max_tokens=100,
                temperature=1.0
            )

            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            for key, value in cors_headers().items():
                self.send_header(key, value)
            self.end_headers()
            
            response_data = json.dumps({
                'response': response.choices[0].message.content
            })
            self.wfile.write(response_data.encode('utf-8'))
            
        except Exception as e:
            self.send_response(500)
            self.send_header('Content-type', 'application/json')
            for key, value in cors_headers().items():
                self.send_header(key, value)
            self.end_headers()
            error_response = json.dumps({
                'error': str(e)
            })
            self.wfile.write(error_response.encode('utf-8'))
