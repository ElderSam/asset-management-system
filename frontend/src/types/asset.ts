export const AssetStatus = {
  ACTIVE: 'ACTIVE',
  INACTIVE: 'INACTIVE',
  MAINTENANCE: 'MAINTENANCE',
  DISPOSED: 'DISPOSED',
} as const;

export type AssetStatus = typeof AssetStatus[keyof typeof AssetStatus];

export const AssetCategory = {
  COMPUTER: 'COMPUTER',
  MONITOR: 'MONITOR',
  PERIPHERAL: 'PERIPHERAL',
  NETWORK: 'NETWORK',
  FURNITURE: 'FURNITURE',
  OTHER: 'OTHER',
} as const;

export type AssetCategory = typeof AssetCategory[keyof typeof AssetCategory];

export interface Asset {
  id: number;
  name: string;
  serialNumber: string;
  category: AssetCategory;
  status: AssetStatus;
  purchaseDate: string;
  purchaseValue?: number;
  location?: string;
  description?: string;
  createdAt?: string;
  updatedAt?: string;
}

export type AssetFormData = Omit<Asset, 'id' | 'createdAt' | 'updatedAt'>;

export interface AssetFilters {
  search: string;
  category: AssetCategory | 'ALL';
  status: AssetStatus | 'ALL';
}
