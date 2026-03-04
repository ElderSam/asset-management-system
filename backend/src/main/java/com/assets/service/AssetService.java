package com.assets.service;

import com.assets.dto.AssetDTO;
import com.assets.dto.AssetRequestDTO;
import com.assets.model.AssetCategory;
import com.assets.model.AssetStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface AssetService {

    Page<AssetDTO> findAll(String search, AssetCategory category, AssetStatus status, Pageable pageable);

    AssetDTO findById(Long id);

    AssetDTO create(AssetRequestDTO dto);

    AssetDTO update(Long id, AssetRequestDTO dto);

    void delete(Long id);
}
