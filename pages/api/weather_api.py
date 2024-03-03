import requests
import json

# Get the weather data for a given latitude and longitude
def get_weather_data(lat, lon):
    url = f"https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/{lat},{lon}?unitGroup=metric&include=days&key={get_APIKEY()}&contentType=json"

    print(url)

    response = requests.get(url)
    data = response.json()

    return get_averages(data)

# Get the average weather data from the weather data
def get_averages(data):
    days = data['days']

    averages ={
        'temperature': 0,
        'rainfall': 0,
        'humidity': 0,
    }

    for day in days:
        averages['temperature'] += day['temp']
        averages['rainfall'] += day['precip']
        averages['humidity'] += day['humidity']

    averages['temperature'] /= len(days)
    averages['rainfall'] /= 10
    averages['humidity'] /= len(days)


    return averages


# Get the API key from the apikey.json file
def get_APIKEY():
    with open('apikey.json') as f:
        data = json.load(f)
    api_key = data['APIKEY']
    return api_key

# Example usage
weather_data = get_weather_data(37.7749, -122.4194)
print(weather_data)
