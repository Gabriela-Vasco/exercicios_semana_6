import React, { useState, useEffect } from "react";
import "./RecipeForm.css"

function RecipeForm({ onSubmit }) {
  const [name, setName] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");
  const [containsDairy, setContainsDairy] = useState(false);
  const [containsGluten, setContainsGluten] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newRecipe = {
      id: Date.now(),
      name,
      ingredients: ingredients.split("\n"),
      instructions: instructions.split("\n"),
      containsDairy,
      containsGluten,
    };
    onSubmit(newRecipe);
    setName("");
    setIngredients("");
    setInstructions("");
    setContainsDairy(false);
    setContainsGluten(false);
  };

  useEffect(() => {
    const storedRecipe = localStorage.getItem("recipe");
    if (storedRecipe) {
      const { name, ingredients, instructions, containsDairy, containsGluten } =
        JSON.parse(storedRecipe);
      setName(name);
      setIngredients(ingredients);
      setInstructions(instructions);
      setContainsDairy(containsDairy);
      setContainsGluten(containsGluten);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "recipe",
      JSON.stringify({
        name,
        ingredients,
        instructions,
        containsDairy,
        containsGluten,
      })
    );
  }, [name, ingredients, instructions, containsDairy, containsGluten]);

  return (
    <form onSubmit={handleSubmit}>
      <h2>Adicionar Receita</h2>
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
      <button type="submit">Salvar</button>
    </form>
  );
}

export default RecipeForm;
