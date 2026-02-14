import { useState, useMemo } from 'react';
import { Box, Typography, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import type { Asset, AssetFilters } from '../types/asset';
import { mockAssets } from '../data/mockAssets';
import AssetFiltersComponent from '../components/AssetFilters';
import AssetTable from '../components/AssetTable';
import styles from './Dashboard.module.css';

/**
 * Página principal - Dashboard de ativos
 */
export default function Dashboard() {
  // Estado dos ativos (mock)
  const [assets, setAssets] = useState<Asset[]>(mockAssets);

  // Estado dos filtros
  const [filters, setFilters] = useState<AssetFilters>({
    search: '',
    category: 'ALL',
    status: 'ALL',
  });

  // Filtra os ativos baseado nos filtros ativos
  const filteredAssets = useMemo(() => {
    return assets.filter((asset) => {
      // Filtro de busca (nome ou número de série)
      const searchLower = filters.search.toLowerCase();
      const matchesSearch =
        filters.search === '' ||
        asset.name.toLowerCase().includes(searchLower) ||
        asset.serialNumber.toLowerCase().includes(searchLower);

      // Filtro de categoria
      const matchesCategory =
        filters.category === 'ALL' || asset.category === filters.category;

      // Filtro de status
      const matchesStatus = filters.status === 'ALL' || asset.status === filters.status;

      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [assets, filters]);

  // Limpa todos os filtros
  const handleClearFilters = () => {
    setFilters({
      search: '',
      category: 'ALL',
      status: 'ALL',
    });
  };

  // Abre dialog de criar novo ativo
  const handleCreateAsset = () => {
    // TODO: Implementar dialog de criação
    console.log('Create asset');
  };

  // Abre dialog de edição
  const handleEditAsset = (asset: Asset) => {
    // TODO: Implementar dialog de edição
    console.log('Edit asset:', asset);
  };

  // Deleta um ativo
  const handleDeleteAsset = (id: number) => {
    // TODO: Implementar confirmação de exclusão
    setAssets((prev) => prev.filter((asset) => asset.id !== id));
  };

  return (
    <Box>
      {/* Header com título e botão */}
      <div className={styles.header}>
        <div className={styles.headerInfo}>
          <Typography variant="h4" component="h1" className={styles.title}>
            Gerenciamento de Ativos
          </Typography>
          <Typography variant="body1" className={styles.subtitle}>
            Total de ativos: {filteredAssets.length} {filters.search || filters.category !== 'ALL' || filters.status !== 'ALL' ? `de ${assets.length}` : ''}
          </Typography>
        </div>
        <div className={styles.headerActions}>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleCreateAsset}
            size="large"
          >
            Novo Ativo
          </Button>
        </div>
      </div>

      {/* Filtros */}
      <AssetFiltersComponent
        filters={filters}
        onFilterChange={setFilters}
        onClearFilters={handleClearFilters}
      />

      {/* Tabela de ativos */}
      <AssetTable
        assets={filteredAssets}
        onEdit={handleEditAsset}
        onDelete={handleDeleteAsset}
      />
    </Box>
  );
}
