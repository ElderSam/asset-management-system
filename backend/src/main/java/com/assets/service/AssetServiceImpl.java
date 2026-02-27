package com.assets.service;

import com.assets.dto.AssetDTO;
import com.assets.dto.AssetMapper;
import com.assets.dto.AssetRequestDTO;
import com.assets.exception.DuplicateResourceException;
import com.assets.exception.ResourceNotFoundException;
import com.assets.model.Asset;
import com.assets.model.AssetCategory;
import com.assets.model.AssetStatus;
import com.assets.repository.AssetRepository;
import jakarta.persistence.criteria.Predicate;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class AssetServiceImpl implements AssetService {

    private final AssetRepository repository;

    public AssetServiceImpl(AssetRepository repository) {
        this.repository = repository;
    }

    @Override
    public List<AssetDTO> findAll(String search, AssetCategory category, AssetStatus status) {
        Specification<Asset> spec = buildSpecification(search, category, status);
        
        return repository.findAll(spec)
                .stream()
                .map(AssetMapper::toDTO)
                .collect(Collectors.toList());
    }

    @Override
    public AssetDTO findById(Long id) {
        Asset asset = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Asset", "id", id));
        
        return AssetMapper.toDTO(asset);
    }

    @Override
    @Transactional
    public AssetDTO create(AssetRequestDTO dto) {
        // Validar se serialNumber já existe
        if (repository.existsBySerialNumber(dto.serialNumber())) {
            throw new DuplicateResourceException("Asset", "serialNumber", dto.serialNumber());
        }

        Asset asset = AssetMapper.toEntity(dto);
        Asset savedAsset = repository.save(asset);
        
        return AssetMapper.toDTO(savedAsset);
    }

    @Override
    @Transactional
    public AssetDTO update(Long id, AssetRequestDTO dto) {
        Asset asset = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Asset", "id", id));

        // Validar se serialNumber já existe em outro ativo
        repository.findBySerialNumber(dto.serialNumber())
                .ifPresent(existingAsset -> {
                    if (!existingAsset.getId().equals(id)) {
                        throw new DuplicateResourceException("Asset", "serialNumber", dto.serialNumber());
                    }
                });

        AssetMapper.updateEntity(asset, dto);
        Asset updatedAsset = repository.save(asset);
        
        return AssetMapper.toDTO(updatedAsset);
    }

    @Override
    @Transactional
    public void delete(Long id) {
        if (!repository.existsById(id)) {
            throw new ResourceNotFoundException("Asset", "id", id);
        }
        
        repository.deleteById(id);
    }

    private Specification<Asset> buildSpecification(String search, AssetCategory category, AssetStatus status) {
        return (root, query, criteriaBuilder) -> {
            List<Predicate> predicates = new ArrayList<>();

            // Filtro de busca por nome OU serialNumber
            if (search != null && !search.trim().isEmpty()) {
                String searchPattern = "%" + search.toLowerCase() + "%";
                Predicate namePredicate = criteriaBuilder.like(
                        criteriaBuilder.lower(root.get("name")), 
                        searchPattern
                );
                Predicate serialPredicate = criteriaBuilder.like(
                        criteriaBuilder.lower(root.get("serialNumber")), 
                        searchPattern
                );
                predicates.add(criteriaBuilder.or(namePredicate, serialPredicate));
            }

            // Filtro por categoria
            if (category != null) {
                predicates.add(criteriaBuilder.equal(root.get("category"), category));
            }

            // Filtro por status
            if (status != null) {
                predicates.add(criteriaBuilder.equal(root.get("status"), status));
            }

            return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
        };
    }
}
