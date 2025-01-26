import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import logo from './logo512.png';

const Header = () => {
    const [ingredient, setIngredient] = useState('');
    const [recipes, setRecipes] = useState([]);
    const [error, setError] = useState(''); // For error messages
    const [hasSearched, setHasSearched] = useState(false); // Track if search has been performed

    const searchRecipe = async () => {
        if (!ingredient.trim()) {
            alert("Please enter an ingredient.");
            return;
        }

        // Clear previous errors and recipes before starting a new search
        setError('');
        setRecipes([]);

        try {
            const response = await fetch(`http://11.20.55.3:8000/api/recipes?ingredients=${ingredient}`);
            if (!response.ok) {
                throw new Error("Failed to fetch recipes.");
            }

            const data = await response.json();
            console.log("Fetched data:", data);

            // Check the structure of the response and update recipes accordingly
            if (data && Array.isArray(data.data)) {
                setRecipes(data.data); // Assuming recipes are in data.data
            } else if (Array.isArray(data)) {
                setRecipes(data); // If the backend sends recipes as an array directly
            } else {
                setRecipes([]); // Fallback if the structure is unexpected
            }

            setHasSearched(true); // Indicate that a search has been performed
        } catch (error) {
            console.error("Error fetching data:", error.message);
            setError("There was an error fetching the recipes."); // Set error message
            setHasSearched(true); // Indicate that a search was attempted
        }
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            searchRecipe();
        }
    };

    // Debug the recipes state
    useEffect(() => {
        console.log("Recipes state updated:", recipes);
    }, [recipes]);

    return (
        <header className="header-container">
            <div className="header-content">
                {/* Search Bar Section */}
                <div className="header-left">
                    <h1 className="header-title">Recipe Finder</h1>
                    <div className="search-bar">
                        <input
                            type="text"
                            value={ingredient}
                            onChange={(e) => setIngredient(e.target.value)}
                            onKeyPress={handleKeyPress}
                            placeholder="Enter ingredients..."
                            className="search-input"
                        />
                        <button onClick={searchRecipe} className="search-button">
                            <Search size={20} />
                        </button>
                    </div>
                </div>
                {/* Logo Section */}
                <div className="header-right">
                    <img src={logo} alt="Recipe Finder Logo" className="logo" />
                </div>
            </div>

            {/* Recipe List */}
            {hasSearched && (
                <div className="recipe-list">
                    {/* Show error message if there is an error */}
                    {error ? (
                        <p className="error-message">{error}</p>
                    ) : (
                        // Show recipes if they exist
                        recipes.length > 0 ? (
                            recipes.map((recipe, index) => (
                                <div key={index} className="recipe-card">
                                    <h2>{recipe.Title}</h2>
                                    {recipe.Image_Name && (
                                        <img
                                            src={recipe.Image_Name}
                                            alt={recipe.Title}
                                            className="recipe-image"
                                        />
                                    )}
                                    <p>Ingredients: {recipe.Ingredients}</p>
                                </div>
                            ))
                        ) : (
                            // If no recipes and no error, show fallback message
                            <p>No recipes found. Try entering different ingredients.</p>
                        )
                    )}
                </div>
            )}
        </header>
    );
};

export default Header;
