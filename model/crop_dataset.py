import pandas as pd

class CropDataset:
    def __init__(self, file_path):
        self.dataset = pd.read_csv(file_path)
    
    def get_num_rows(self):
        return self.dataset.shape[0]
    
    def get_info(self):
        return self.dataset.info()
    
    def check_null_values(self):
        return self.dataset.isnull().sum()
    
    def check_duplicates(self):
        return self.dataset.duplicated().sum()
    
    def get_statistics(self):
        return self.dataset.describe()

file_path = "data\dataset\Crop_recommendation.csv"
crop_dataset = CropDataset(file_path)

print("Num of rows:", crop_dataset.get_num_rows(), "\n")
print("Dataset info:\n", crop_dataset.get_info(), "\n")
print("Null values:\n", crop_dataset.check_null_values(), "\n")
print("Duplicates:", crop_dataset.check_duplicates(), "\n")
print("Statistics:\n", crop_dataset.get_statistics(), "\n")
