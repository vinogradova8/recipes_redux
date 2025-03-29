import { useState } from 'react';
import { RecipeFull } from '../types/RecipeFull';

export function usePagination(filteredRecipes: RecipeFull[]) {
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 3;

  const totalPages = Math.ceil(filteredRecipes.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedRecipes = filteredRecipes.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  const goToPage = (page: number) => setCurrentPage(page);
  const nextPage = () => setCurrentPage(prev => Math.min(prev + 1, totalPages));
  const prevPage = () => setCurrentPage(prev => Math.max(prev - 1, 1));

  const getPagination = (): (number | string)[] => {
    if (totalPages <= 10) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const pages: (number | string)[] = [];
    const groupPagesSize = 7;
    const startPage =
      Math.floor((currentPage - 1) / groupPagesSize) * groupPagesSize + 1;
    const endPage = Math.min(startPage + groupPagesSize - 1, totalPages);

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    if (endPage < totalPages - 1) {
      pages.push('...');
      pages.push(totalPages);
    } else if (endPage < totalPages) {
      pages.push(totalPages);
    }

    return pages;
  };

  return {
    paginatedRecipes,
    totalPages,
    currentPage,
    nextPage,
    prevPage,
    goToPage,
    getPagination,
  };
}
