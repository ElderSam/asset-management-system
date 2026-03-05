import type { Asset, AssetFormData, Page } from '../types/asset';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';
const ASSETS_ENDPOINT = `${API_URL}/api/assets`;

class ApiError extends Error {
  status: number;
  
  constructor(status: number, message: string) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ message: 'Unknown error' }));
    throw new ApiError(response.status, errorData.message || response.statusText);
  }
  
  if (response.status === 204) {
    return undefined as T;
  }
  
  return response.json();
}

export const getAssets = async (params?: {
  search?: string;
  category?: string;
  status?: string;
  page?: number;
  size?: number;
}): Promise<Page<Asset>> => {
  const query = new URLSearchParams();

  if (params?.search) query.append('search', params.search);
  if (params?.category) query.append('category', params.category);
  if (params?.status) query.append('status', params.status);
  query.append('page', String(params?.page ?? 0));
  query.append('size', String(params?.size ?? 10));

  const response = await fetch(`${ASSETS_ENDPOINT}?${query}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return handleResponse<Page<Asset>>(response);
};

export const getAssetById = async (id: number): Promise<Asset> => {
  const response = await fetch(`${ASSETS_ENDPOINT}/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  
  return handleResponse<Asset>(response);
};

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

export const deleteAsset = async (id: number): Promise<void> => {
  const response = await fetch(`${ASSETS_ENDPOINT}/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  
  return handleResponse<void>(response);
};
