# Crop Recommendation System

## Overview
This project aims to build a crop recommendation system based on agricultural data. The dataset used contains information about various crops and their requirements such as Nitrogen, Phosphorus, Potassium (NPK) levels, temperature, humidity, pH, and rainfall. The goal is to predict the best crop to be cultivated based on these factors.

## Dataset
The dataset contains 2200 entries with 7 features (N, P, K, temperature, humidity, pH, rainfall) and 1 target variable (crop). There are no missing values in the dataset. The dataset is explored using descriptive statistics and correlation analysis.

## Preprocessing
Categorical variables are converted to integer format using a mapping dictionary. The 'label' column is dropped from the dataset.

## Model Building
Several classification models are trained and evaluated using the dataset:
- Logistic Regression
- Naive Bayes
- Support Vector Machine
- K-Nearest Neighbors
- Decision Tree
- Random Forest
- Bagging
- AdaBoost
- Gradient Boosting
- Extra Trees

Naive Bayes is selected as the final model due to its high accuracy of 99.54%.

## Usage
The trained Random Forest model can be used to make crop recommendations based on user input. A sample function `recommendation` is provided to demonstrate how the model can be used to predict the best crop for a given set of environmental conditions.

## Sample Prediction
Using the `recommendation` function, the model predicts that Kidneybeans is the best crop to be cultivated given N=40, P=50, K=50, temperature=40.0, humidity=20, pH=100, and rainfall=100.

## Model Serialization
The trained Random Forest model is serialized using pickle for future use.
