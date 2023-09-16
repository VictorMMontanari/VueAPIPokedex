
// pagination.js
import { computed } from 'vue';

export function calculateDisplayedPages(allPokemons, currentPage, limit) {
  return computed(() => {
    const pages = [];
    const totalPageCount = Math.ceil(allPokemons.value.length / limit);

    if (totalPageCount <= 7) {
      for (let i = 1; i <= totalPageCount; i++) {
        pages.push(i);
      }
    } else {
      const startPage = Math.max(1, currentPage.value - 3);
      const endPage = Math.min(totalPageCount, currentPage.value + 3);

      if (startPage > 1) {
        pages.push(1);
        if (startPage > 2) {
          pages.push('...');
        }
      }

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }

      if (endPage < totalPageCount) {
        if (endPage < totalPageCount - 1) {
          pages.push('...');
        }
        pages.push(totalPageCount);
      }
    }

    return pages;
  });
}


