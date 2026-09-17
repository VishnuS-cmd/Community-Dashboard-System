package com.studentfactory.generated.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;
import java.time.Instant;
import java.util.UUID;

@Entity
@Table(name = "transactions")
public class TransactionItem {
  @Id
  public String id;

  @Column(name = "record_id")
  public String recordId;

  public String type;
  public Double amount = 0.0;
  public String note = "";

  @Column(name = "created_at")
  public Instant createdAt;

  @PrePersist
  public void prePersist() {
    if (id == null) id = UUID.randomUUID().toString();
    if (createdAt == null) createdAt = Instant.now();
  }
}
