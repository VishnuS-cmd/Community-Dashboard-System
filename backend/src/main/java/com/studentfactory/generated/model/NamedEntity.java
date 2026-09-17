package com.studentfactory.generated.model;

import jakarta.persistence.Column;
import jakarta.persistence.Id;
import jakarta.persistence.MappedSuperclass;
import jakarta.persistence.PrePersist;
import java.util.UUID;

@MappedSuperclass
public abstract class NamedEntity {
  @Id
  public String id;

  @Column(unique = true, nullable = false)
  public String name;

  public String description = "";

  @PrePersist
  public void prePersist() {
    if (id == null) id = UUID.randomUUID().toString();
  }
}
