from flask import Flask, request, jsonify
from flask_cors import CORS
from recipe_finder import search_ingredients  # Import your function

app = Flask(__name__)
CORS(app)  # Enable CORS for frontend-backend communication

@app.route('/api/recipes', methods=['GET'])
def get_recipes():
    ingredients = request.args.get('ingredients', '')
    if not ingredients:
        return jsonify({"error": "No ingredients provided"}), 400

    try:
        recipes = search_ingredients(ingredients)
        if recipes.empty:
            return jsonify([])  # Return an empty list if no recipes found

        # Convert DataFrame rows to JSON
        recipe_list = recipes.to_dict(orient='records')
        return jsonify(recipe_list)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8000, debug=True)