package com.assets.controller;

import com.assets.dto.AssetRequestDTO;
import com.assets.model.Asset;
import com.assets.model.AssetCategory;
import com.assets.model.AssetStatus;
import com.assets.repository.AssetRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.context.WebApplicationContext;

import java.math.BigDecimal;
import java.time.LocalDate;

import static org.hamcrest.Matchers.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Testes de integração para AssetController
 * Testa todos os endpoints CRUD com cenários de sucesso e erro
 */
@SpringBootTest
@ActiveProfiles("test")
@Transactional
class AssetControllerIntegrationTest {

    private MockMvc mockMvc;

    @Autowired
    private WebApplicationContext webApplicationContext;

    @Autowired
    private AssetRepository assetRepository;

    private ObjectMapper objectMapper;

    @BeforeEach
    void setUp() {
        // Configura MockMvc manualmente
        mockMvc = MockMvcBuilders.webAppContextSetup(webApplicationContext).build();
        
        // Cria ObjectMapper com suporte a Java 8 Time API
        objectMapper = new ObjectMapper();
        objectMapper.registerModule(new JavaTimeModule());
        
        // Limpa o repositório antes de cada teste
        assetRepository.deleteAll();
    }

    // ==================== GET /api/assets ====================

    @Test
    @DisplayName("GET /api/assets - deve retornar lista vazia quando não há ativos")
    void getAllAssets_whenEmpty_returnsEmptyList() throws Exception {
        mockMvc.perform(get("/api/assets"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$", hasSize(0)));
    }

    @Test
    @DisplayName("GET /api/assets - deve retornar todos os ativos")
    void getAllAssets_whenAssetsExist_returnsAllAssets() throws Exception {
        // Given
        createTestAsset("Notebook Dell", "SN001", AssetCategory.COMPUTER, AssetStatus.ACTIVE);
        createTestAsset("Monitor LG", "SN002", AssetCategory.MONITOR, AssetStatus.ACTIVE);

        // When/Then
        mockMvc.perform(get("/api/assets"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(2)));
    }

    @Test
    @DisplayName("GET /api/assets?search=Dell - deve filtrar por nome")
    void getAllAssets_withSearchByName_returnsFilteredAssets() throws Exception {
        // Given
        createTestAsset("Notebook Dell", "SN001", AssetCategory.COMPUTER, AssetStatus.ACTIVE);
        createTestAsset("Monitor LG", "SN002", AssetCategory.MONITOR, AssetStatus.ACTIVE);

        // When/Then
        mockMvc.perform(get("/api/assets").param("search", "Dell"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(1)))
                .andExpect(jsonPath("$[0].name", is("Notebook Dell")));
    }

    @Test
    @DisplayName("GET /api/assets?search=SN002 - deve filtrar por serial number")
    void getAllAssets_withSearchBySerialNumber_returnsFilteredAssets() throws Exception {
        // Given
        createTestAsset("Notebook Dell", "SN001", AssetCategory.COMPUTER, AssetStatus.ACTIVE);
        createTestAsset("Monitor LG", "SN002", AssetCategory.MONITOR, AssetStatus.ACTIVE);

        // When/Then
        mockMvc.perform(get("/api/assets").param("search", "SN002"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(1)))
                .andExpect(jsonPath("$[0].serialNumber", is("SN002")));
    }

    @Test
    @DisplayName("GET /api/assets?category=COMPUTER - deve filtrar por categoria")
    void getAllAssets_withCategoryFilter_returnsFilteredAssets() throws Exception {
        // Given
        createTestAsset("Notebook Dell", "SN001", AssetCategory.COMPUTER, AssetStatus.ACTIVE);
        createTestAsset("Monitor LG", "SN002", AssetCategory.MONITOR, AssetStatus.ACTIVE);

        // When/Then
        mockMvc.perform(get("/api/assets").param("category", "COMPUTER"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(1)))
                .andExpect(jsonPath("$[0].category", is("COMPUTER")));
    }

    @Test
    @DisplayName("GET /api/assets?status=MAINTENANCE - deve filtrar por status")
    void getAllAssets_withStatusFilter_returnsFilteredAssets() throws Exception {
        // Given
        createTestAsset("Notebook Dell", "SN001", AssetCategory.COMPUTER, AssetStatus.ACTIVE);
        createTestAsset("Monitor LG", "SN002", AssetCategory.MONITOR, AssetStatus.MAINTENANCE);

        // When/Then
        mockMvc.perform(get("/api/assets").param("status", "MAINTENANCE"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(1)))
                .andExpect(jsonPath("$[0].status", is("MAINTENANCE")));
    }

    // ==================== POST /api/assets ====================

    @Test
    @DisplayName("POST /api/assets - deve criar novo ativo com sucesso")
    void createAsset_withValidData_returnsCreated() throws Exception {
        // Given
        AssetRequestDTO requestDTO = new AssetRequestDTO(
                "Notebook HP",
                "SN123456",
                AssetCategory.COMPUTER,
                AssetStatus.ACTIVE,
                LocalDate.now(),
                new BigDecimal("2500.00"),
                "Sala 101",
                "Notebook para desenvolvimento"
        );

        // When/Then
        mockMvc.perform(post("/api/assets")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(requestDTO)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.id").exists())
                .andExpect(jsonPath("$.name", is("Notebook HP")))
                .andExpect(jsonPath("$.serialNumber", is("SN123456")))
                .andExpect(jsonPath("$.category", is("COMPUTER")))
                .andExpect(jsonPath("$.status", is("ACTIVE")))
                .andExpect(jsonPath("$.purchaseValue", is(2500.00)))
                .andExpect(jsonPath("$.location", is("Sala 101")))
                .andExpect(jsonPath("$.createdAt").exists())
                .andExpect(jsonPath("$.updatedAt").exists());
    }

    @Test
    @DisplayName("POST /api/assets - deve criar ativo com purchaseValue zero")
    void createAsset_withZeroPurchaseValue_returnsCreated() throws Exception {
        // Given
        AssetRequestDTO requestDTO = new AssetRequestDTO(
                "Monitor Samsung",
                "SN999999",
                AssetCategory.MONITOR,
                AssetStatus.ACTIVE,
                LocalDate.now(),
                BigDecimal.ZERO,
                null,
                null
        );

        // When/Then
        mockMvc.perform(post("/api/assets")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(requestDTO)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.purchaseValue", is(0)));
    }

    @Test
    @DisplayName("POST /api/assets - deve retornar 400 quando nome está vazio")
    void createAsset_withEmptyName_returnsBadRequest() throws Exception {
        // Given
        AssetRequestDTO requestDTO = new AssetRequestDTO(
                "", // Nome vazio
                "SN123456",
                AssetCategory.COMPUTER,
                AssetStatus.ACTIVE,
                LocalDate.now(),
                new BigDecimal("2500.00"),
                null,
                null
        );

        // When/Then
        mockMvc.perform(post("/api/assets")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(requestDTO)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.message").exists());
    }

    @Test
    @DisplayName("POST /api/assets - deve retornar 400 quando serial number é muito curto")
    void createAsset_withShortSerialNumber_returnsBadRequest() throws Exception {
        // Given
        AssetRequestDTO requestDTO = new AssetRequestDTO(
                "Notebook HP",
                "SN", // Menos de 3 caracteres
                AssetCategory.COMPUTER,
                AssetStatus.ACTIVE,
                LocalDate.now(),
                new BigDecimal("2500.00"),
                null,
                null
        );

        // When/Then
        mockMvc.perform(post("/api/assets")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(requestDTO)))
                .andExpect(status().isBadRequest());
    }

    @Test
    @DisplayName("POST /api/assets - deve retornar 409 quando serial number já existe")
    void createAsset_withDuplicateSerialNumber_returnsConflict() throws Exception {
        // Given
        createTestAsset("Notebook Dell", "SN123456", AssetCategory.COMPUTER, AssetStatus.ACTIVE);

        AssetRequestDTO requestDTO = new AssetRequestDTO(
                "Notebook HP",
                "SN123456", // Serial number duplicado
                AssetCategory.COMPUTER,
                AssetStatus.ACTIVE,
                LocalDate.now(),
                new BigDecimal("2500.00"),
                null,
                null
        );

        // When/Then
        mockMvc.perform(post("/api/assets")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(requestDTO)))
                .andExpect(status().isConflict())
                .andExpect(jsonPath("$.message").value(containsString("already exists")));
    }

    // ==================== PUT /api/assets/{id} ====================

    @Test
    @DisplayName("PUT /api/assets/{id} - deve atualizar ativo com sucesso")
    void updateAsset_withValidData_returnsOk() throws Exception {
        // Given
        Asset existingAsset = createTestAsset("Notebook Dell", "SN001", AssetCategory.COMPUTER, AssetStatus.ACTIVE);

        AssetRequestDTO updateDTO = new AssetRequestDTO(
                "Notebook Dell Atualizado",
                "SN001",
                AssetCategory.COMPUTER,
                AssetStatus.MAINTENANCE,
                LocalDate.now(),
                new BigDecimal("3000.00"),
                "Sala 202",
                "Em manutenção"
        );

        // When/Then
        mockMvc.perform(put("/api/assets/" + existingAsset.getId())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(updateDTO)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id", is(existingAsset.getId().intValue())))
                .andExpect(jsonPath("$.name", is("Notebook Dell Atualizado")))
                .andExpect(jsonPath("$.status", is("MAINTENANCE")))
                .andExpect(jsonPath("$.purchaseValue", is(3000.00)))
                .andExpect(jsonPath("$.location", is("Sala 202")));
    }

    @Test
    @DisplayName("PUT /api/assets/{id} - deve retornar 404 quando ativo não existe")
    void updateAsset_whenAssetNotFound_returnsNotFound() throws Exception {
        // Given
        AssetRequestDTO updateDTO = new AssetRequestDTO(
                "Notebook HP",
                "SN123456",
                AssetCategory.COMPUTER,
                AssetStatus.ACTIVE,
                LocalDate.now(),
                new BigDecimal("2500.00"),
                null,
                null
        );

        // When/Then
        mockMvc.perform(put("/api/assets/99999")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(updateDTO)))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.message").value(containsString("not found")));
    }

    @Test
    @DisplayName("PUT /api/assets/{id} - deve retornar 409 quando serial number já existe em outro ativo")
    void updateAsset_withDuplicateSerialNumber_returnsConflict() throws Exception {
        // Given
        Asset asset1 = createTestAsset("Notebook Dell", "SN001", AssetCategory.COMPUTER, AssetStatus.ACTIVE);
        createTestAsset("Monitor LG", "SN002", AssetCategory.MONITOR, AssetStatus.ACTIVE);

        AssetRequestDTO updateDTO = new AssetRequestDTO(
                "Notebook Dell",
                "SN002", // Tentando usar serial do asset2
                AssetCategory.COMPUTER,
                AssetStatus.ACTIVE,
                LocalDate.now(),
                new BigDecimal("2500.00"),
                null,
                null
        );

        // When/Then
        mockMvc.perform(put("/api/assets/" + asset1.getId())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(updateDTO)))
                .andExpect(status().isConflict());
    }

    // ==================== DELETE /api/assets/{id} ====================

    @Test
    @DisplayName("DELETE /api/assets/{id} - deve deletar ativo com sucesso")
    void deleteAsset_whenAssetExists_returnsNoContent() throws Exception {
        // Given
        Asset asset = createTestAsset("Notebook Dell", "SN001", AssetCategory.COMPUTER, AssetStatus.ACTIVE);

        // When/Then
        mockMvc.perform(delete("/api/assets/" + asset.getId()))
                .andExpect(status().isNoContent());

        // Verify
        mockMvc.perform(get("/api/assets"))
                .andExpect(jsonPath("$", hasSize(0)));
    }

    @Test
    @DisplayName("DELETE /api/assets/{id} - deve retornar 404 quando ativo não existe")
    void deleteAsset_whenAssetNotFound_returnsNotFound() throws Exception {
        mockMvc.perform(delete("/api/assets/99999"))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.message").value(containsString("not found")));
    }

    // ==================== Helper Methods ====================

    private Asset createTestAsset(String name, String serialNumber, AssetCategory category, AssetStatus status) {
        Asset asset = new Asset();
        asset.setName(name);
        asset.setSerialNumber(serialNumber);
        asset.setCategory(category);
        asset.setStatus(status);
        asset.setPurchaseDate(LocalDate.now());
        asset.setPurchaseValue(new BigDecimal("1000.00"));
        return assetRepository.save(asset);
    }
}
