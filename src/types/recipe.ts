export type RecipeType = {
  id?: string;
  title: string;
  description: string;
  ingredients: string[];
  instructions: string;
  recipeImage: string;
  isFavorite?: boolean;
}