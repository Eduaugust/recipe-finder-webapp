import React, { useState } from 'react';
import { Row } from 'antd';
import Header from '../../containers/Header';
import ModalDetail from '../../containers/ModalDetail';
import { RecipeType } from '../../types/recipe';
import RecipeList from '../../containers/RecipeList';
import { useRecipe } from '../../contexts/RecipeContext'; // Importando o hook do contexto

const FavoritesPage: React.FC = () => {
  const { recipes, toggleFavorite } = useRecipe();

  const [favorites, setFavorites] = useState<string[]>(() => {
    return recipes.filter(recipe => recipe.isFavorite).map(recipe => recipe.title);
  });

  const [selectedRecipe, setSelectedRecipe] = useState<RecipeType | null>(null);

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

  return (
    <Row className="my-5 mx-8 sm:mx-16 dark:bg-black">
      <Header />
      <RecipeList  filteredData={recipes.filter(recipe => recipe.isFavorite)} handleCardClick={handleCardClick} toggleFavorite={handleToggleFavorite} />
      {selectedRecipe && (
        <ModalDetail handleModalClose={handleModalClose} selectedRecipe={selectedRecipe} toggleFavorite={handleToggleFavorite} />
      )}
    </Row>
  );
};

export default FavoritesPage;