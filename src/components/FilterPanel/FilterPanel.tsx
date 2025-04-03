import { SetURLSearchParams } from 'react-router-dom';

type Props = {
  searchValue: string;
  onSearchChange: (value: string) => void;
  category: string;
  categories: string[];
  searchParams: URLSearchParams;
  onSearchParamsChange: SetURLSearchParams;
};

export const FilterPanel: React.FC<Props> = ({
  searchValue,
  onSearchChange,
  category,
  categories,
  searchParams,
  onSearchParamsChange,
}) => {
  const handleSetQuerySearchParameter = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    onSearchChange(event.target.value);
  };

  const handleSetCategorySearchParameter = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const params = new URLSearchParams(searchParams);

    params.set('category', event.target.value);

    if (event.target.value === 'All') {
      params.delete('category');
    }

    onSearchParamsChange(params);
  };

  return (
    <div className="flex flex-col items-start gap-4 mb-10">
      <input
        className="p-2 rounded"
        type="text"
        placeholder="Search for a recipe..."
        value={searchValue}
        onChange={handleSetQuerySearchParameter}
      />
      <select
        className="p-2 rounded"
        value={category}
        onChange={handleSetCategorySearchParameter}
      >
        <option value="All">All</option>
        {categories.map((currentCategory: string) => (
          <option key={currentCategory} value={currentCategory}>
            {currentCategory}
          </option>
        ))}
      </select>
    </div>
  );
};
