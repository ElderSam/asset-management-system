package com.assets.dto;

import com.assets.model.Asset;
import java.math.BigDecimal;

public class AssetMapper {

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

    public static Asset toEntity(AssetRequestDTO dto) {
        if (dto == null) {
            return null;
        }

        Asset asset = new Asset();
        asset.setName(dto.name());
        asset.setSerialNumber(dto.serialNumber());
        asset.setCategory(dto.category());
        asset.setStatus(dto.status());
        asset.setPurchaseDate(dto.purchaseDate());
        asset.setPurchaseValue(dto.purchaseValue() != null ? dto.purchaseValue() : BigDecimal.ZERO);
        asset.setLocation(dto.location());
        asset.setDescription(dto.description());

        return asset;
    }

    public static void updateEntity(Asset asset, AssetRequestDTO dto) {
        if (asset == null || dto == null) {
            return;
        }

        asset.setName(dto.name());
        asset.setSerialNumber(dto.serialNumber());
        asset.setCategory(dto.category());
        asset.setStatus(dto.status());
        asset.setPurchaseDate(dto.purchaseDate());
        asset.setPurchaseValue(dto.purchaseValue() != null ? dto.purchaseValue() : BigDecimal.ZERO);
        asset.setLocation(dto.location());
        asset.setDescription(dto.description());
    }
}
