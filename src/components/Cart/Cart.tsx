import { Card } from '../RecipeCard';
import { Link } from 'react-router-dom';
import { FilterPanel } from '../FilterPanel';
import { useRecipes } from '../../hooks/useRecipes';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { useEffect } from 'react';
import { Loader } from '../Loader';

export const Cart: React.FC = () => {
  const cart = useSelector((state: RootState) => state.cart);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const {
    categories,
    searchValue,
    setSearchValue,
    category,
    searchParams,
    setSearchParams,
    isLoading,
  } = useRecipes();

  const filteredSelectedRecipes = cart.filter(recipe => {
    const matchesSearch = recipe.strMeal
      .toLowerCase()
      .includes(searchValue.toLowerCase());

    const matchesCategory =
      category === 'All' || recipe.strCategory === category;

    return matchesSearch && matchesCategory;
  });

  const getAllIngredients = () => {
    const ingredientsArray: [string, string][] = [];

    cart.forEach(recipe => {
      const entries = Object.entries(recipe);

      const entriesIngredients = entries.reduce<string[]>((acc, entry) => {
        if (
          entry[0].includes('strIngredient') &&
          entry[1]?.trim() !== '' &&
          entry[1] !== null
        ) {
          acc.push(entry[1]);
        }

        return acc;
      }, []);

      const entriesMeasures = entries.reduce<string[]>((acc, entry) => {
        if (
          entry[0].includes('strMeasure') &&
          entry[1]?.trim() !== '' &&
          entry[1] !== null
        ) {
          acc.push(entry[1]);
        }

        return acc;
      }, []);

      for (let i = 0; i < entriesIngredients.length; i++) {
        const ingredientName = entriesIngredients[i] || '';
        const measure = entriesMeasures[i] || '';

        const index = ingredientsArray.findIndex(
          item => item[0] === ingredientName,
        );

        if (index !== -1) {
          ingredientsArray[index][1] += `, ${measure}`;
        } else {
          ingredientsArray.push([ingredientName, measure]);
        }
      }
    });

    return ingredientsArray;
  };

  const combinedIngredients = getAllIngredients();

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div>
      <div className="header">
        <Link className="link" to={`/`}>
          Home
        </Link>

        {cart.length === 0 ? (
          <p>No recipes selected.</p>
        ) : (
          <FilterPanel
            searchValue={searchValue}
            onSearchChange={setSearchValue}
            category={category}
            categories={categories}
            searchParams={searchParams}
            onSearchParamsChange={setSearchParams}
          />
        )}
      </div>

      {filteredSelectedRecipes.length > 0 && (
        <>
          <h2>Selected Recipes</h2>
          <div className="recipes">
            {filteredSelectedRecipes.map(recipe => (
              <Card key={recipe.idMeal} recipe={recipe} />
            ))}
          </div>
          <h2>All Ingredients</h2>
          <ul>
            {combinedIngredients.map(item => (
              <li key={item[0]}>
                {item[0]} {`(${item[1]})`}
              </li>
            ))}
          </ul>
          <h2>All Instructions</h2>
          <ul>
            {cart.map(recipe => (
              <li key={recipe.idMeal}>
                <h3>{recipe.strMeal}</h3>
                <p>{recipe.strInstructions}</p>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};
