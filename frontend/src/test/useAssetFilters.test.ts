import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useAssetFilters } from '../hooks/useAssetFilters';
import { AssetCategory, AssetStatus } from '../types/asset';

describe('useAssetFilters — estado inicial', () => {
  it('começa com filtros padrão', () => {
    const { result } = renderHook(() => useAssetFilters());
    expect(result.current.filters).toEqual({
      search: '',
      category: 'ALL',
      status: 'ALL',
    });
  });

  it('começa na página 0', () => {
    const { result } = renderHook(() => useAssetFilters());
    expect(result.current.page).toBe(0);
  });

  it('começa com 10 itens por página', () => {
    const { result } = renderHook(() => useAssetFilters());
    expect(result.current.rowsPerPage).toBe(10);
  });
});

describe('useAssetFilters — handleFilterChange', () => {
  it('atualiza filtros e reseta página para 0', () => {
    const { result } = renderHook(() => useAssetFilters());

    act(() => result.current.handlePageChange(null, 3));
    expect(result.current.page).toBe(3);

    act(() =>
      result.current.handleFilterChange({
        search: 'notebook',
        category: AssetCategory.COMPUTER,
        status: AssetStatus.ACTIVE,
      })
    );

    expect(result.current.filters).toEqual({
      search: 'notebook',
      category: AssetCategory.COMPUTER,
      status: AssetStatus.ACTIVE,
    });
    expect(result.current.page).toBe(0);
  });
});

describe('useAssetFilters — handleClearFilters', () => {
  it('reseta filtros e página para os valores padrão', () => {
    const { result } = renderHook(() => useAssetFilters());

    act(() =>
      result.current.handleFilterChange({
        search: 'monitor',
        category: AssetCategory.MONITOR,
        status: AssetStatus.INACTIVE,
      })
    );
    act(() => result.current.handlePageChange(null, 2));
    act(() => result.current.handleClearFilters());

    expect(result.current.filters).toEqual({ search: '', category: 'ALL', status: 'ALL' });
    expect(result.current.page).toBe(0);
  });
});

describe('useAssetFilters — handlePageChange', () => {
  it('atualiza a página', () => {
    const { result } = renderHook(() => useAssetFilters());
    act(() => result.current.handlePageChange(null, 5));
    expect(result.current.page).toBe(5);
  });
});

describe('useAssetFilters — handleRowsPerPageChange', () => {
  it('atualiza rowsPerPage e reseta página para 0', () => {
    const { result } = renderHook(() => useAssetFilters());

    act(() => result.current.handlePageChange(null, 3));
    act(() =>
      result.current.handleRowsPerPageChange({
        target: { value: '25' },
      } as React.ChangeEvent<HTMLInputElement>)
    );

    expect(result.current.rowsPerPage).toBe(25);
    expect(result.current.page).toBe(0);
  });
});
