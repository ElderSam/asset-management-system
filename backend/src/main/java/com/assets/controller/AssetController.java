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
    @Operation(summary = "Listar ativos", description = "Retorna uma lista paginada de ativos com suporte a filtros")
    @ApiResponse(responseCode = "200", description = "Lista retornada com sucesso")
    public ResponseEntity<Page<AssetDTO>> getAllAssets(
            @Parameter(description = "Busca por nome ou número de série") @RequestParam(required = false) String search,
            @Parameter(description = "Filtrar por categoria") @RequestParam(required = false) AssetCategory category,
            @Parameter(description = "Filtrar por status") @RequestParam(required = false) AssetStatus status,
            @Parameter(description = "Número da página (começa em 0)") @RequestParam(defaultValue = "0") int page,
            @Parameter(description = "Itens por página") @RequestParam(defaultValue = "10") int size
    ) {
        Pageable pageable = PageRequest.of(page, size);
        Page<AssetDTO> assets = service.findAll(search, category, status, pageable);
        return ResponseEntity.ok(assets);
    }

    @GetMapping("/{id}")
    @Operation(summary = "Buscar ativo por ID")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Ativo encontrado"),
            @ApiResponse(responseCode = "404", description = "Ativo não encontrado")
    })
    public ResponseEntity<AssetDTO> getAssetById(
            @Parameter(description = "ID do ativo") @PathVariable Long id
    ) {
        AssetDTO asset = service.findById(id);
        return ResponseEntity.ok(asset);
    }

    @PostMapping
    @Operation(summary = "Criar ativo", description = "Cria um novo ativo. O serial number deve ser único.")
    @ApiResponses({
            @ApiResponse(responseCode = "201", description = "Ativo criado com sucesso"),
            @ApiResponse(responseCode = "400", description = "Dados inválidos"),
            @ApiResponse(responseCode = "409", description = "Serial number já cadastrado")
    })
    public ResponseEntity<AssetDTO> createAsset(@Valid @RequestBody AssetRequestDTO dto) {
        AssetDTO createdAsset = service.create(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdAsset);
    }

    @PutMapping("/{id}")
    @Operation(summary = "Atualizar ativo")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Ativo atualizado com sucesso"),
            @ApiResponse(responseCode = "400", description = "Dados inválidos"),
            @ApiResponse(responseCode = "404", description = "Ativo não encontrado"),
            @ApiResponse(responseCode = "409", description = "Serial number já cadastrado")
    })
    public ResponseEntity<AssetDTO> updateAsset(
            @Parameter(description = "ID do ativo") @PathVariable Long id,
            @Valid @RequestBody AssetRequestDTO dto
    ) {
        AssetDTO updatedAsset = service.update(id, dto);
        return ResponseEntity.ok(updatedAsset);
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Remover ativo")
    @ApiResponses({
            @ApiResponse(responseCode = "204", description = "Ativo removido com sucesso"),
            @ApiResponse(responseCode = "404", description = "Ativo não encontrado")
    })
    public ResponseEntity<Void> deleteAsset(
            @Parameter(description = "ID do ativo") @PathVariable Long id
    ) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}
