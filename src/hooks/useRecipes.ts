import { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useDebounce } from './useDebounce';
import { RecipeFull } from '../types/RecipeFull';
import { recipesService } from '../api/recipesApi';
import { useQuery } from '@tanstack/react-query';

export function useRecipes() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const category = searchParams.get('category') || 'All';

  const [searchValue, setSearchValue] = useState(query);

  const appliedQuery = useDebounce(searchValue, 1000);

  useEffect(() => {
    const params = new URLSearchParams(searchParams);

    if (appliedQuery) {
      params.set('query', appliedQuery);
    } else {
      params.delete('query');
    }

    setSearchParams(params);
  }, [appliedQuery, searchParams, setSearchParams]);

  const { data: recipes = [], isLoading: isRecipesLoading } = useQuery({
    queryKey: ['recipes', appliedQuery],
    queryFn: () => recipesService.getRecipes(appliedQuery),
  });

  const { data: categories = [], isLoading: isCategoriesLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: () => recipesService.getCategories(),
  });

  const isLoading = isRecipesLoading || isCategoriesLoading;

  const filteredRecipes = useMemo(() => {
    return (
      recipes?.filter(
        (recipe: RecipeFull) =>
          category === 'All' || recipe.strCategory === category,
      ) || []
    );
  }, [category, recipes]);

  return {
    filteredRecipes,
    categories,
    searchValue,
    setSearchValue,
    category,
    searchParams,
    setSearchParams,
    isLoading,
  };
}
