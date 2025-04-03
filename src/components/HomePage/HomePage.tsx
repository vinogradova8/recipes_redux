import { Card } from '../RecipeCard';
import './HomePage.scss';
import { Link } from 'react-router-dom';
import { useRecipes } from '../../hooks/useRecipes';
import { usePagination } from '../../hooks/usePagination';
import { FilterPanel } from '../FilterPanel';
import { Loader } from '../Loader';
import { Button } from '../ui/button';

export const HomePage: React.FC = () => {
  const {
    filteredRecipes,
    categories,
    searchValue,
    setSearchValue,
    category,
    searchParams,
    setSearchParams,
    isLoading,
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

  if (isLoading) {
    return <Loader />;
  }

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
        <div className="flex gap-2 items-center">
          <Button
            onClick={prevPage}
            disabled={currentPage === 1}
            variant="secondary"
          >
            Prev
          </Button>

          {getPagination().map((page, index) => (
            <span key={index}>
              {typeof page === 'number' ? (
                <Button
                  onClick={() => goToPage(page)}
                  disabled={currentPage === page}
                  className={currentPage === page ? 'active' : ''}
                  variant="secondary"
                  size="sm"
                >
                  {page}
                </Button>
              ) : (
                <span> ... </span>
              )}
            </span>
          ))}

          <Button
            onClick={nextPage}
            disabled={currentPage === totalPages}
            variant="secondary"
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
};
