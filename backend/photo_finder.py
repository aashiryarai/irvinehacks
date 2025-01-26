import os
import pandas as pd

# File path for the dataset
file_path = r"Food Ingredients and Recipe Dataset with Image Name Mapping.csv"

# Folder containing food images
image_folder = r"Food Images"

try:
    # Load the dataset
    df = pd.read_csv(file_path)

    # Debugging: Print column names
    print("Columns in the dataset:", df.columns)

    # Check for required columns
    if 'Image_Name' not in df.columns:
        print("Error: 'Image_Name' column not found in the dataset.")
        exit()

    if 'Title' in df.columns:
        recipe_name_column = 'Title'
    else:
        print("Error: No column named 'Title' found.")
        exit()

    # Function to find and display food images based on recipe names
    def find_images(matching_recipes):
        # Get all file names in the image folder
        available_images = set(os.listdir(image_folder))

        results = []

        print("\nMatching images for the recipes:")
        for recipe_name in matching_recipes:
            # Replace spaces with dashes in the recipe name
            formatted_name = recipe_name.replace(" ", "-").lower()

            # Find rows matching the recipe name
            matching_rows = df[df[recipe_name_column].str.lower() == recipe_name.lower()]

            if not matching_rows.empty:
                for _, row in matching_rows.iterrows():
                    image_name = row['Image_Name']

                    # Add the file extension (e.g., .jpg) if missing
                    image_file = image_name if os.path.splitext(image_name)[1] else f"{image_name}.jpg"

                    # Check if the formatted recipe name appears in available images
                    if any(formatted_name in img.lower() for img in available_images):
                        image_path = os.path.join(image_folder, image_file)
                        print(f"- Recipe: {recipe_name} | Image Path: {image_path}")
                        results.append((recipe_name, image_path, True))
                    else:
                        print(f"- Recipe: {recipe_name} | Image not found: {image_file}")
                        results.append((recipe_name, image_file, False))
            else:
                print(f"- Recipe: {recipe_name} | No matching entry in the dataset.")
                results.append((recipe_name, None, False))

        return results

    # Example interaction: Recipes from recipe_finder.py
    matching_recipes = []
    while True:
        user_input = input("\nEnter a recipe name (or type 'done' to finish): ").strip()
        if user_input.lower() == 'done':
            break
        if user_input:
            matching_recipes.append(user_input)

    if matching_recipes:
        results = find_images(matching_recipes)
        print("\nSummary of Results:")
        if results:
            for recipe, image, found in results:
                if found:
                    print(f"- Found: {recipe} -> {image}")
                else:
                    print(f"- Not Found: {recipe} -> {image}")
        else:
            print("No matching images were found for the provided recipes.")
    else:
        print("No recipes provided. Exiting.")

except FileNotFoundError:
    print(f"Error: File not found at {file_path} or images folder not found at {image_folder}. Please check the file paths.")
except Exception as e:
    print(f"An unexpected error occurred: {e}")
