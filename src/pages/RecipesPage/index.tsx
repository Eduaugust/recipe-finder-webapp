import React, { useState, useMemo, useEffect } from 'react';
import { Row } from 'antd';
import Header from '../../containers/Header';
import Filter from '../../containers/Filter';
import ModalDetail from '../../containers/ModalDetail';
import { RecipeType } from '../../types/recipe';
import RecipeList from '../../containers/RecipeList';
import { useRecipe } from '../../contexts/RecipeContext'; // Importando o hook do contexto

const RecipesPage: React.FC = () => {
  const { recipes, toggleFavorite, loading } = useRecipe();

  const [filteredData, setFilteredData] = useState<RecipeType[]>(recipes);
  const [selectedRecipe, setSelectedRecipe] = useState<any>(null);
  const [favorites, setFavorites] = useState<string[]>(() => {
    return recipes.filter(recipe => recipe.isFavorite).map(recipe => recipe.title);
  });

  useEffect(() => {
    setFilteredData(recipes);
  }, [loading, recipes]);

  const handleCardClick = (recipe: RecipeType) => {
    setSelectedRecipe(recipe);
  };

  const handleModalClose = () => {
    setSelectedRecipe(null);
  };

  const handleToggleFavorite = (id: string, event?: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    if (event) {
      event.stopPropagation();
    }
    toggleFavorite(id);
    let updatedFavorites;
    if (favorites.includes(id)) {
      updatedFavorites = favorites.filter(fav => fav !== id);
    } else {
      updatedFavorites = [...favorites, id];
    }
    setFavorites(updatedFavorites);
    localStorage.setItem('favorite', JSON.stringify(updatedFavorites));
  };

  const recipeIngredients: string[] = useMemo(() => {
    const ingredientsSet = new Set<string>();
    recipes.forEach(recipe => {
      recipe.ingredients.forEach(ingredient => {
        ingredientsSet.add(ingredient);
      });
    });
    return Array.from(ingredientsSet);
  }, [recipes]);

  return (
    <Row className="my-5 mx-8 sm:mx-16 dark:bg-black">
      <Header />
      <Filter recipeIngredients={recipeIngredients} mockData={recipes} filteredData={filteredData} setFilteredData={setFilteredData} />
      <RecipeList filteredData={filteredData} handleCardClick={handleCardClick} toggleFavorite={handleToggleFavorite} />
      {selectedRecipe && (
        <ModalDetail handleModalClose={handleModalClose} selectedRecipe={selectedRecipe} toggleFavorite={handleToggleFavorite} />
      )}
    </Row>
  );
};

export default RecipesPage;
