import { describe, it, expect } from 'vitest';
import { formatCurrency, formatDate } from '../utils/format';

describe('formatCurrency', () => {
  it('formata valor em reais', () => {
    expect(formatCurrency(1000)).toBe('R$\u00a01.000,00');
  });

  it('formata valor com centavos', () => {
    expect(formatCurrency(1234.56)).toBe('R$\u00a01.234,56');
  });

  it('formata zero', () => {
    expect(formatCurrency(0)).toBe('R$\u00a00,00');
  });

  it('formata valor negativo', () => {
    expect(formatCurrency(-500)).toBe('-R$\u00a0500,00');
  });
});

describe('formatDate', () => {
  it('formata data no padrão dd/mm/aaaa', () => {
    expect(formatDate('2024-01-15')).toBe('15/01/2024');
  });

  it('formata data de fim de ano', () => {
    expect(formatDate('2023-12-31')).toBe('31/12/2023');
  });

  it('não aplica offset de fuso horário', () => {
    // Parsing manual garante que '2024-03-01' seja sempre 01/03/2024
    expect(formatDate('2024-03-01')).toBe('01/03/2024');
  });
});
