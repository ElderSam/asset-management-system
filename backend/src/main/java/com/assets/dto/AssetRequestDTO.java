package com.assets.dto;

import com.assets.model.AssetCategory;
import com.assets.model.AssetStatus;
import jakarta.validation.constraints.*;

import java.math.BigDecimal;
import java.time.LocalDate;

/**
 * DTO para requisições (POST/PUT) - sem id, createdAt, updatedAt
 * Record imutável com validações Bean Validation
 */
public record AssetRequestDTO(
        @NotBlank(message = "Name is required")
        @Size(min = 3, max = 100, message = "Name must be between 3 and 100 characters")
        String name,

        @NotBlank(message = "Serial number is required")
        @Size(min = 3, max = 50, message = "Serial number must be between 3 and 50 characters")
        String serialNumber,

        @NotNull(message = "Category is required")
        AssetCategory category,

        @NotNull(message = "Status is required")
        AssetStatus status,

        @NotNull(message = "Purchase date is required")
        @PastOrPresent(message = "Purchase date cannot be in the future")
        LocalDate purchaseDate,

        @DecimalMin(value = "0.01", message = "Purchase value must be greater than zero")
        BigDecimal purchaseValue,

        @Size(max = 200, message = "Location must not exceed 200 characters")
        String location,

        @Size(max = 500, message = "Description must not exceed 500 characters")
        String description
) {
}
