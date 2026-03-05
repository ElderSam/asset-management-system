import { describe, it, expect } from 'vitest';
import {
  getStatusColor,
  getStatusLabel,
  getCategoryLabel,
  CATEGORY_OPTIONS,
  STATUS_OPTIONS,
} from '../utils/assetUtils';
import { AssetStatus, AssetCategory } from '../types/asset';

describe('getStatusColor', () => {
  it('retorna success para ACTIVE', () => {
    expect(getStatusColor(AssetStatus.ACTIVE)).toBe('success');
  });

  it('retorna info para INACTIVE', () => {
    expect(getStatusColor(AssetStatus.INACTIVE)).toBe('info');
  });

  it('retorna warning para MAINTENANCE', () => {
    expect(getStatusColor(AssetStatus.MAINTENANCE)).toBe('warning');
  });

  it('retorna error para DISPOSED', () => {
    expect(getStatusColor(AssetStatus.DISPOSED)).toBe('error');
  });
});

describe('getStatusLabel', () => {
  it('retorna label correto para cada status', () => {
    expect(getStatusLabel(AssetStatus.ACTIVE)).toBe('Em uso');
    expect(getStatusLabel(AssetStatus.INACTIVE)).toBe('Armazenado');
    expect(getStatusLabel(AssetStatus.MAINTENANCE)).toBe('Em manutenção');
    expect(getStatusLabel(AssetStatus.DISPOSED)).toBe('Descartado');
  });
});

describe('getCategoryLabel', () => {
  it('retorna label correto para cada categoria', () => {
    expect(getCategoryLabel(AssetCategory.COMPUTER)).toBe('Computador');
    expect(getCategoryLabel(AssetCategory.MONITOR)).toBe('Monitor');
    expect(getCategoryLabel(AssetCategory.PERIPHERAL)).toBe('Periférico');
    expect(getCategoryLabel(AssetCategory.NETWORK)).toBe('Rede');
    expect(getCategoryLabel(AssetCategory.FURNITURE)).toBe('Móvel');
    expect(getCategoryLabel(AssetCategory.OTHER)).toBe('Outro');
  });
});

describe('CATEGORY_OPTIONS', () => {
  it('contém todas as 6 categorias', () => {
    expect(CATEGORY_OPTIONS).toHaveLength(6);
  });

  it('cada opção tem value e label', () => {
    CATEGORY_OPTIONS.forEach(({ value, label }) => {
      expect(value).toBeTruthy();
      expect(label).toBeTruthy();
    });
  });

  it('label é consistente com getCategoryLabel', () => {
    CATEGORY_OPTIONS.forEach(({ value, label }) => {
      expect(getCategoryLabel(value)).toBe(label);
    });
  });
});

describe('STATUS_OPTIONS', () => {
  it('contém todos os 4 status', () => {
    expect(STATUS_OPTIONS).toHaveLength(4);
  });

  it('label é consistente com getStatusLabel', () => {
    STATUS_OPTIONS.forEach(({ value, label }) => {
      expect(getStatusLabel(value)).toBe(label);
    });
  });
});
