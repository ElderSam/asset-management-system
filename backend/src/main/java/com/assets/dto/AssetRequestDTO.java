package com.assets.dto;

import com.assets.model.AssetCategory;
import com.assets.model.AssetStatus;
import jakarta.validation.constraints.*;

import java.math.BigDecimal;
import java.time.LocalDate;

/**
 * DTO para requisições (POST/PUT) - sem id, createdAt, updatedAt
 */
public class AssetRequestDTO {

    @NotBlank(message = "Name is required")
    @Size(min = 3, max = 100, message = "Name must be between 3 and 100 characters")
    private String name;

    @NotBlank(message = "Serial number is required")
    @Size(min = 3, max = 50, message = "Serial number must be between 3 and 50 characters")
    private String serialNumber;

    @NotNull(message = "Category is required")
    private AssetCategory category;

    @NotNull(message = "Status is required")
    private AssetStatus status;

    @NotNull(message = "Purchase date is required")
    @PastOrPresent(message = "Purchase date cannot be in the future")
    private LocalDate purchaseDate;

    @DecimalMin(value = "0.01", message = "Purchase value must be greater than zero")
    private BigDecimal purchaseValue;

    @Size(max = 200, message = "Location must not exceed 200 characters")
    private String location;

    @Size(max = 500, message = "Description must not exceed 500 characters")
    private String description;

    // Constructors
    public AssetRequestDTO() {
    }

    public AssetRequestDTO(String name, String serialNumber, AssetCategory category, AssetStatus status,
                          LocalDate purchaseDate, BigDecimal purchaseValue, String location, String description) {
        this.name = name;
        this.serialNumber = serialNumber;
        this.category = category;
        this.status = status;
        this.purchaseDate = purchaseDate;
        this.purchaseValue = purchaseValue;
        this.location = location;
        this.description = description;
    }

    // Getters and Setters
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSerialNumber() {
        return serialNumber;
    }

    public void setSerialNumber(String serialNumber) {
        this.serialNumber = serialNumber;
    }

    public AssetCategory getCategory() {
        return category;
    }

    public void setCategory(AssetCategory category) {
        this.category = category;
    }

    public AssetStatus getStatus() {
        return status;
    }

    public void setStatus(AssetStatus status) {
        this.status = status;
    }

    public LocalDate getPurchaseDate() {
        return purchaseDate;
    }

    public void setPurchaseDate(LocalDate purchaseDate) {
        this.purchaseDate = purchaseDate;
    }

    public BigDecimal getPurchaseValue() {
        return purchaseValue;
    }

    public void setPurchaseValue(BigDecimal purchaseValue) {
        this.purchaseValue = purchaseValue;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
