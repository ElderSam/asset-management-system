import { useState, useMemo, useEffect } from 'react';
import { Box, Typography, Button, Snackbar, Alert, CircularProgress } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import type { Asset, AssetFilters, AssetFormData } from '../types/asset';
import AssetFiltersComponent from '../components/AssetFilters';
import AssetTable from '../components/AssetTable';
import AssetForm from '../components/AssetForm';
import ConfirmDialog from '../components/ConfirmDialog';
import * as assetService from '../services/assetService';
import styles from './Dashboard.module.css';

/**
 * Página principal - Dashboard de ativos
 */
export default function Dashboard() {
  // Estado dos ativos
  const [assets, setAssets] = useState<Asset[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);

  // Estado dos filtros
  const [filters, setFilters] = useState<AssetFilters>({
    search: '',
    category: 'ALL',
    status: 'ALL',
  });

  // Estado do formulário
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingAsset, setEditingAsset] = useState<Asset | undefined>(undefined);

  // Estado do dialog de confirmação
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [assetToDelete, setAssetToDelete] = useState<number | null>(null);

  // Estado de feedback (snackbar)
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: 'success' | 'error';
  }>({
    open: false,
    message: '',
    severity: 'success',
  });

  // Carrega ativos ao montar o componente
  useEffect(() => {
    loadAssets();
  }, []);

  // Carrega todos os ativos
  const loadAssets = async () => {
    try {
      setLoading(true);
      const data = await assetService.getAssets();
      setAssets(data);
    } catch (error) {
      setSnackbar({
        open: true,
        message: 'Erro ao carregar ativos',
        severity: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

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
    setEditingAsset(undefined);
    setIsFormOpen(true);
  };

  // Abre dialog de edição
  const handleEditAsset = (asset: Asset) => {
    setEditingAsset(asset);
    setIsFormOpen(true);
  };

  // Submete formulário (criar ou editar)
  const handleFormSubmit = async (data: AssetFormData) => {
    try {
      setActionLoading(true);
      
      if (editingAsset) {
        // Editar ativo existente
        const updatedAsset = await assetService.updateAsset(editingAsset.id, data);
        setAssets((prev) =>
          prev.map((asset) => (asset.id === updatedAsset.id ? updatedAsset : asset))
        );
        setSnackbar({
          open: true,
          message: 'Ativo atualizado com sucesso!',
          severity: 'success',
        });
      } else {
        // Criar novo ativo
        const newAsset = await assetService.createAsset(data);
        setAssets((prev) => [newAsset, ...prev]);
        setSnackbar({
          open: true,
          message: 'Ativo criado com sucesso!',
          severity: 'success',
        });
      }
      
      setIsFormOpen(false);
      setEditingAsset(undefined);
    } catch (error) {
      setSnackbar({
        open: true,
        message: 'Erro ao salvar ativo',
        severity: 'error',
      });
    } finally {
      setActionLoading(false);
    }
  };

  // Abre dialog de confirmação de exclusão
  const handleDeleteAsset = (id: number) => {
    setAssetToDelete(id);
    setDeleteDialogOpen(true);
  };

  // Confirma exclusão
  const handleConfirmDelete = async () => {
    if (assetToDelete) {
      try {
        setActionLoading(true);
        await assetService.deleteAsset(assetToDelete);
        setAssets((prev) => prev.filter((asset) => asset.id !== assetToDelete));
        setSnackbar({
          open: true,
          message: 'Ativo excluído com sucesso!',
          severity: 'success',
        });
      } catch (error) {
        setSnackbar({
          open: true,
          message: 'Erro ao excluir ativo',
          severity: 'error',
        });
      } finally {
        setActionLoading(false);
      }
    }
    setDeleteDialogOpen(false);
    setAssetToDelete(null);
  };

  // Cancela exclusão
  const handleCancelDelete = () => {
    setDeleteDialogOpen(false);
    setAssetToDelete(null);
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
            disabled={loading || actionLoading}
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

      {/* Loading */}
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
          <CircularProgress />
        </Box>
      ) : (
        /* Tabela de ativos */
        <AssetTable
          assets={filteredAssets}
          onEdit={handleEditAsset}
          onDelete={handleDeleteAsset}
        />
      )}

      {/* Formulário de criar/editar */}
      <AssetForm
        open={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleFormSubmit}
        asset={editingAsset}
      />

      {/* Dialog de confirmação de exclusão */}
      <ConfirmDialog
        open={deleteDialogOpen}
        title="Confirmar Exclusão"
        message="Tem certeza que deseja excluir este ativo? Esta ação não pode ser desfeita."
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />

      {/* Snackbar de feedback */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
