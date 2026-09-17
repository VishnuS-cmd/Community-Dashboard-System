package com.studentfactory.generated.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;
import java.time.Instant;
import java.util.UUID;

@Entity
@Table(name = "domain_records")
public class DomainRecord {
  @Id
  public String id;

  @Column(name = "entity_name", nullable = false)
  public String entityName;

  @Lob
  @Column(nullable = false)
  public String data;

  @Column(name = "created_at")
  public Instant createdAt;

  @PrePersist
  public void prePersist() {
    if (id == null) id = UUID.randomUUID().toString();
    if (createdAt == null) createdAt = Instant.now();
  }
}
