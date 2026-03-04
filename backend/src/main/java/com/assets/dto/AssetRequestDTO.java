package com.assets.dto;

import com.assets.model.AssetCategory;
import com.assets.model.AssetStatus;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.*;

import java.math.BigDecimal;
import java.time.LocalDate;

@Schema(description = "Dados para criação ou atualização de um ativo")
public record AssetRequestDTO(
        @Schema(description = "Nome do ativo", example = "Dell XPS 15")
        @NotBlank(message = "Name is required")
        @Size(min = 3, max = 100, message = "Name must be between 3 and 100 characters")
        String name,

        @Schema(description = "Número de série único do ativo", example = "DXP-2024-001")
        @NotBlank(message = "Serial number is required")
        @Size(min = 3, max = 50, message = "Serial number must be between 3 and 50 characters")
        String serialNumber,

        @Schema(description = "Categoria do ativo", example = "COMPUTER")
        @NotNull(message = "Category is required")
        AssetCategory category,

        @Schema(description = "Status atual do ativo", example = "ACTIVE")
        @NotNull(message = "Status is required")
        AssetStatus status,

        @Schema(description = "Data de compra (não pode ser futura)", example = "2024-01-15")
        @NotNull(message = "Purchase date is required")
        @PastOrPresent(message = "Purchase date cannot be in the future")
        LocalDate purchaseDate,

        @Schema(description = "Valor de compra em reais", example = "3500.00")
        BigDecimal purchaseValue,

        @Schema(description = "Localização física do ativo", example = "São Paulo - Sala 301")
        @Size(max = 200, message = "Location must not exceed 200 characters")
        String location,

        @Schema(description = "Descrição detalhada do ativo", example = "Notebook para desenvolvimento")
        @Size(max = 500, message = "Description must not exceed 500 characters")
        String description
) {
}
