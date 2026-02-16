package com.assets.controller;

import com.assets.dto.AssetDTO;
import com.assets.dto.AssetRequestDTO;
import com.assets.model.AssetCategory;
import com.assets.model.AssetStatus;
import com.assets.service.AssetService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * REST Controller para gerenciamento de Assets
 */
@RestController
@RequestMapping("/api/assets")
@CrossOrigin(origins = "*")
public class AssetController {

    private final AssetService service;

    public AssetController(AssetService service) {
        this.service = service;
    }

    /**
     * GET /api/assets?search=...&category=...&status=...
     * Lista todos os ativos com filtros opcionais
     */
    @GetMapping
    public ResponseEntity<List<AssetDTO>> getAllAssets(
            @RequestParam(required = false) String search,
            @RequestParam(required = false) AssetCategory category,
            @RequestParam(required = false) AssetStatus status
    ) {
        List<AssetDTO> assets = service.findAll(search, category, status);
        return ResponseEntity.ok(assets);
    }

    /**
     * GET /api/assets/{id}
     * Busca ativo por ID
     */
    @GetMapping("/{id}")
    public ResponseEntity<AssetDTO> getAssetById(@PathVariable Long id) {
        AssetDTO asset = service.findById(id);
        return ResponseEntity.ok(asset);
    }

    /**
     * POST /api/assets
     * Cria novo ativo
     */
    @PostMapping
    public ResponseEntity<AssetDTO> createAsset(@Valid @RequestBody AssetRequestDTO dto) {
        AssetDTO createdAsset = service.create(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdAsset);
    }

    /**
     * PUT /api/assets/{id}
     * Atualiza ativo existente
     */
    @PutMapping("/{id}")
    public ResponseEntity<AssetDTO> updateAsset(
            @PathVariable Long id,
            @Valid @RequestBody AssetRequestDTO dto
    ) {
        AssetDTO updatedAsset = service.update(id, dto);
        return ResponseEntity.ok(updatedAsset);
    }

    /**
     * DELETE /api/assets/{id}
     * Remove ativo
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAsset(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}
