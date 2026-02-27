package com.assets.service;

import com.assets.dto.AssetDTO;
import com.assets.dto.AssetRequestDTO;
import com.assets.model.AssetCategory;
import com.assets.model.AssetStatus;

import java.util.List;

public interface AssetService {

    List<AssetDTO> findAll(String search, AssetCategory category, AssetStatus status);

    AssetDTO findById(Long id);

    AssetDTO create(AssetRequestDTO dto);

    AssetDTO update(Long id, AssetRequestDTO dto);

    void delete(Long id);
}
