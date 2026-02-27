package com.assets.dto;

import com.assets.model.AssetCategory;
import com.assets.model.AssetStatus;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

public record AssetDTO(
        Long id,
        String name,
        String serialNumber,
        AssetCategory category,
        AssetStatus status,
        LocalDate purchaseDate,
        BigDecimal purchaseValue,
        String location,
        String description,
        LocalDateTime createdAt,
        LocalDateTime updatedAt
) {
}
