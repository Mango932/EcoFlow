import pandas as pd
import seaborn as sns
import matplotlib.pyplot as plt

class CropDataAnalysis:
    def __init__(self, file_path):
        self.dataset = pd.read_csv(file_path)
    
    def calculate_correlation(self):
        return self.dataset.drop(['label'], axis=1).corr()
    
    def plot_heatmap(self, data):
        heatmap = sns.heatmap(data, annot=True, cbar=True, cmap='coolwarm')
        plt.show()
    
    def crop_values_count(self):
        return self.dataset['label'].value_counts()
    
    def plot_nitrogen_distribution(self):
        displot = sns.displot(self.dataset['N'])
        plt.show()

file_path = "data\dataset\Crop_recommendation.csv"
crop_analysis = CropDataAnalysis(file_path)

correlation_data = crop_analysis.calculate_correlation()
print("Correlation:\n", correlation_data, "\n")

crop_analysis.plot_heatmap(correlation_data)

crop_values = crop_analysis.crop_values_count()
print("Crop values count:\n", crop_values, "\n")

crop_analysis.plot_nitrogen_distribution()
