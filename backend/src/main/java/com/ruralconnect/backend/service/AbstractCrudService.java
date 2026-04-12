package com.ruralconnect.backend.service;

import com.ruralconnect.backend.common.exception.ResourceNotFoundException;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public abstract class AbstractCrudService<T> implements CrudService<T> {

    protected final JpaRepository<T, Long> repository;

    protected AbstractCrudService(JpaRepository<T, Long> repository) {
        this.repository = repository;
    }

    @Override
    public List<T> findAll() {
        return repository.findAll();
    }

    @Override
    public T findById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Resource not found with id: " + id));
    }

    @Override
    public T create(T entity) {
        return repository.save(entity);
    }

    @Override
    public T update(Long id, T entity) {
        if (!repository.existsById(id)) {
            throw new ResourceNotFoundException("Resource not found with id: " + id);
        }
        return repository.save(entity);
    }

    @Override
    public void delete(Long id) {
        if (!repository.existsById(id)) {
            throw new ResourceNotFoundException("Resource not found with id: " + id);
        }
        repository.deleteById(id);
    }
}
