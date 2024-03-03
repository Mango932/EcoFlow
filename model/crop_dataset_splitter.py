import pandas as pd
from sklearn.model_selection import train_test_split

class CropDatasetSplitter:
    def __init__(self, file_path):
        self.dataset = pd.read_csv(file_path)
    
    def split_dataset(self, test_size=0.2, random_state=42):
        X = self.dataset.drop('crop_label', axis=1)
        Y = self.dataset['crop_label']
        X_train, X_test, Y_train, Y_test = train_test_split(X, Y, test_size=test_size, random_state=random_state)
        return X_train, X_test, Y_train, Y_test
    
    def save_splits_to_csv(self, X_train, X_test, Y_train, Y_test):
        X_train.to_csv("data/training_sets/X_train.csv", index=False)
        X_test.to_csv("data/training_sets/X_test.csv", index=False)
        Y_train.to_csv("data/training_sets/Y_train.csv", index=False)
        Y_test.to_csv("data/training_sets/Y_test.csv", index=False)

file_path = "data\dataset\Crop_recommendation_cleaned.csv"
splitter = CropDatasetSplitter(file_path)

X_train, X_test, Y_train, Y_test = splitter.split_dataset()

splitter.save_splits_to_csv(X_train, X_test, Y_train, Y_test)

