package com.assets.dto;

import com.assets.model.AssetCategory;
import com.assets.model.AssetStatus;
import io.swagger.v3.oas.annotations.media.Schema;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Schema(description = "Representação de um ativo")
public record AssetDTO(
        @Schema(description = "ID único do ativo", example = "1")
        Long id,
        @Schema(description = "Nome do ativo", example = "Dell XPS 15")
        String name,
        @Schema(description = "Número de série", example = "DXP-2024-001")
        String serialNumber,
        @Schema(description = "Categoria", example = "COMPUTER")
        AssetCategory category,
        @Schema(description = "Status", example = "ACTIVE")
        AssetStatus status,
        @Schema(description = "Data de compra", example = "2024-01-15")
        LocalDate purchaseDate,
        @Schema(description = "Valor de compra", example = "3500.00")
        BigDecimal purchaseValue,
        @Schema(description = "Localização física", example = "São Paulo - Sala 301")
        String location,
        @Schema(description = "Descrição", example = "Notebook para desenvolvimento")
        String description,
        @Schema(description = "Data de criação do registro")
        LocalDateTime createdAt,
        @Schema(description = "Data da última atualização")
        LocalDateTime updatedAt
) {
}
