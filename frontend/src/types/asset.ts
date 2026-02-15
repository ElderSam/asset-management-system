/**
 * Asset Status - valores possíveis de status
 */
export const AssetStatus = {
  ACTIVE: 'ACTIVE',
  INACTIVE: 'INACTIVE',
  MAINTENANCE: 'MAINTENANCE',
  DISPOSED: 'DISPOSED',
} as const;

export type AssetStatus = typeof AssetStatus[keyof typeof AssetStatus];

/**
 * Asset Category - valores possíveis de categoria
 */
export const AssetCategory = {
  COMPUTER: 'COMPUTER',
  MONITOR: 'MONITOR',
  PERIPHERAL: 'PERIPHERAL',
  NETWORK: 'NETWORK',
  FURNITURE: 'FURNITURE',
  OTHER: 'OTHER',
} as const;

export type AssetCategory = typeof AssetCategory[keyof typeof AssetCategory];

/**
 * Asset Interface - representa um ativo completo
 */
export interface Asset {
  id: number;
  name: string;
  serialNumber: string;
  category: AssetCategory;
  status: AssetStatus;
  purchaseDate: string; // ISO date string
  purchaseValue?: number;
  location?: string;
  description?: string;
  createdAt?: string;
  updatedAt?: string;
}

/**
 * Asset Form Data - dados do formulário (sem id, createdAt, updatedAt)
 */
export type AssetFormData = Omit<Asset, 'id' | 'createdAt' | 'updatedAt'>;

/**
 * Asset Filters - filtros para a tabela
 */
export interface AssetFilters {
  search: string;
  category: AssetCategory | 'ALL';
  status: AssetStatus | 'ALL';
}
