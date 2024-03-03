from http.server import BaseHTTPRequestHandler, HTTPServer
import json
import sys
import os
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
from model.crop_recommendation import CropRecommendation
import warnings
from pages.api.weather_api import get_weather_data
from pages.month_predictor import get_next_best_planting_month

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
            file_path = 'core/coordinates.json'

            with open(file_path, 'w') as json_file:
                json.dump(data, json_file)

            self._set_headers()
            response = json.dumps({'location': get_weather_data(get_lat(), get_lng())}).encode('utf-8')
            self.wfile.write(response)
            return

        with warnings.catch_warnings():
            warnings.simplefilter("ignore")
            crop_recommendations = CropRecommendation("data/training_sets/X_train.csv",
            "data/training_sets/Y_train.csv")
        
        recommendations = crop_recommendations.get_crop_recommendation(
            data['N'], data['P'], data['K'], data['temperature'], 
            data['humidity'], data['ph'], data['rainfall'])
        
        # Get next best planting month
        next_best_month = get_next_best_planting_month(max(recommendations, key=lambda x: x[1])[0],get_lng(), get_lat())


        self._set_headers()
        response = json.dumps({'recommendations': recommendations, "best_month":  next_best_month}).encode('utf-8')
        print(response)
        self.wfile.write(response)

def get_lat():
    with open('core/coordinates.json') as f:
        data = json.load(f)
    lat = data['lat']
    return lat

def get_lng():
    with open('core/coordinates.json') as f:
        data = json.load(f)
    lng = data['lng']
    return lng

def run(server_class=HTTPServer, handler_class=RequestHandler, port=8000):
    server_address = ('', port)
    httpd = server_class(server_address, handler_class)
    print(f"Starting server on port {port}...")
    httpd.serve_forever()

if __name__ == "__main__":
    run()
