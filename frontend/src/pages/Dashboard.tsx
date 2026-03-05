import { useState, useDeferredValue } from 'react';
import { useSuspenseQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Box, Typography, Button, Snackbar, Alert, TablePagination } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import type { Asset, AssetFilters, AssetFormData } from '../types/asset';
import AssetFiltersComponent from '../components/AssetFilters';
import AssetTable from '../components/AssetTable';
import AssetForm from '../components/AssetForm';
import ConfirmDialog from '../components/ConfirmDialog';
import * as assetService from '../services/assetService';
import styles from './Dashboard.module.css';

export default function Dashboard() {
  const queryClient = useQueryClient();

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

  const [filters, setFilters] = useState<AssetFilters>({
    search: '',
    category: 'ALL',
    status: 'ALL',
  });

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const deferredSearch = useDeferredValue(filters.search);

  const { data: pagedAssets } = useSuspenseQuery({
    queryKey: ['assets', { page, size: rowsPerPage, search: deferredSearch, category: filters.category, status: filters.status }],
    queryFn: () => assetService.getAssets({
      page,
      size: rowsPerPage,
      search: deferredSearch || undefined,
      category: filters.category !== 'ALL' ? filters.category : undefined,
      status: filters.status !== 'ALL' ? filters.status : undefined,
    }),
  });

  const assets = pagedAssets.content;

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingAsset, setEditingAsset] = useState<Asset | undefined>(undefined);

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [assetToDelete, setAssetToDelete] = useState<number | null>(null);

  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: 'success' | 'error';
  }>({
    open: false,
    message: '',
    severity: 'success',
  });

  const handleClearFilters = () => {
    setFilters({ search: '', category: 'ALL', status: 'ALL' });
    setPage(0);
  };

  const handleFilterChange = (newFilters: AssetFilters) => {
    setFilters(newFilters);
    setPage(0);
  };

  const handleCreateAsset = () => {
    setEditingAsset(undefined);
    setIsFormOpen(true);
  };

  const handleEditAsset = (asset: Asset) => {
    setEditingAsset(asset);
    setIsFormOpen(true);
  };

  const handleFormSubmit = (data: AssetFormData) => {
    if (editingAsset) {
      updateMutation.mutate({ id: editingAsset.id, data });
    } else {
      createMutation.mutate(data);
    }
  };

  const handleDeleteAsset = (id: number) => {
    setAssetToDelete(id);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    if (assetToDelete) {
      deleteMutation.mutate(assetToDelete);
    }
    setDeleteDialogOpen(false);
    setAssetToDelete(null);
  };

  const handleCancelDelete = () => {
    setDeleteDialogOpen(false);
    setAssetToDelete(null);
  };

  return (
    <Box>
      <div className={styles.header}>
        <div className={styles.headerInfo}>
          <Typography variant="h4" component="h1" className={styles.title}>
            Gerenciamento de Ativos
          </Typography>
          <Typography variant="body1" className={styles.subtitle}>
            Total de ativos: {pagedAssets.totalElements}
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

      <AssetFiltersComponent
        filters={filters}
        onFilterChange={handleFilterChange}
        onClearFilters={handleClearFilters}
      />

      <AssetTable
        assets={assets}
        onEdit={handleEditAsset}
        onDelete={handleDeleteAsset}
      />

      <TablePagination
        component="div"
        count={pagedAssets.totalElements}
        page={page}
        onPageChange={(_, newPage) => setPage(newPage)}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={(e) => {
          setRowsPerPage(parseInt(e.target.value, 10));
          setPage(0);
        }}
        rowsPerPageOptions={[5, 10, 25, 50]}
        labelRowsPerPage="Itens por página:"
        labelDisplayedRows={({ from, to, count }) => `${from}–${to} de ${count}`}
      />

      <AssetForm
        open={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleFormSubmit}
        asset={editingAsset}
      />

      <ConfirmDialog
        open={deleteDialogOpen}
        title="Confirmar Exclusão"
        message="Tem certeza que deseja excluir este ativo? Esta ação não pode ser desfeita."
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />

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
