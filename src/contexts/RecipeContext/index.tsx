import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';
import { RecipeType } from '../../types/recipe';

interface RecipeContextProps {
  recipes: RecipeType[];
  fetchRecipes: () => void;
  toggleFavorite: (id: string) => void;
}

const RecipeContext = createContext<RecipeContextProps | undefined>(undefined);

export const useRecipe = () => {
  const context = useContext(RecipeContext);
  if (!context) {
    throw new Error('useRecipe must be used within a RecipeProvider');
  }
  return context;
};

export const RecipeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [recipes, setRecipes] = useState<RecipeType[]>([]);

  const fetchRecipes = async () => {
    try {
      const response = await axios.get('/api/recipes');
      setRecipes(response.data);
    } catch (error) {
      console.error('Failed to fetch recipes', error);
    }
  };

  const toggleFavorite = async (id: string) => {
    try {
      await axios.post(`/api/recipes/favorites`, {
        id,
        isFavorite: !recipes.find(recipe => recipe.id === id)?.isFavorite,
      });

      const updatedRecipes = recipes.map(recipe =>
        recipe.id === id ? { ...recipe, isFavorite: !recipe.isFavorite } : recipe
      );
      setRecipes(updatedRecipes);
    } catch (error) {
      console.error('Failed to toggle favorite', error);
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  return (
    <RecipeContext.Provider value={{ recipes, fetchRecipes, toggleFavorite }}>
      {children}
    </RecipeContext.Provider>
  );
};