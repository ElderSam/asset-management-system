import { useState, useMemo, useDeferredValue } from 'react';
import { useSuspenseQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Box, Typography, Button, Snackbar, Alert } from '@mui/material';
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
  const queryClient = useQueryClient();

  // Busca ativos (Suspense em App.tsx exibe o loading enquanto carrega)
  const { data: assets } = useSuspenseQuery({
    queryKey: ['assets'],
    queryFn: () => assetService.getAssets(),
  });

  // Mutations
  const createMutation = useMutation({
    mutationFn: assetService.createAsset,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['assets'] });
      setSnackbar({ open: true, message: 'Ativo criado com sucesso!', severity: 'success' });
      setIsFormOpen(false);
      setEditingAsset(undefined);
    },
    onError: () => setSnackbar({ open: true, message: 'Erro ao criar ativo', severity: 'error' }),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: AssetFormData }) =>
      assetService.updateAsset(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['assets'] });
      setSnackbar({ open: true, message: 'Ativo atualizado com sucesso!', severity: 'success' });
      setIsFormOpen(false);
      setEditingAsset(undefined);
    },
    onError: () => setSnackbar({ open: true, message: 'Erro ao atualizar ativo', severity: 'error' }),
  });

  const deleteMutation = useMutation({
    mutationFn: assetService.deleteAsset,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['assets'] });
      setSnackbar({ open: true, message: 'Ativo excluído com sucesso!', severity: 'success' });
    },
    onError: () => setSnackbar({ open: true, message: 'Erro ao excluir ativo', severity: 'error' }),
  });

  const isMutating = createMutation.isPending || updateMutation.isPending || deleteMutation.isPending;

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

  // Adia atualização da busca para não bloquear a digitação
  const deferredSearch = useDeferredValue(filters.search);

  // Filtra os ativos baseado nos filtros ativos
  const filteredAssets = useMemo(() => {
    return assets.filter((asset) => {
      // Filtro de busca (nome ou número de série)
      const searchLower = deferredSearch.toLowerCase();
      const matchesSearch =
        deferredSearch === '' ||
        asset.name.toLowerCase().includes(searchLower) ||
        asset.serialNumber.toLowerCase().includes(searchLower);

      // Filtro de categoria
      const matchesCategory =
        filters.category === 'ALL' || asset.category === filters.category;

      // Filtro de status
      const matchesStatus = filters.status === 'ALL' || asset.status === filters.status;

      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [assets, deferredSearch, filters.category, filters.status]);

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

  // Submete formulário (criar ou editar) via mutation
  const handleFormSubmit = (data: AssetFormData) => {
    if (editingAsset) {
      updateMutation.mutate({ id: editingAsset.id, data });
    } else {
      createMutation.mutate(data);
    }
  };

  // Abre dialog de confirmação de exclusão
  const handleDeleteAsset = (id: number) => {
    setAssetToDelete(id);
    setDeleteDialogOpen(true);
  };

  // Confirma exclusão via mutation
  const handleConfirmDelete = () => {
    if (assetToDelete) {
      deleteMutation.mutate(assetToDelete);
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
            disabled={isMutating}
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

      {/* Tabela de ativos (loading inicial tratado pelo Suspense em App.tsx) */}
      <AssetTable
        assets={filteredAssets}
        onEdit={handleEditAsset}
        onDelete={handleDeleteAsset}
      />

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
