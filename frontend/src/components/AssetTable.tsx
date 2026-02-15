import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Chip,
  Typography,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import type { Asset, AssetStatus, AssetCategory } from '../types/asset';
import { AssetStatus as AssetStatusEnum, AssetCategory as AssetCategoryEnum } from '../types/asset';
import styles from './AssetTable.module.css';

interface AssetTableProps {
  assets: Asset[];
  onEdit: (asset: Asset) => void;
  onDelete: (id: number) => void;
}

/**
 * Retorna a cor do badge de status
 */
const getStatusColor = (status: AssetStatus): 'success' | 'error' | 'warning' | 'info' => {
  switch (status) {
    case AssetStatusEnum.ACTIVE:
      return 'success';
    case AssetStatusEnum.INACTIVE:
      return 'info';
    case AssetStatusEnum.MAINTENANCE:
      return 'warning';
    case AssetStatusEnum.DISPOSED:
      return 'error';
    default:
      return 'info';
  }
};

/**
 * Retorna o label traduzido do status
 */
const getStatusLabel = (status: AssetStatus): string => {
  switch (status) {
    case AssetStatusEnum.ACTIVE:
      return 'Em uso';
    case AssetStatusEnum.INACTIVE:
      return 'Armazenado';
    case AssetStatusEnum.MAINTENANCE:
      return 'Em manutenção';
    case AssetStatusEnum.DISPOSED:
      return 'Descartado';
    default:
      return status;
  }
};

/**
 * Retorna o label traduzido da categoria
 */
const getCategoryLabel = (category: AssetCategory): string => {
  switch (category) {
    case AssetCategoryEnum.COMPUTER:
      return 'Computador';
    case AssetCategoryEnum.MONITOR:
      return 'Monitor';
    case AssetCategoryEnum.PERIPHERAL:
      return 'Periférico';
    case AssetCategoryEnum.NETWORK:
      return 'Rede';
    case AssetCategoryEnum.FURNITURE:
      return 'Móvel';
    case AssetCategoryEnum.OTHER:
      return 'Outro';
    default:
      return category;
  }
};

/**
 * Formata valor monetário para BRL
 */
const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
};

/**
 * Formata data para pt-BR
 * Usa parsing local para evitar problemas de timezone
 */
const formatDate = (dateString: string): string => {
  const [year, month, day] = dateString.split('-');
  const date = new Date(Number(year), Number(month) - 1, Number(day));
  return date.toLocaleDateString('pt-BR');
};

/**
 * Tabela de ativos com formatação e ações
 */
export default function AssetTable({ assets, onEdit, onDelete }: AssetTableProps) {
  if (assets.length === 0) {
    return (
      <div className={styles.emptyState}>
        <Typography variant="h6" className={styles.emptyTitle}>
          Nenhum ativo encontrado
        </Typography>
        <Typography variant="body2" className={styles.emptyText}>
          Adicione um novo ativo para começar
        </Typography>
      </div>
    );
  }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="tabela de ativos">
        <TableHead>
          <TableRow>
            <TableCell>Nome</TableCell>
            <TableCell>Nº Série</TableCell>
            <TableCell>Categoria</TableCell>
            <TableCell>Status</TableCell>
            <TableCell align="right">Valor</TableCell>
            <TableCell>Data Compra</TableCell>
            <TableCell>Localização</TableCell>
            <TableCell align="center">Ações</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {assets.map((asset) => (
            <TableRow
              key={asset.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              hover
            >
              <TableCell component="th" scope="row">
                <Typography variant="body2" className={styles.assetName}>
                  {asset.name}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="body2" className={styles.serialNumber}>
                  {asset.serialNumber}
                </Typography>
              </TableCell>
              <TableCell>{getCategoryLabel(asset.category)}</TableCell>
              <TableCell>
                <Chip
                  label={getStatusLabel(asset.status)}
                  color={getStatusColor(asset.status)}
                  size="small"
                />
              </TableCell>
              <TableCell align="right">
                <Typography variant="body2" fontWeight={500}>
                  {asset.purchaseValue ? formatCurrency(asset.purchaseValue) : '-'}
                </Typography>
              </TableCell>
              <TableCell>{formatDate(asset.purchaseDate)}</TableCell>
              <TableCell>
                <Typography variant="body2" className={styles.location}>
                  {asset.location || '-'}
                </Typography>
              </TableCell>
              <TableCell className={styles.actionCell}>
                <IconButton
                  size="small"
                  color="primary"
                  onClick={() => onEdit(asset)}
                  aria-label="editar"
                >
                  <EditIcon fontSize="small" />
                </IconButton>
                <IconButton
                  size="small"
                  color="error"
                  onClick={() => onDelete(asset.id)}
                  aria-label="excluir"
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
