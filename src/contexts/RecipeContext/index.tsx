import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { RecipeType } from '../../types/recipe';
import { api } from "../../api"

interface RecipeContextProps {
  recipes: RecipeType[];
  fetchRecipes: () => void;
  toggleFavorite: (id: string) => void;
  loading: boolean;
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
    const [loading, setLoading] = useState<boolean>(false);

    const fetchRecipes = async () => {
      setLoading(true);
      try {
        const response = await api.get('/api/recipes');
        setRecipes(response.data);
      } catch (error) {
        console.error('Failed to fetch recipes', error);
      } finally {
        setLoading(false);
      }
    };

    const toggleFavorite = async (id: string) => {
      try {
        setLoading(true);
        await api.post(`/api/recipes/favorites`, {
          id,
          isFavorite: !recipes.find(recipe => recipe.id === id)?.isFavorite,
        });

        const updatedRecipes = recipes.map(recipe =>
          recipe.id === id ? { ...recipe, isFavorite: !recipe.isFavorite } : recipe
        );
        setRecipes(updatedRecipes);
        setLoading(false);
      } catch (error) {
        console.error('Failed to toggle favorite', error);
      }
    };

    useEffect(() => {
      fetchRecipes();
    }, []);

    return (
      <RecipeContext.Provider value={{ recipes, fetchRecipes, toggleFavorite, loading }}>
        {children}
      </RecipeContext.Provider>
    );
  };