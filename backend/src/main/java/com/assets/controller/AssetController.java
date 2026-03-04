package com.assets.controller;

import com.assets.dto.AssetDTO;
import com.assets.dto.AssetRequestDTO;
import com.assets.model.AssetCategory;
import com.assets.model.AssetStatus;
import com.assets.service.AssetService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/assets")
@Tag(name = "Assets", description = "Gerenciamento de ativos empresariais")
public class AssetController {

    private final AssetService service;

    public AssetController(AssetService service) {
        this.service = service;
    }

    @GetMapping
    @Operation(summary = "Listar ativos", description = "Retorna lista paginada. Combinação de filtros é suportada.")
    public ResponseEntity<Page<AssetDTO>> getAllAssets(
            @Parameter(description = "Busca por nome ou número de série") @RequestParam(required = false) String search,
            @Parameter(description = "Filtrar por categoria") @RequestParam(required = false) AssetCategory category,
            @Parameter(description = "Filtrar por status") @RequestParam(required = false) AssetStatus status,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        Pageable pageable = PageRequest.of(page, size);
        Page<AssetDTO> assets = service.findAll(search, category, status, pageable);
        return ResponseEntity.ok(assets);
    }

    @GetMapping("/{id}")
    @ApiResponse(responseCode = "404", description = "Ativo não encontrado")
    public ResponseEntity<AssetDTO> getAssetById(@PathVariable Long id) {
        AssetDTO asset = service.findById(id);
        return ResponseEntity.ok(asset);
    }

    @PostMapping
    @ApiResponses({
            @ApiResponse(responseCode = "409", description = "Serial number já cadastrado")
    })
    public ResponseEntity<AssetDTO> createAsset(@Valid @RequestBody AssetRequestDTO dto) {
        AssetDTO createdAsset = service.create(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdAsset);
    }

    @PutMapping("/{id}")
    @ApiResponses({
            @ApiResponse(responseCode = "404", description = "Ativo não encontrado"),
            @ApiResponse(responseCode = "409", description = "Serial number já cadastrado")
    })
    public ResponseEntity<AssetDTO> updateAsset(
            @PathVariable Long id,
            @Valid @RequestBody AssetRequestDTO dto
    ) {
        AssetDTO updatedAsset = service.update(id, dto);
        return ResponseEntity.ok(updatedAsset);
    }

    @DeleteMapping("/{id}")
    @ApiResponse(responseCode = "404", description = "Ativo não encontrado")
    public ResponseEntity<Void> deleteAsset(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}
