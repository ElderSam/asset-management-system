import type { Asset, AssetFormData } from '../types/asset';
import { mockAssets } from '../data/mockAssets';

/**
 * Simula delay de rede (200-500ms)
 */
const simulateDelay = (): Promise<void> => {
  const delay = Math.random() * 300 + 200;
  return new Promise((resolve) => setTimeout(resolve, delay));
};

/**
 * Mock Service - Simula chamadas de API
 * Esta camada será substituída por chamadas reais ao backend na FASE 5
 */

let assetsDB = [...mockAssets];

/**
 * Busca todos os ativos
 */
export const getAssets = async (): Promise<Asset[]> => {
  await simulateDelay();
  return [...assetsDB];
};

/**
 * Busca um ativo por ID
 */
export const getAssetById = async (id: number): Promise<Asset | undefined> => {
  await simulateDelay();
  return assetsDB.find((asset) => asset.id === id);
};

/**
 * Cria um novo ativo
 */
export const createAsset = async (data: AssetFormData): Promise<Asset> => {
  await simulateDelay();
  
  const newAsset: Asset = {
    ...data,
    id: Math.max(...assetsDB.map((a) => a.id), 0) + 1,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  
  assetsDB = [newAsset, ...assetsDB];
  return newAsset;
};

/**
 * Atualiza um ativo existente
 */
export const updateAsset = async (
  id: number,
  data: AssetFormData
): Promise<Asset> => {
  await simulateDelay();
  
  const index = assetsDB.findIndex((asset) => asset.id === id);
  if (index === -1) {
    throw new Error(`Asset with id ${id} not found`);
  }
  
  const updatedAsset: Asset = {
    ...assetsDB[index],
    ...data,
    updatedAt: new Date().toISOString(),
  };
  
  assetsDB[index] = updatedAsset;
  return updatedAsset;
};

/**
 * Deleta um ativo
 */
export const deleteAsset = async (id: number): Promise<void> => {
  await simulateDelay();
  
  const index = assetsDB.findIndex((asset) => asset.id === id);
  if (index === -1) {
    throw new Error(`Asset with id ${id} not found`);
  }
  
  assetsDB = assetsDB.filter((asset) => asset.id !== id);
};

/**
 * Reseta o banco de dados para os dados mockados originais
 * Útil para testes e desenvolvimento
 */
export const resetDatabase = (): void => {
  assetsDB = [...mockAssets];
};
