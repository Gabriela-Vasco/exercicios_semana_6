import React, { useState } from "react";
import "./RecipeList.css"

function RecipeList({ recipes, onEditRecipe, onDeleteRecipe }) {
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [filter, setFilter] = useState("all");

  const handleEditClick = (recipe) => {
    setSelectedRecipe(recipe);
  };

  const handleDeleteClick = (recipe) => {
    onDeleteRecipe(recipe);
  };

  const filteredRecipes = () => {
    if (filter === "all") {
      return recipes;
    } else if (filter === "dairy-free") {
      return recipes.filter((recipe) => !recipe.containsDairy);
    } else if (filter === "gluten-free") {
      return recipes.filter((recipe) => !recipe.containsGluten);
    }
  };

  return (
    <div className="recipe-list">
      <div recipe-card>
        <h2>Filtrar por:</h2>
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="all">Todos</option>
          <option value="dairy-free">Sem lactose</option>
          <option value="gluten-free">Sem glúten</option>
        </select>
      </div>

      <h2>Lista de Receitas</h2>
      {recipes.length === 0 && <p>Nenhuma receita encontrada.</p>}
      <ul>
        {filteredRecipes().map((recipe) => (
          <li key={recipe.id}>
            <button onClick={() => handleEditClick(recipe)}>!</button>
            <h3>{recipe.name}</h3>
            <p>Ingredientes: {recipe.ingredients.join(", ")}</p>
            <p>Modo de Preparo: {recipe.instructions.join(", ")}</p>
            {recipe.containsDairy && <p>Contém Lactose</p>}
            {recipe.containsGluten && <p>Contém Glúten</p>}
            <button onClick={() => handleDeleteClick(recipe)}>Excluir</button>
          </li>
        ))}
      </ul>

      {selectedRecipe && (
        <RecipeModal
          recipe={selectedRecipe}
          onClose={() => setSelectedRecipe(null)}
          onEdit={onEditRecipe}
        />
      )}
    </div>
  );
}

function RecipeModal({ recipe, onClose, onEdit }) {
  const [name, setName] = useState(recipe.name);
  const [ingredients, setIngredients] = useState(
    recipe.ingredients.join("\n")
  );
  const [instructions, setInstructions] = useState(
    recipe.instructions.join("\n")
  );
  const [containsDairy, setContainsDairy] = useState(recipe.containsDairy);
  const [containsGluten, setContainsGluten] = useState(recipe.containsGluten);

  const handleSave = () => {
    const updatedRecipe = {
      ...recipe,
      name,
      ingredients: ingredients.split("\n"),
      instructions: instructions.split("\n"),
      containsDairy,
      containsGluten,
    };
    onEdit(updatedRecipe);
    onClose();
  };

  return (
    <div>
      <div>
        <h2>{recipe.name}</h2>
        <button onClick={onClose}>Fechar</button>
      </div>
      <div>
        <label>
          Nome:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          Ingredientes:
          <textarea
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          Modo de Preparo:
          <textarea
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          Restrições:
          <input
            type="checkbox"
            checked={containsDairy}
            onChange={(e) => setContainsDairy(e.target.checked)}
          />
          Lactose
        </label>
        <label>
          <input
            type="checkbox"
            checked={containsGluten}
            onChange={(e) => setContainsGluten(e.target.checked)}
          />
          Glúten
        </label>
      </div>
      <button onClick={handleSave}>Salvar</button>
    </div>
  );
}

export default RecipeList;