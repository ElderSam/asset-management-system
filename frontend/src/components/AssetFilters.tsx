import {
  TextField,
  MenuItem,
  Button,
  Paper,
  Box,
  Stack,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import type { AssetCategory, AssetStatus, AssetFilters as Filters } from '../types/asset';
import { CATEGORY_OPTIONS, STATUS_OPTIONS } from '../utils/assetUtils';

interface AssetFiltersProps {
  filters: Filters;
  onFilterChange: (filters: Filters) => void;
  onClearFilters: () => void;
}

export default function AssetFilters({
  filters,
  onFilterChange,
  onClearFilters,
}: AssetFiltersProps) {
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onFilterChange({
      ...filters,
      search: event.target.value,
    });
  };

  const handleCategoryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onFilterChange({
      ...filters,
      category: event.target.value as AssetCategory | 'ALL',
    });
  };

  const handleStatusChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onFilterChange({
      ...filters,
      status: event.target.value as AssetStatus | 'ALL',
    });
  };

  return (
    <Paper sx={{ p: 2, mb: 3 }}>
      <Stack
        direction={{ xs: 'column', md: 'row' }}
        spacing={2}
        alignItems={{ xs: 'stretch', md: 'center' }}
      >
        <Box sx={{ flex: { xs: '1 1 100%', md: '1 1 40%' } }}>
          <TextField
            fullWidth
            placeholder="Buscar por nome ou nº série..."
            value={filters.search}
            onChange={handleSearchChange}
            InputProps={{
              startAdornment: <SearchIcon sx={{ mr: 1, color: 'action.active' }} />,
            }}
          />
        </Box>
        <Box sx={{ flex: { xs: '1 1 100%', md: '1 1 25%' } }}>
          <TextField
            fullWidth
            select
            label="Categoria"
            value={filters.category}
            onChange={handleCategoryChange}
          >
            <MenuItem value="ALL">Todas</MenuItem>
            {CATEGORY_OPTIONS.map(({ value, label }) => (
              <MenuItem key={value} value={value}>{label}</MenuItem>
            ))}
          </TextField>
        </Box>
        <Box sx={{ flex: { xs: '1 1 100%', md: '1 1 25%' } }}>
          <TextField
            fullWidth
            select
            label="Status"
            value={filters.status}
            onChange={handleStatusChange}
          >
            <MenuItem value="ALL">Todos</MenuItem>
            {STATUS_OPTIONS.map(({ value, label }) => (
              <MenuItem key={value} value={value}>{label}</MenuItem>
            ))}
          </TextField>
        </Box>
        <Box sx={{ flex: { xs: '1 1 100%', md: '0 0 auto' } }}>
          <Button
            fullWidth
            variant="outlined"
            startIcon={<ClearIcon />}
            onClick={onClearFilters}
          >
            Limpar
          </Button>
        </Box>
      </Stack>
    </Paper>
  );
}
