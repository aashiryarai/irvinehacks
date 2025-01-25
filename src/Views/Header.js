import React, { useState } from 'react';
import { Search } from 'lucide-react';
import logo from './assets/images/images/logo512.png';

const Header = () => {
    const [ingredient, setIngredient] = useState('');
    const [recipe, setRecipe] = useState(null);

    // Function to fetch the recipe from your backend
    const searchRecipe = async () => {
        if (!ingredient.trim()) {
            alert("Please enter an ingredient.");
            return;
        }

        const url = `http://localhost:5000/api/recipes?ingredients=${ingredient}`; // Backend URL

        try {
            const response = await fetch(url);
            const data = await response.json();

            if (data && data.title) {
                setRecipe(data);
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
        <header className="header-container">
            <div className="header-content">
                {/* Left Side: Title and Search Bar */}
                <div className="header-left">
                    <h1 className="header-title">Recipe Finder</h1>
                    <div className="search-bar">
                        <input
                            id="ingredient-search"
                            type="text"
                            value={ingredient}
                            onChange={(e) => setIngredient(e.target.value)}
                            onKeyPress={handleKeyPress}
                            placeholder="Enter ingredients..."
                            className="search-input"
                        />
                        <button
                            id="search-button"
                            onClick={searchRecipe}
                            className="search-button"
                        >
                            <Search size={20} />
                        </button>
                    </div>
                </div>

                {/* Right Side: Logo */}
                <div className="header-right">
                    <img src={logo} alt="Recipe Finder Logo" className="logo" />
                </div>
            </div>

            {/* Recipe Result */}
            {recipe && (
                <div id="recipe-result" className="recipe-result">
                    <h2 id="recipe-title" className="recipe-title">{recipe.title}</h2>
                    <img
                        id="recipe-image"
                        src={recipe.image || 'placeholder-image-url.jpg'} // Add a placeholder if no image is provided
                        alt={recipe.title}
                        className="recipe-image"
                    />
                    <p id="cook-time" className="cook-time">
                        Ready in {recipe.readyInMinutes || 'N/A'} minutes
                    </p>
                    <a
                        id="recipe-link"
                        href={recipe.sourceUrl || '#'}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="recipe-link"
                    >
                        View Full Recipe
                    </a>
                </div>
            )}
        </header>
    );
};

export default Header;
