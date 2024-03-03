import pandas as pd

class CropDatasetCleaner:
    def __init__(self, file_path):
        self.file_path = file_path
        self.dataset = pd.read_csv(file_path)
        self.crop_dict = {
            'rice': 1, 'maize': 2, 'jute': 3, 'cotton': 4, 'coconut': 5, 'papaya': 6,
            'orange': 7, 'apple': 8, 'muskmelon': 9, 'watermelon': 10, 'grapes': 11,
            'mango': 12, 'banana': 13, 'pomegranate': 14, 'lentil': 15, 'blackgram': 16,
            'mungbean': 17, 'mothbeans': 18, 'pigeonpeas': 19, 'kidneybeans': 20,
            'chickpea': 21, 'coffee': 22
        }
    
    def change_text_to_int(self):
        self.dataset['crop_label'] = self.dataset['label'].map(self.crop_dict)
    
    def remove_label_column(self):
        self.dataset = self.dataset.drop('label', axis=1)
    
    def save_to_csv(self, output_file):
        self.dataset.to_csv(output_file, index=False)
    
    def get_dataset(self):
        return self.dataset

file_path = "data\dataset\Crop_recommendation.csv"
output_file = "data\dataset\Crop_recommendation_cleaned.csv"
crop_dataset = CropDataset(file_path)

crop_dataset.change_text_to_int()
crop_dataset.remove_label_column()
print(crop_dataset.get_dataset().head())

# Save modified dataset to CSV
crop_dataset.save_to_csv(output_file)
