import type { AssetStatus, AssetCategory } from '../types/asset';
import { AssetStatus as AssetStatusEnum, AssetCategory as AssetCategoryEnum } from '../types/asset';

export const getStatusColor = (status: AssetStatus): 'success' | 'error' | 'warning' | 'info' => {
  switch (status) {
    case AssetStatusEnum.ACTIVE:      return 'success';
    case AssetStatusEnum.INACTIVE:    return 'info';
    case AssetStatusEnum.MAINTENANCE: return 'warning';
    case AssetStatusEnum.DISPOSED:    return 'error';
    default:                          return 'info';
  }
};

export const getStatusLabel = (status: AssetStatus): string => {
  switch (status) {
    case AssetStatusEnum.ACTIVE:      return 'Em uso';
    case AssetStatusEnum.INACTIVE:    return 'Armazenado';
    case AssetStatusEnum.MAINTENANCE: return 'Em manutenção';
    case AssetStatusEnum.DISPOSED:    return 'Descartado';
    default:                          return status;
  }
};

export const getCategoryLabel = (category: AssetCategory): string => {
  switch (category) {
    case AssetCategoryEnum.COMPUTER:   return 'Computador';
    case AssetCategoryEnum.MONITOR:    return 'Monitor';
    case AssetCategoryEnum.PERIPHERAL: return 'Periférico';
    case AssetCategoryEnum.NETWORK:    return 'Rede';
    case AssetCategoryEnum.FURNITURE:  return 'Móvel';
    case AssetCategoryEnum.OTHER:      return 'Outro';
    default:                           return category;
  }
};

export const CATEGORY_OPTIONS: Array<{ value: AssetCategory; label: string }> = [
  { value: AssetCategoryEnum.COMPUTER,   label: 'Computador' },
  { value: AssetCategoryEnum.MONITOR,    label: 'Monitor' },
  { value: AssetCategoryEnum.PERIPHERAL, label: 'Periférico' },
  { value: AssetCategoryEnum.NETWORK,    label: 'Rede' },
  { value: AssetCategoryEnum.FURNITURE,  label: 'Móvel' },
  { value: AssetCategoryEnum.OTHER,      label: 'Outro' },
];

export const STATUS_OPTIONS: Array<{ value: AssetStatus; label: string }> = [
  { value: AssetStatusEnum.ACTIVE,      label: 'Em uso' },
  { value: AssetStatusEnum.INACTIVE,    label: 'Armazenado' },
  { value: AssetStatusEnum.MAINTENANCE, label: 'Em manutenção' },
  { value: AssetStatusEnum.DISPOSED,    label: 'Descartado' },
];
