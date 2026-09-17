package com.studentfactory.generated.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;
import java.util.UUID;

@Entity
@Table(name = "users")
public class UserAccount {
  @Id
  public String id;

  @Column(unique = true, nullable = false)
  public String email;

  @Column(name = "display_name", nullable = false)
  public String displayName;

  @Column(name = "password_hash", nullable = false)
  public String passwordHash;

  @Column(name = "role_id", nullable = false)
  public String roleId;

  @PrePersist
  public void prePersist() {
    if (id == null) id = UUID.randomUUID().toString();
  }
}
