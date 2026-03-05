import { TableRow, TableCell, IconButton, Chip, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import type { Asset } from '../types/asset';
import { getStatusColor, getStatusLabel, getCategoryLabel } from '../utils/assetUtils';
import { formatCurrency, formatDate } from '../utils/format';
import styles from './AssetTable.module.css';

interface AssetTableRowProps {
  asset: Asset;
  onEdit: (asset: Asset) => void;
  onDelete: (id: number) => void;
}

export default function AssetTableRow({ asset, onEdit, onDelete }: AssetTableRowProps) {
  const handleEdit = () => onEdit(asset);
  const handleDelete = () => onDelete(asset.id);

  return (
    <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }} hover>
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
      <TableCell>
        <Typography variant="body2" fontWeight={500}>
          {getCategoryLabel(asset.category)}
        </Typography>
      </TableCell>
      <TableCell>
        <Chip
          label={getStatusLabel(asset.status)}
          color={getStatusColor(asset.status)}
          size="small"
        />
      </TableCell>
      <TableCell>
        <Typography variant="body2" className={styles.location}>
          {asset.location || '-'}
        </Typography>
      </TableCell>
      <TableCell align="right">
        <Typography variant="body2">
          {asset.purchaseValue ? formatCurrency(asset.purchaseValue) : '-'}
        </Typography>
      </TableCell>
      <TableCell>{formatDate(asset.purchaseDate)}</TableCell>
      <TableCell className={styles.actionCell}>
        <IconButton
          size="small"
          color="primary"
          onClick={handleEdit}
          aria-label={`Editar ${asset.name}`}
          title="Editar"
        >
          <EditIcon fontSize="small" />
        </IconButton>
        <IconButton
          size="small"
          color="error"
          onClick={handleDelete}
          aria-label={`Excluir ${asset.name}`}
          title="Excluir"
        >
          <DeleteIcon fontSize="small" />
        </IconButton>
      </TableCell>
    </TableRow>
  );
}
