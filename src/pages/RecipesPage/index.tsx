import React, { useState } from 'react';
import { Row } from 'antd';
import ChickenTikkaMasala from '../../assets/chickenTikkaMasala.jpg';
import SpaghettiCarbonara from '../../assets/spaghettiCarbonara.jpg';
import ChocolateChipCookies from '../../assets/chocolateChipCookies.jpg';
import Header from '../../containers/Header';
import Filter from '../../containers/Filter';
import ModalDetail from '../../containers/ModalDetail';
import { RecipeType } from '../../types/recipe';
import RecipeList from '../../containers/RecipeList';

const RecipesPage: React.FC = () => {

  const mockData: RecipeType[] = React.useMemo(() => [
      {
          title: 'Spaghetti Carbonara',
          description: 'A classic Italian pasta dish with a creamy sauce.',
          ingredients: [
              'spaghetti',
              'pancetta',
              'large eggs',
              'grated Parmesan cheese',
              'garlic',
              'Salt and pepper'
          ],
          instructions: 'Cook the spaghetti in a pot of salted boiling water until al dente. In a pan, cook the pancetta over medium heat until crispy. Add garlic and sauté briefly. Whisk the eggs and Parmesan together in a bowl. Drain the spaghetti and add it to the pan with pancetta. Remove from heat. Quickly mix in the egg and cheese mixture, stirring to create a creamy sauce. Season with salt and pepper, and serve immediately.',
          recipeImage: SpaghettiCarbonara
      },
      {
          title: 'Chicken Tikka Masala',
          description: 'A flavorful and creamy Indian-inspired chicken dish.',
          ingredients: [
              'chicken breast',
              'plain yogurt',
              'garam masala',
              'turmeric',
              'chili powder',
              'garlic',
              'ginger',
              'tomato puree',
              'heavy cream',
              'cilantro'
          ],
          instructions: 'Marinate the chicken in yogurt, garam masala, turmeric, chili powder, garlic, and ginger for at least 2 hours. Cook the marinated chicken in a pan until fully cooked. Add tomato puree and heavy cream, and simmer until the sauce thickens. Garnish with fresh cilantro and serve with rice or naan.',
          recipeImage: ChickenTikkaMasala
      },
      {
          title: 'Chocolate Chip Cookies',
          description: 'Soft and chewy cookies loaded with chocolate chips.',
          ingredients: [
              'all-purpose flour',
              'baking soda',
              'salt',
              'unsalted butter',
              'brown sugar',
              'granulated sugar',
              'large egg',
              'vanilla extract',
              'chocolate chips'
          ],
          instructions: 'Preheat the oven to 180°C (350°F) and line a baking sheet with parchment paper. In a bowl, mix all-purpose flour, baking soda, and salt. In another bowl, beat melted unsalted butter, brown sugar, and granulated sugar until smooth. Add large egg and vanilla extract to the wet mixture and mix well. Gradually combine the wet and dry ingredients, then fold in chocolate chips. Scoop dough onto the baking sheet and bake for 10-12 minutes or until golden brown. Cool on a wire rack before serving.',
          recipeImage: ChocolateChipCookies
      }
  ], []);

  const recipeIngredients: string[] = React.useMemo(() => {
    const ingredientsSet = new Set<string>();
    mockData.forEach(recipe => {
      recipe.ingredients.forEach(ingredient => {
        ingredientsSet.add(ingredient);
      });
    });
    return Array.from(ingredientsSet);
  }, [mockData])

  const [filteredData, setFilteredData] = useState<RecipeType[]>(mockData);
  const [selectedRecipe, setSelectedRecipe] = useState<any>(null);
  const [favorites, setFavorites] = useState<string[]>(() => {
    const savedFavorites = localStorage.getItem('favorites');
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });

  const handleCardClick = (recipe: RecipeType) => {
    setSelectedRecipe(recipe);
  };

  const handleModalClose = () => {
    setSelectedRecipe(null);
  };

  const toggleFavorite = (title: string, event?: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    if (event) {
      event.stopPropagation();
    }
    let updatedFavorites;
    if (favorites.includes(title)) {
      updatedFavorites = favorites.filter(fav => fav !== title);
    } else {
      updatedFavorites = [...favorites, title];
    }
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  return (
    <Row className="my-5 mx-8 sm:mx-16 dark:bg-black">
      <Header />
      <Filter recipeIngredients={recipeIngredients} mockData={mockData} filteredData={filteredData} setFilteredData={setFilteredData} />
      <RecipeList favorites={favorites} filteredData={filteredData} handleCardClick={handleCardClick} toggleFavorite={toggleFavorite} />
      {selectedRecipe && (
        <ModalDetail favorites={favorites} handleModalClose={handleModalClose} selectedRecipe={selectedRecipe} toggleFavorite={toggleFavorite} />
      )}
        </Row>
  );
};

export default RecipesPage;