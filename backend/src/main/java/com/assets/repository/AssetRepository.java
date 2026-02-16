package com.assets.repository;

import com.assets.model.Asset;
import com.assets.model.AssetCategory;
import com.assets.model.AssetStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

// Repository para operações de persistência da entidade Asset
@Repository
public interface AssetRepository extends JpaRepository<Asset, Long> {

    // Busca ativo pelo número de série
    Optional<Asset> findBySerialNumber(String serialNumber);

    // Busca ativos por categoria
    List<Asset> findByCategory(AssetCategory category);

    // Busca ativos por status
    List<Asset> findByStatus(AssetStatus status);

    // Busca ativos por categoria e status
    List<Asset> findByCategoryAndStatus(AssetCategory category, AssetStatus status);

    // Verifica se existe ativo com o número de série (útil para validação)
    boolean existsBySerialNumber(String serialNumber);

    // Busca ativos por nome (case-insensitive, parcial)
    List<Asset> findByNameContainingIgnoreCase(String name);

    // Busca ativos por número de série (case-insensitive, parcial)
    List<Asset> findBySerialNumberContainingIgnoreCase(String serialNumber);

    // Busca ativos por nome OU número de série (case-insensitive, parcial)
    List<Asset> findByNameContainingIgnoreCaseOrSerialNumberContainingIgnoreCase(
            String name, String serialNumber);
}
