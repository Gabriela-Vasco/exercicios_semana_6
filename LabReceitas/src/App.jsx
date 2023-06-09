import React, { useState, useEffect } from "react";
import RecipeForm from "./components/RecipeForm/RecipeForm"
import RecipeList from "./components/RecipeList/RecipeList";
import {Header} from "./components/Header/Header"
import {Footer} from "./components/Footer/Footer"
import "./App.css"

function App() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const storedRecipes = JSON.parse(localStorage.getItem("recipes")) || [];
    setRecipes(storedRecipes);
  }, []);

  useEffect(() => {
    localStorage.setItem("recipes", JSON.stringify(recipes));
  }, [recipes]);

  const handleAddRecipe = (newRecipe) => {
    setRecipes((prevRecipes) => [...prevRecipes, newRecipe]);
  };

  const handleEditRecipe = (updatedRecipe) => {
    setRecipes((prevRecipes) =>
      prevRecipes.map((recipe) =>
        recipe.id === updatedRecipe.id ? updatedRecipe : recipe
      )
    );
  };

  const handleDeleteRecipe = (recipeToDelete) => {
    setRecipes((prevRecipes) =>
      prevRecipes.filter((recipe) => recipe.id !== recipeToDelete.id)
    );
  };

  return (
    <div>
      <Header />
      <RecipeForm onSubmit={handleAddRecipe} />
      <RecipeList
        filteredRecipes={recipes}
        recipes={recipes}
        onEditRecipe={handleEditRecipe}
        onDeleteRecipe={handleDeleteRecipe}
      />
      <Footer />
    </div>
  );
}

export default App;
