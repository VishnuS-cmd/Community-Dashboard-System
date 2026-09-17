package com.studentfactory.generated.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;
import java.util.UUID;

@Entity
@Table(name = "roles")
public class Role {
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
