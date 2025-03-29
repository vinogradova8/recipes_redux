import { RecipeFull } from '../types/RecipeFull';

class RecipesService {
  private BASE_URL = 'https://www.themealdb.com/api/json/v1/1';

  async getRecipe(id: string): Promise<RecipeFull | undefined> {
    const response = await fetch(`${this.BASE_URL}/lookup.php?i=${id}`);
    const data = await response.json();

    return data.meals?.[0];
  }

  async getRecipes(searchQuery: string) {
    const response = await fetch(
      `${this.BASE_URL}/search.php?s=${searchQuery}`,
    );
    const data = await response.json();

    return data.meals || [];
  }

  async getCategories() {
    const response = await fetch(`${this.BASE_URL}/categories.php`);
    const data = await response.json();

    return data.categories.map((c: { strCategory: string }) => c.strCategory);
  }
}

export const recipesService = new RecipesService();

// export async function fetchRecipes(searchQuery: string) {
//   const response = await fetch(`${BASE_URL}/search.php?s=${searchQuery}`);
//   const data = await response.json();

//   return data.meals || [];
// }

// export async function fetchCategories() {
//   const response = await fetch(`${BASE_URL}/categories.php`);
//   const data = await response.json();

//   return data.categories.map((c: { strCategory: string }) => c.strCategory);
// }
