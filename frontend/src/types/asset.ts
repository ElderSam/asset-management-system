/**
 * Asset Status Enum
 */
export enum AssetStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  MAINTENANCE = 'MAINTENANCE',
  RETIRED = 'RETIRED',
}

/**
 * Asset Category Enum
 */
export enum AssetCategory {
  COMPUTER = 'COMPUTER',
  MONITOR = 'MONITOR',
  PERIPHERAL = 'PERIPHERAL',
  NETWORK = 'NETWORK',
  FURNITURE = 'FURNITURE',
  OTHER = 'OTHER',
}

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
  purchaseValue: number;
  location: string;
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
