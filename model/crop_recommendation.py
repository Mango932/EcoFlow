import pandas as pd
from sklearn.naive_bayes import GaussianNB
import numpy as np

class CropRecommendation:
    def __init__(self, X_train_path, Y_train_path):
        self.X_train = pd.read_csv(X_train_path)
        self.Y_train = pd.read_csv(Y_train_path).values.ravel()
        self.classifier = GaussianNB()
        self.classifier.fit(self.X_train, self.Y_train)
        self.crop_dict = {
            1: "Rice", 2: "Maize", 3: "Jute", 4: "Cotton", 5: "Coconut", 6: "Papaya", 7: "Orange",
            8: "Apple", 9: "Muskmelon", 10: "Watermelon", 11: "Grapes", 12: "Mango", 13: "Banana",
            14: "Pomegranate", 15: "Lentil", 16: "Blackgram", 17: "Mungbean", 18: "Mothbeans",
            19: "Pigeonpeas", 20: "Kidneybeans", 21: "Chickpea", 22: "Coffee"
        }

    def recommendation(self, N, P, k, temperature, humidity, ph, rainfall):
        N, P, k, temperature, humidity, ph, rainfall = float(N), float(P), float(k), float(temperature), float(humidity), float(ph), float(rainfall)
        features = np.array([[N, P, k, temperature, humidity, ph, rainfall]])
        prediction = self.classifier.predict(features).reshape(1, -1)
        return prediction[0]

    def get_crop_recommendation(self, N, P, k, temperature, humidity, ph, rainfall):
        predict = self.recommendation(N, P, k, temperature, humidity, ph, rainfall)
        if predict[0] in self.crop_dict:
            crop = self.crop_dict[predict[0]]
            return "{} is a best crop to be cultivated".format(crop)
        else:
            return "Sorry are not able to recommend a proper crop for this environment"

