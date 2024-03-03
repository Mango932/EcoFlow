from http.server import BaseHTTPRequestHandler, HTTPServer
import json
import sys
import os
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
from model.crop_recommendation import CropRecommendation
import warnings
from pages.api.weather_api import get_weather_data

class RequestHandler(BaseHTTPRequestHandler):
    def _set_headers(self):
        self.send_response(200)
        self.send_header('Content-Type', 'application/json')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'POST')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()

    def do_OPTIONS(self):
        self._set_headers()

    def do_POST(self):
        content_length = int(self.headers['Content-Length'])
        post_data = self.rfile.read(content_length)

        data = json.loads(post_data.decode('utf-8'))
        print("Received data:", data)
        
        if 'lat' in data and 'lng' in data:
            print("Skipping processing for lat, lng data")
            self._set_headers()
            response = json.dumps({'location': get_weather_data(data['lat'],data['lng'])}).encode('utf-8')
            self.wfile.write(response)
            return

        with warnings.catch_warnings():
            warnings.simplefilter("ignore")
            crop_recommendations = CropRecommendation("data/training_sets/X_train.csv",
            "data/training_sets/Y_train.csv")
        recommendations = crop_recommendations.get_crop_recommendation(
            data['N'], data['P'], data['K'], data['temperature'], 
            data['humidity'], data['ph'], data['rainfall'])

        self._set_headers()
        response = json.dumps({'recommendations': recommendations}).encode('utf-8')
        self.wfile.write(response)



def run(server_class=HTTPServer, handler_class=RequestHandler, port=8000):
    server_address = ('', port)
    httpd = server_class(server_address, handler_class)
    print(f"Starting server on port {port}...")
    httpd.serve_forever()

if __name__ == "__main__":
    run()
