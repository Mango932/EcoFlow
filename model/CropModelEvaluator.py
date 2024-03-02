import pandas as pd
from sklearn.linear_model import LogisticRegression
from sklearn.naive_bayes import GaussianNB
from sklearn.svm import SVC
from sklearn.neighbors import KNeighborsClassifier
from sklearn.tree import DecisionTreeClassifier
from sklearn.tree import ExtraTreeClassifier
from sklearn.ensemble import RandomForestClassifier
from sklearn.ensemble import BaggingClassifier
from sklearn.ensemble import GradientBoostingClassifier
from sklearn.ensemble import AdaBoostClassifier
from sklearn.metrics import accuracy_score

class CropModelEvaluator:
    def __init__(self, X_train_path, X_test_path, Y_train_path, Y_test_path):
        self.X_train = pd.read_csv(X_train_path)
        self.X_test = pd.read_csv(X_test_path)
        self.Y_train = pd.read_csv(Y_train_path).values.ravel()
        self.Y_test = pd.read_csv(Y_test_path).values.ravel()
        self.models = {
            'Logistic Regression': LogisticRegression(),
            'Naive Bayes': GaussianNB(),
            'Support Vector Machine': SVC(),
            'K-Nearest Neighbors': KNeighborsClassifier(),
            'Decision Tree': DecisionTreeClassifier(),
            'Random Forest': RandomForestClassifier(),
            'Bagging': BaggingClassifier(),
            'AdaBoost': AdaBoostClassifier(),
            'Gradient Boosting': GradientBoostingClassifier(),
            'Extra Trees': ExtraTreeClassifier(),
        }
        self.scores = {}

    def evaluate_models(self):
        for name, model in self.models.items():
            model.fit(self.X_train, self.Y_train)
            y_pred = model.predict(self.X_test)
            accuracy = accuracy_score(self.Y_test, y_pred)
            self.scores[name] = accuracy

    def get_best_model(self):
        best_model = max(self.scores, key=self.scores.get)
        return best_model, self.scores[best_model]

X_train_path = "data/training_sets/X_train.csv"
X_test_path = "data/training_sets/X_test.csv"
Y_train_path = "data/training_sets/Y_train.csv"
Y_test_path = "data/training_sets/Y_test.csv"

evaluator = CropModelEvaluator(X_train_path, X_test_path, Y_train_path, Y_test_path)
evaluator.evaluate_models()
best_model, best_score = evaluator.get_best_model()

print(f"Best model is {best_model} with accuracy: {round(best_score*100, 2)}%")
