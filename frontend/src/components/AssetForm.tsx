import { useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  Stack,
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import type { Asset, AssetFormData } from '../types/asset';
import { AssetCategory, AssetStatus } from '../types/asset';

interface AssetFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: AssetFormData) => void;
  asset?: Asset; // Se fornecido, é modo edição
}

/**
 * Schema de validação com Zod
 */
const assetSchema = z.object({
  name: z
    .string()
    .min(3, 'Nome deve ter no mínimo 3 caracteres')
    .max(100, 'Nome deve ter no máximo 100 caracteres'),
  serialNumber: z
    .string()
    .min(3, 'Número de série deve ter no mínimo 3 caracteres')
    .max(50, 'Número de série deve ter no máximo 50 caracteres'),
  category: z.union([
    z.literal(AssetCategory.COMPUTER),
    z.literal(AssetCategory.MONITOR),
    z.literal(AssetCategory.PERIPHERAL),
    z.literal(AssetCategory.NETWORK),
    z.literal(AssetCategory.FURNITURE),
    z.literal(AssetCategory.OTHER),
  ], {
    message: 'Categoria inválida',
  }),
  status: z.union([
    z.literal(AssetStatus.ACTIVE),
    z.literal(AssetStatus.INACTIVE),
    z.literal(AssetStatus.MAINTENANCE),
    z.literal(AssetStatus.DISPOSED),
  ], {
    message: 'Status inválido',
  }),
  purchaseDate: z
    .string()
    .min(1, 'Data de compra é obrigatória')
    .refine(
      (date) => {
        const d = new Date(date);
        return d instanceof Date && !isNaN(d.getTime());
      },
      { message: 'Data inválida' }
    ),
  purchaseValue: z
    .number({
      message: 'Valor deve ser um número',
    })
    .positive('Valor deve ser maior que zero')
    .max(999999999, 'Valor muito alto')
    .optional()
    .or(z.literal(0)),
  location: z
    .string()
    .max(200, 'Localização deve ter no máximo 200 caracteres')
    .optional(),
  description: z
    .string()
    .max(500, 'Descrição deve ter no máximo 500 caracteres')
    .optional(),
});

/**
 * Componente de formulário para criar/editar ativos
 */
export default function AssetForm({ open, onClose, onSubmit, asset }: AssetFormProps) {
  const isEditMode = !!asset;

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AssetFormData>({
    resolver: zodResolver(assetSchema),
    defaultValues: {
      name: '',
      serialNumber: '',
      category: '' as any,
      status: AssetStatus.ACTIVE,
      purchaseDate: new Date().toISOString().split('T')[0],
      purchaseValue: 0,
      location: '',
      description: '',
    },
  });

  // Atualiza os valores do formulário quando o asset muda (modo edição)
  useEffect(() => {
    if (open) {
      if (asset) {
        // Modo edição: preenche com dados do ativo
        reset({
          name: asset.name,
          serialNumber: asset.serialNumber,
          category: asset.category,
          status: asset.status,
          purchaseDate: asset.purchaseDate,
          purchaseValue: asset.purchaseValue,
          location: asset.location,
          description: asset.description || '',
        });
      } else {
        // Modo criação: limpa o formulário
        reset({
          name: '',
          serialNumber: '',
          category: '' as any,
          status: AssetStatus.ACTIVE,
          purchaseDate: new Date().toISOString().split('T')[0],
          purchaseValue: 0,
          location: '',
          description: '',
        });
      }
    }
  }, [open, asset, reset]);

  const handleFormSubmit = (data: AssetFormData) => {
    onSubmit(data);
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle>{isEditMode ? 'Editar Ativo' : 'Novo Ativo'}</DialogTitle>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 1 }}>
            {/* Nome */}
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Nome"
                  fullWidth
                  required
                  error={!!errors.name}
                  helperText={errors.name?.message}
                />
              )}
            />

            {/* Número de Série */}
            <Controller
              name="serialNumber"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Número de Série"
                  fullWidth
                  required
                  error={!!errors.serialNumber}
                  helperText={errors.serialNumber?.message}
                />
              )}
            />

            {/* Categoria e Status */}
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <Controller
                name="category"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    select
                    label="Categoria"
                    fullWidth
                    required
                    error={!!errors.category}
                    helperText={errors.category?.message}
                  >
                    <MenuItem value="" disabled>
                      Selecione uma categoria
                    </MenuItem>
                    <MenuItem value={AssetCategory.COMPUTER}>Computador</MenuItem>
                    <MenuItem value={AssetCategory.MONITOR}>Monitor</MenuItem>
                    <MenuItem value={AssetCategory.PERIPHERAL}>Periférico</MenuItem>
                    <MenuItem value={AssetCategory.NETWORK}>Rede</MenuItem>
                    <MenuItem value={AssetCategory.FURNITURE}>Móvel</MenuItem>
                    <MenuItem value={AssetCategory.OTHER}>Outro</MenuItem>
                  </TextField>
                )}
              />

              <Controller
                name="status"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    select
                    label="Status"
                    fullWidth
                    required
                    error={!!errors.status}
                    helperText={errors.status?.message}
                  >
                    <MenuItem value={AssetStatus.ACTIVE}>Em uso</MenuItem>
                    <MenuItem value={AssetStatus.INACTIVE}>Armazenado</MenuItem>
                    <MenuItem value={AssetStatus.MAINTENANCE}>Em manutenção</MenuItem>
                    <MenuItem value={AssetStatus.DISPOSED}>Descartado</MenuItem>
                  </TextField>
                )}
              />
            </Stack>

            {/* Data de Compra e Valor */}
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <Controller
                name="purchaseDate"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    type="date"
                    label="Data de Compra"
                    fullWidth
                    required
                    InputLabelProps={{ shrink: true }}
                    error={!!errors.purchaseDate}
                    helperText={errors.purchaseDate?.message}
                  />
                )}
              />

              <Controller
                name="purchaseValue"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    type="number"
                    label="Valor (R$) - Opcional"
                    fullWidth
                    inputProps={{ step: '0.01', min: '0' }}
                    onChange={(e) => field.onChange(parseFloat(e.target.value))}
                    error={!!errors.purchaseValue}
                    helperText={errors.purchaseValue?.message}
                  />
                )}
              />
            </Stack>

            {/* Localização */}
            <Controller
              name="location"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Localização - Opcional"
                  fullWidth
                  error={!!errors.location}
                  helperText={errors.location?.message}
                />
              )}
            />

            {/* Descrição */}
            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Descrição"
                  fullWidth
                  multiline
                  rows={3}
                  error={!!errors.description}
                  helperText={errors.description?.message}
                />
              )}
            />
          </Stack>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button type="submit" variant="contained">
            {isEditMode ? 'Salvar' : 'Criar'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
