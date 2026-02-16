package com.assets.service;

import com.assets.dto.AssetDTO;
import com.assets.dto.AssetRequestDTO;
import com.assets.model.AssetCategory;
import com.assets.model.AssetStatus;

import java.util.List;

/**
 * Interface do serviço de Asset
 */
public interface AssetService {

    /**
     * Lista todos os ativos com filtros opcionais
     * 
     * @param search busca por nome ou número de série (opcional)
     * @param category filtro por categoria (opcional)
     * @param status filtro por status (opcional)
     * @return lista de ativos que correspondem aos filtros
     */
    List<AssetDTO> findAll(String search, AssetCategory category, AssetStatus status);

    /**
     * Busca ativo por ID
     * 
     * @param id ID do ativo
     * @return DTO do ativo
     * @throws com.assets.exception.ResourceNotFoundException se não encontrado
     */
    AssetDTO findById(Long id);

    /**
     * Cria novo ativo
     * 
     * @param dto dados do ativo
     * @return DTO do ativo criado
     * @throws com.assets.exception.DuplicateResourceException se serialNumber já existe
     */
    AssetDTO create(AssetRequestDTO dto);

    /**
     * Atualiza ativo existente
     * 
     * @param id ID do ativo
     * @param dto dados atualizados
     * @return DTO do ativo atualizado
     * @throws com.assets.exception.ResourceNotFoundException se não encontrado
     * @throws com.assets.exception.DuplicateResourceException se serialNumber já existe
     */
    AssetDTO update(Long id, AssetRequestDTO dto);

    /**
     * Remove ativo
     * 
     * @param id ID do ativo
     * @throws com.assets.exception.ResourceNotFoundException se não encontrado
     */
    void delete(Long id);
}
