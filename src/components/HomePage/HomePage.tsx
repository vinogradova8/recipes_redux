import { Card } from '../RecipeCard';
import './HomePage.scss';
import { Link } from 'react-router-dom';
import { useRecipes } from '../../hooks/useRecipes';
import { usePagination } from '../../hooks/usePagination';
import { FilterPanel } from '../FilterPanel';

export const HomePage: React.FC = () => {
  const {
    filteredRecipes,
    categories,
    searchValue,
    setSearchValue,
    category,
    searchParams,
    setSearchParams,
  } = useRecipes();

  const {
    paginatedRecipes,
    totalPages,
    currentPage,
    nextPage,
    prevPage,
    goToPage,
    getPagination,
  } = usePagination(filteredRecipes);

  return (
    <div className="page">
      <header className="header">
        <h1>Recipes</h1>
        <Link className="link" to={`/recipe/cart`}>
          Cart
        </Link>

        <FilterPanel
          searchValue={searchValue}
          onSearchChange={setSearchValue}
          category={category}
          categories={categories}
          searchParams={searchParams}
          onSearchParamsChange={setSearchParams}
        />
      </header>

      <div className="recipes">
        {paginatedRecipes?.length !== 0 ? (
          paginatedRecipes?.map(recipe => (
            <Card key={recipe.idMeal} recipe={recipe} />
          ))
        ) : (
          <p>No recipes found</p>
        )}
      </div>
      {totalPages > 1 && (
        <div className="pagination">
          <button onClick={prevPage} disabled={currentPage === 1}>
            Prev
          </button>

          {getPagination().map((page, index) => (
            <span key={index}>
              {typeof page === 'number' ? (
                <button
                  onClick={() => goToPage(page)}
                  disabled={currentPage === page}
                  className={currentPage === page ? 'active' : ''}
                >
                  {page}
                </button>
              ) : (
                <span> ... </span>
              )}
            </span>
          ))}

          <button onClick={nextPage} disabled={currentPage === totalPages}>
            Next
          </button>
        </div>
      )}
    </div>
  );
};
