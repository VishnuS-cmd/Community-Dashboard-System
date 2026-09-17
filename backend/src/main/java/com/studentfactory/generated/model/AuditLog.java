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
@Table(name = "audit_logs")
public class AuditLog {
  @Id
  public String id;

  public String actor = "system";
  public String action;
  public String entity;

  @Column(name = "entity_id")
  public String entityId;

  @Lob
  public String payload;

  public Instant timestamp;

  @PrePersist
  public void prePersist() {
    if (id == null) id = UUID.randomUUID().toString();
    if (timestamp == null) timestamp = Instant.now();
  }
}
