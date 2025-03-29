// import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { RecipeFull } from '../../types/RecipeFull';
import './RecipeDetailsPage.scss';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { addToCart, removeFromCart } from '../../features/cart';
import { useQuery } from '@tanstack/react-query';
import { recipesService } from '../../api/recipesApi';

export const RecipeDetailsPage: React.FC = ({}) => {
  const { itemId } = useParams<{ itemId: string }>();

  const cart = useSelector((state: RootState) => state.cart);

  const dispatch = useDispatch();

  const { data: recipe } = useQuery<RecipeFull | undefined>({
    queryKey: ['recipe', itemId],
    queryFn: () => recipesService.getRecipe(itemId!),
    enabled: !!itemId,
  });

  const isSelected = cart.some(r => r.idMeal === recipe?.idMeal);

  const handleAddToCart = () => {
    if (!recipe) {
      return;
    }

    dispatch(addToCart(recipe));
  };

  const handleRemoveRecipe = () => {
    if (!recipe) {
      return;
    }

    dispatch(removeFromCart(recipe.idMeal));
  };

  const getIngredients = () => {
    const ingredientsArray: { ingredient: string; measure: string }[] = [];

    if (!recipe) {
      return [];
    }

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
      ingredientsArray.push({
        ingredient: entriesIngredients[i],
        measure: entriesMeasures[i],
      });
    }

    return ingredientsArray;
  };

  const ingredients = getIngredients();

  return (
    <div className="recipe-details">
      <Link className="link" to={`/`}>
        Home
      </Link>
      <h2>{recipe?.strMeal}</h2>
      <p>
        <span>Category:</span> {recipe?.strCategory}
      </p>
      <p>
        <span>Region:</span> {recipe?.strArea}
      </p>
      <img src={recipe?.strMealThumb} alt={recipe?.strMeal} />
      <h3>Ingredients:</h3>
      <ul>
        {ingredients.map((item, index) => (
          <li key={index}>
            {item.ingredient} - {item.measure}
          </li>
        ))}
      </ul>
      <h3>Instructions:</h3>
      <p>{recipe?.strInstructions}</p>
      {recipe?.strYoutube && (
        <p>
          <span>Video Recipe:</span>
          <a href={recipe?.strYoutube} target="_blank" rel="noreferrer">
            Watch on YouTube
          </a>
        </p>
      )}
      {recipe?.strSource && (
        <p>
          <span>Source:</span>
          <a href={recipe?.strSource} target="_blank" rel="noreferrer">
            View original recipe
          </a>
        </p>
      )}

      <div className="card__actions">
        <button type="button" onClick={handleAddToCart} disabled={isSelected}>
          {isSelected ? 'Added' : 'Add to cart'}
        </button>
        <button onClick={handleRemoveRecipe} disabled={!isSelected}>
          Remove
        </button>
      </div>
    </div>
  );
};
