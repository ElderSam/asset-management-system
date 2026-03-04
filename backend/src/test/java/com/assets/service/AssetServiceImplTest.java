package com.assets.service;

import com.assets.dto.AssetDTO;
import com.assets.dto.AssetRequestDTO;
import com.assets.exception.DuplicateResourceException;
import com.assets.exception.ResourceNotFoundException;
import com.assets.model.Asset;
import com.assets.model.AssetCategory;
import com.assets.model.AssetStatus;
import com.assets.repository.AssetRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.jpa.domain.Specification;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class AssetServiceImplTest {

    @Mock
    private AssetRepository repository;

    @InjectMocks
    private AssetServiceImpl service;

    private Asset asset;
    private AssetRequestDTO requestDTO;

    @BeforeEach
    void setUp() {
        asset = new Asset();
        asset.setId(1L);
        asset.setName("Notebook Dell");
        asset.setSerialNumber("SN123456");
        asset.setCategory(AssetCategory.COMPUTER);
        asset.setStatus(AssetStatus.ACTIVE);
        asset.setPurchaseDate(LocalDate.of(2024, 1, 15));
        asset.setPurchaseValue(new BigDecimal("2500.00"));
        asset.setLocation("Sala 101");
        asset.setDescription("Notebook para desenvolvimento");
        asset.setCreatedAt(LocalDateTime.now());
        asset.setUpdatedAt(LocalDateTime.now());

        requestDTO = new AssetRequestDTO(
                "Notebook Dell",
                "SN123456",
                AssetCategory.COMPUTER,
                AssetStatus.ACTIVE,
                LocalDate.of(2024, 1, 15),
                new BigDecimal("2500.00"),
                "Sala 101",
                "Notebook para desenvolvimento"
        );
    }

    @Test
    @DisplayName("findAll - deve retornar lista de ativos quando há dados")
    void findAll_whenAssetsExist_returnsListOfAssets() {
        when(repository.findAll(any(Specification.class))).thenReturn(List.of(asset));

        List<AssetDTO> result = service.findAll(null, null, null);

        assertThat(result).hasSize(1);
        assertThat(result.get(0).name()).isEqualTo("Notebook Dell");
        verify(repository).findAll(any(Specification.class));
    }

    @Test
    @DisplayName("findAll - deve retornar lista vazia quando não há ativos")
    void findAll_whenNoAssets_returnsEmptyList() {
        when(repository.findAll(any(Specification.class))).thenReturn(List.of());

        List<AssetDTO> result = service.findAll(null, null, null);

        assertThat(result).isEmpty();
        verify(repository).findAll(any(Specification.class));
    }

    @Test
    @DisplayName("findAll - deve aplicar filtros quando fornecidos")
    void findAll_withFilters_appliesFiltersCorrectly() {
        when(repository.findAll(any(Specification.class))).thenReturn(List.of(asset));

        List<AssetDTO> result = service.findAll("Dell", AssetCategory.COMPUTER, AssetStatus.ACTIVE);

        assertThat(result).hasSize(1);
        verify(repository).findAll(any(Specification.class));
    }

    @Test
    @DisplayName("findById - deve retornar ativo quando existe")
    void findById_whenAssetExists_returnsAsset() {
        when(repository.findById(1L)).thenReturn(Optional.of(asset));

        AssetDTO result = service.findById(1L);

        assertThat(result).isNotNull();
        assertThat(result.id()).isEqualTo(1L);
        assertThat(result.name()).isEqualTo("Notebook Dell");
        verify(repository).findById(1L);
    }

    @Test
    @DisplayName("findById - deve lançar exceção quando ativo não existe")
    void findById_whenAssetNotFound_throwsException() {
        when(repository.findById(999L)).thenReturn(Optional.empty());

        assertThatThrownBy(() -> service.findById(999L))
                .isInstanceOf(ResourceNotFoundException.class)
                .hasMessageContaining("Asset not found");

        verify(repository).findById(999L);
    }

    @Test
    @DisplayName("create - deve criar ativo com sucesso quando serialNumber não existe")
    void create_whenSerialNumberNotExists_createsAsset() {
        when(repository.existsBySerialNumber("SN123456")).thenReturn(false);
        when(repository.save(any(Asset.class))).thenReturn(asset);

        AssetDTO result = service.create(requestDTO);

        assertThat(result).isNotNull();
        assertThat(result.name()).isEqualTo("Notebook Dell");
        assertThat(result.serialNumber()).isEqualTo("SN123456");
        verify(repository).existsBySerialNumber("SN123456");
        verify(repository).save(any(Asset.class));
    }

    @Test
    @DisplayName("create - deve lançar exceção quando serialNumber já existe")
    void create_whenSerialNumberExists_throwsException() {
        when(repository.existsBySerialNumber("SN123456")).thenReturn(true);

        assertThatThrownBy(() -> service.create(requestDTO))
                .isInstanceOf(DuplicateResourceException.class)
                .hasMessageContaining("already exists");

        verify(repository).existsBySerialNumber("SN123456");
        verify(repository, never()).save(any(Asset.class));
    }

    @Test
    @DisplayName("update - deve atualizar ativo com sucesso quando serialNumber não está duplicado")
    void update_whenSerialNumberNotDuplicated_updatesAsset() {
        when(repository.findById(1L)).thenReturn(Optional.of(asset));
        when(repository.existsBySerialNumberAndIdNot("SN123456", 1L)).thenReturn(false);
        when(repository.save(any(Asset.class))).thenReturn(asset);

        AssetDTO result = service.update(1L, requestDTO);

        assertThat(result).isNotNull();
        assertThat(result.name()).isEqualTo("Notebook Dell");
        verify(repository).findById(1L);
        verify(repository).existsBySerialNumberAndIdNot("SN123456", 1L);
        verify(repository).save(any(Asset.class));
    }

    @Test
    @DisplayName("update - deve lançar exceção quando ativo não existe")
    void update_whenAssetNotFound_throwsException() {
        when(repository.findById(999L)).thenReturn(Optional.empty());

        assertThatThrownBy(() -> service.update(999L, requestDTO))
                .isInstanceOf(ResourceNotFoundException.class)
                .hasMessageContaining("Asset not found");

        verify(repository).findById(999L);
        verify(repository, never()).save(any(Asset.class));
    }

    @Test
    @DisplayName("update - deve lançar exceção quando serialNumber está duplicado em outro ativo")
    void update_whenSerialNumberDuplicated_throwsException() {
        when(repository.findById(1L)).thenReturn(Optional.of(asset));
        when(repository.existsBySerialNumberAndIdNot("SN123456", 1L)).thenReturn(true);

        assertThatThrownBy(() -> service.update(1L, requestDTO))
                .isInstanceOf(DuplicateResourceException.class)
                .hasMessageContaining("already exists");

        verify(repository).findById(1L);
        verify(repository).existsBySerialNumberAndIdNot("SN123456", 1L);
        verify(repository, never()).save(any(Asset.class));
    }

    @Test
    @DisplayName("delete - deve deletar ativo com sucesso quando existe")
    void delete_whenAssetExists_deletesAsset() {
        when(repository.existsById(1L)).thenReturn(true);
        doNothing().when(repository).deleteById(1L);

        service.delete(1L);

        verify(repository).existsById(1L);
        verify(repository).deleteById(1L);
    }

    @Test
    @DisplayName("delete - deve lançar exceção quando ativo não existe")
    void delete_whenAssetNotFound_throwsException() {
        when(repository.existsById(999L)).thenReturn(false);

        assertThatThrownBy(() -> service.delete(999L))
                .isInstanceOf(ResourceNotFoundException.class)
                .hasMessageContaining("Asset not found");

        verify(repository).existsById(999L);
        verify(repository, never()).deleteById(anyLong());
    }
}
