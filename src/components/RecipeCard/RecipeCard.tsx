import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { RecipeFull } from '../../types/RecipeFull';
import './RecipeCard.scss';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { addToCart, removeFromCart } from '../../features/cart';
import { Button } from '../ui/button';

interface CardProps {
  recipe: RecipeFull;
}

export const Card: React.FC<CardProps> = ({ recipe }) => {
  const cart = useSelector((state: RootState) => state.cart);

  const isSelected = cart.some(r => r.idMeal === recipe.idMeal);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const dispatch = useDispatch();

  const handleAddToCart = () => dispatch(addToCart(recipe));

  const handleRemoveRecipe = () => dispatch(removeFromCart(recipe.idMeal));

  return (
    <div className="card">
      <h2 className="card__title">{recipe.strMeal}</h2>
      <Link to={`/recipe/${recipe.idMeal}`}>
        <img src={recipe.strMealThumb} alt={recipe.strMeal} />
      </Link>
      <p className="card__category">{recipe.strCategory}</p>
      {recipe.strSource && (
        <a
          href={recipe.strSource}
          target="_blank"
          className="card__source"
          rel="noreferrer"
        >
          {recipe.strSource}
        </a>
      )}

      <div className="card__actions">
        <Button
          type="button"
          onClick={handleAddToCart}
          disabled={isSelected}
          variant="add"
        >
          {isSelected ? 'Added' : 'Add to cart'}
        </Button>
        <Button
          onClick={handleRemoveRecipe}
          disabled={!isSelected}
          variant="destructive"
        >
          Remove
        </Button>
      </div>
    </div>
  );
};
