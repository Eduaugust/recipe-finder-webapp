export function capitalizeFirstLetter(ingredient: string): string {
  return ingredient.charAt(0).toUpperCase() + ingredient.slice(1);
}