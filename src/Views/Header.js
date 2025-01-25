import React, { useState } from 'react';
import { Search } from 'lucide-react';

const Header = () => {
    const [ingredient, setIngredient] = useState('');
    const [recipe, setRecipe] = useState(null);

    const apiKey = "YOUR_SPOONACULAR_API_KEY"; // Replace with your API key

    // Function to fetch the recipe
    const searchRecipe = async () => {
        if (!ingredient.trim()) {
            alert("Please enter an ingredient.");
            return;
        }

        const url = `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredient}&number=1&apiKey=${apiKey}`;

        try {
            const response = await fetch(url);
            const data = await response.json();

            if (data.length > 0) {
                setRecipe(data[0]);
            } else {
                alert("No recipes found. Try another ingredient.");
            }
        } catch (error) {
            console.error("Error fetching data:", error);
            alert("There was an error fetching the recipe. Please try again later.");
        }
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            searchRecipe();
        }
    };

    return (
        <header className="bg-gray-100 shadow-md">
            {/* Top Banner */}
            <div className="bg-blue-700 text-white text-sm py-2 text-center">
                Your special offer: Find the perfect recipe for any ingredient combination!
            </div>

            {/* Main Header Section */}
            <div className="container mx-auto flex flex-col items-center py-6">
                {/* Logo */}
                <div className="flex items-center space-x-4 mb-4">
                    <img
                        src="/assets/images/images/logo512.png" // Adjusted path
                        alt="Recipe Finder Logo"
                        className="h-12"
                    />
                    <h1 className="text-xl font-bold text-gray-800">Recipe Finder</h1>
                </div>

                {/* Search Bar */}
                <div className="flex items-center space-x-2">
                    <input
                        id="ingredient-search"
                        type="text"
                        value={ingredient}
                        onChange={(e) => setIngredient(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Enter ingredients..."
                        className="w-64 h-12 px-4 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                        id="search-button"
                        onClick={searchRecipe}
                        className="bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600 flex items-center"
                    >
                        <Search size={20} />
                    </button>
                </div>

                {/* Recipe Result */}
                {recipe && (
                    <div id="recipe-result" className="mt-6 p-4 border border-gray-300 rounded-lg w-full max-w-md">
                        <h2 id="recipe-title" className="text-xl font-bold">{recipe.title}</h2>
                        <img
                            id="recipe-image"
                            src={recipe.image}
                            alt={recipe.title}
                            className="w-full h-auto rounded-lg mt-4"
                        />
                        <p id="cook-time" className="text-gray-600 mt-2">
                            Ready in {recipe.readyInMinutes ? recipe.readyInMinutes : 'N/A'} minutes
                        </p>
                        <a
                            id="recipe-link"
                            href={`https://spoonacular.com/recipes/${recipe.title}-${recipe.id}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500 underline mt-2 block"
                        >
                            View Full Recipe
                        </a>
                    </div>
                )}
            </div>
        </header>
    );
};

export default Header;
