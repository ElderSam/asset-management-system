import { useState, useDeferredValue } from 'react';
import type { AssetFilters } from '../types/asset';

const DEFAULT_FILTERS: AssetFilters = {
  search: '',
  category: 'ALL',
  status: 'ALL',
};

export function useAssetFilters() {
  const [filters, setFilters] = useState<AssetFilters>(DEFAULT_FILTERS);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const deferredSearch = useDeferredValue(filters.search);

  const handleFilterChange = (newFilters: AssetFilters) => {
    setFilters(newFilters);
    setPage(0);
  };

  const handleClearFilters = () => {
    setFilters(DEFAULT_FILTERS);
    setPage(0);
  };

  const handlePageChange = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(e.target.value, 10));
    setPage(0);
  };

  return {
    filters,
    page,
    rowsPerPage,
    deferredSearch,
    handleFilterChange,
    handleClearFilters,
    handlePageChange,
    handleRowsPerPageChange,
  };
}
