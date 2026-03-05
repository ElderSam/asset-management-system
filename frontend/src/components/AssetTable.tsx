import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';
import type { Asset } from '../types/asset';
import AssetTableRow from './AssetTableRow';
import styles from './AssetTable.module.css';

interface AssetTableProps {
  assets: Asset[];
  onEdit: (asset: Asset) => void;
  onDelete: (id: number) => void;
}

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
            <TableCell>Localização</TableCell>
            <TableCell align="right">Valor</TableCell>
            <TableCell>Data Compra</TableCell>
            <TableCell align="center">Ações</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {assets.map((asset) => (
            <AssetTableRow
              key={asset.id}
              asset={asset}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
