package com.studentfactory.generated.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;
import java.util.UUID;

@Entity
@Table(name = "records")
public class ManagedRecord {
  @Id
  public String id;

  public String title;
  public String description = "";

  @Column(name = "category_id")
  public String categoryId;

  @Column(name = "department_id")
  public String departmentId;

  public String status = "active";

  @PrePersist
  public void prePersist() {
    if (id == null) id = UUID.randomUUID().toString();
  }
}
