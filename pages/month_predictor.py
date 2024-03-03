import pandas as pd
from datetime import datetime
from dateutil.relativedelta import relativedelta

# Read the CSV file
df = pd.read_csv("data/Maximum_cropyield_months.csv")


# Function to determine the next best planting month
def get_next_best_planting_month(crop, longitude, latitude):
    if latitude >= 29:
        region = "North"
    elif latitude <= 14:
        region = "South"
    elif longitude >= 20:
        region = "East"
    elif longitude < 20:
        region = "West"
    else:
        return "Invalid location"

    months = df.loc[df['Crop'] == crop, region].values[0]

    if crop not in df['Crop'].values or region not in df.columns:
        return "Crop or region not found in the database."
        
    if months == "All-year":
        return f"Based on the provided information, planting at any time of the year would result in maximum potential crop yield."

    month_ranges = []
    for month_range in months.split(','):
        month_range = month_range.strip()
        if '-' in month_range:
            start_month, end_month = month_range.split('-')
            month_ranges.append((start_month.strip(), end_month.strip()))
        else:
            month_ranges.append((month_range.strip(), month_range.strip()))

    today = datetime.now()

    for start_month, end_month in month_ranges:
        start_date = datetime(today.year, datetime.strptime(start_month, "%b").month, 1)
        end_date = datetime(today.year, datetime.strptime(end_month, "%b").month, 1) + relativedelta(months=1)
        if start_date <= today <= end_date:
            return f"Planting at this time would currently yield the maximum potential crop."

    next_best_month = None
    for start_month, _ in month_ranges:
        month = datetime.strptime(start_month, "%b").month
        if today.month < month:
            next_best_month = datetime(today.year, month, 1).strftime("%b")
            break
    if next_best_month:
        return f"Based on the provided information, the next optimal month for planting {crop} is {get_proper_name(next_best_month)}."
    else:
        return "No suitable planting month found"


# Function to convert abbreviated month names to full names
def get_proper_name(month):
    month_dict = {
        "Jan": "January",
        "Feb": "February",
        "Mar": "March",
        "Apr": "April",
        "May": "May",
        "Jun": "June",
        "Jul": "July",
        "Aug": "August",
        "Sep": "September",
        "Oct": "October",
        "Nov": "November",
        "Dec": "December"
    }
    return month_dict.get(month, "Invalid Month")
