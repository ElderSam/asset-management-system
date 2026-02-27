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
        validateSerialNumberNotExists(dto.serialNumber());

        Asset asset = AssetMapper.toEntity(dto);
        Asset savedAsset = repository.save(asset);
        
        return AssetMapper.toDTO(savedAsset);
    }

    @Override
    @Transactional
    public AssetDTO update(Long id, AssetRequestDTO dto) {
        Asset asset = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Asset", "id", id));

        validateSerialNumberNotDuplicated(id, dto.serialNumber());

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

            addSearchFilter(predicates, root, criteriaBuilder, search);
            addCategoryFilter(predicates, root, criteriaBuilder, category);
            addStatusFilter(predicates, root, criteriaBuilder, status);

            return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
        };
    }

    private void validateSerialNumberNotExists(String serialNumber) {
        if (repository.existsBySerialNumber(serialNumber)) {
            throw new DuplicateResourceException("Asset", "serialNumber", serialNumber);
        }
    }

    private void validateSerialNumberNotDuplicated(Long currentAssetId, String serialNumber) {
        if (repository.existsBySerialNumberAndIdNot(serialNumber, currentAssetId)) {
            throw new DuplicateResourceException("Asset", "serialNumber", serialNumber);
        }
    }

    private void addSearchFilter(List<Predicate> predicates, 
                                  jakarta.persistence.criteria.Root<Asset> root,
                                  jakarta.persistence.criteria.CriteriaBuilder criteriaBuilder, 
                                  String search) {
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
    }

    private void addCategoryFilter(List<Predicate> predicates, 
                                    jakarta.persistence.criteria.Root<Asset> root,
                                    jakarta.persistence.criteria.CriteriaBuilder criteriaBuilder, 
                                    AssetCategory category) {
        if (category != null) {
            predicates.add(criteriaBuilder.equal(root.get("category"), category));
        }
    }

    private void addStatusFilter(List<Predicate> predicates, 
                                  jakarta.persistence.criteria.Root<Asset> root,
                                  jakarta.persistence.criteria.CriteriaBuilder criteriaBuilder, 
                                  AssetStatus status) {
        if (status != null) {
            predicates.add(criteriaBuilder.equal(root.get("status"), status));
        }
    }
}
