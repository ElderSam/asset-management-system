import type { Asset, AssetFormData } from '../types/asset';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';
const ASSETS_ENDPOINT = `${API_URL}/api/assets`;

/**
 * Classe de erro customizada para erros de API
 */
class ApiError extends Error {
  status: number;
  
  constructor(status: number, message: string) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}

/**
 * Função auxiliar para lidar com respostas da API
 */
async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ message: 'Unknown error' }));
    throw new ApiError(response.status, errorData.message || response.statusText);
  }
  
  // DELETE retorna 204 No Content
  if (response.status === 204) {
    return undefined as T;
  }
  
  return response.json();
}

/**
 * Busca todos os ativos com filtros opcionais
 */
export const getAssets = async (filters?: {
  search?: string;
  category?: string;
  status?: string;
}): Promise<Asset[]> => {
  const params = new URLSearchParams();
  
  if (filters?.search) params.append('search', filters.search);
  if (filters?.category) params.append('category', filters.category);
  if (filters?.status) params.append('status', filters.status);
  
  const url = params.toString() ? `${ASSETS_ENDPOINT}?${params}` : ASSETS_ENDPOINT;
  
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  
  return handleResponse<Asset[]>(response);
};

/**
 * Busca um ativo por ID
 */
export const getAssetById = async (id: number): Promise<Asset> => {
  const response = await fetch(`${ASSETS_ENDPOINT}/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  
  return handleResponse<Asset>(response);
};

/**
 * Cria um novo ativo
 */
export const createAsset = async (data: AssetFormData): Promise<Asset> => {
  const response = await fetch(ASSETS_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  
  return handleResponse<Asset>(response);
};

/**
 * Atualiza um ativo existente (PUT - substituição completa)
 */
export const updateAsset = async (id: number, data: AssetFormData): Promise<Asset> => {
  const response = await fetch(`${ASSETS_ENDPOINT}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  
  return handleResponse<Asset>(response);
};

/**
 * Deleta um ativo
 */
export const deleteAsset = async (id: number): Promise<void> => {
  const response = await fetch(`${ASSETS_ENDPOINT}/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  
  return handleResponse<void>(response);
};
