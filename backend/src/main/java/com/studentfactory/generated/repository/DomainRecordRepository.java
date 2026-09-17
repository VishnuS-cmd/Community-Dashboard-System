package com.studentfactory.generated.repository;

import com.studentfactory.generated.model.DomainRecord;
import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DomainRecordRepository extends JpaRepository<DomainRecord, String> {
  List<DomainRecord> findByEntityName(String entityName);
  Page<DomainRecord> findByEntityName(String entityName, Pageable pageable);
  long countByEntityName(String entityName);
}
