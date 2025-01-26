import pandas as pd
import os
current_dir = os.path.dirname(os.path.abspath(__file__))

# Build the absolute path to the dataset
file_path = os.path.join(current_dir, "Food Ingredients and Recipe Dataset with Image Name Mapping.csv")

# Load the dataset
df = pd.read_csv(file_path)

# Fill missing values in the 'Ingredients' column
df['Ingredients'] = df['Ingredients'].fillna("")

# Function to search for recipes containing all ingredients
def search_ingredients(input_ingredients):
    ingredients_list = [ingredient.strip().lower() for ingredient in input_ingredients.split(",")]

    # Filter rows where all ingredients appear in the 'Ingredients' column
    def contains_all_ingredients(row):
        row_ingredients = row.lower() if isinstance(row, str) else ""
        return all(ingredient in row_ingredients for ingredient in ingredients_list)

    matching_rows = df[df['Ingredients'].apply(contains_all_ingredients)]
    return matching_rows[['Title', 'Ingredients', 'Image_Name']]
