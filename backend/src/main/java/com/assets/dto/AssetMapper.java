package com.assets.dto;

import com.assets.model.Asset;

/**
 * Mapper para conversão entre Entity (Asset) e DTOs
 */
public class AssetMapper {

    /**
     * Converte Entity para DTO (response)
     */
    public static AssetDTO toDTO(Asset asset) {
        if (asset == null) {
            return null;
        }

        return new AssetDTO(
                asset.getId(),
                asset.getName(),
                asset.getSerialNumber(),
                asset.getCategory(),
                asset.getStatus(),
                asset.getPurchaseDate(),
                asset.getPurchaseValue(),
                asset.getLocation(),
                asset.getDescription(),
                asset.getCreatedAt(),
                asset.getUpdatedAt()
        );
    }

    /**
     * Converte RequestDTO para Entity (para criação)
     */
    public static Asset toEntity(AssetRequestDTO dto) {
        if (dto == null) {
            return null;
        }

        Asset asset = new Asset();
        asset.setName(dto.getName());
        asset.setSerialNumber(dto.getSerialNumber());
        asset.setCategory(dto.getCategory());
        asset.setStatus(dto.getStatus());
        asset.setPurchaseDate(dto.getPurchaseDate());
        asset.setPurchaseValue(dto.getPurchaseValue());
        asset.setLocation(dto.getLocation());
        asset.setDescription(dto.getDescription());

        return asset;
    }

    /**
     * Atualiza Entity existente com dados do RequestDTO (para update)
     */
    public static void updateEntity(Asset asset, AssetRequestDTO dto) {
        if (asset == null || dto == null) {
            return;
        }

        asset.setName(dto.getName());
        asset.setSerialNumber(dto.getSerialNumber());
        asset.setCategory(dto.getCategory());
        asset.setStatus(dto.getStatus());
        asset.setPurchaseDate(dto.getPurchaseDate());
        asset.setPurchaseValue(dto.getPurchaseValue());
        asset.setLocation(dto.getLocation());
        asset.setDescription(dto.getDescription());
    }
}
