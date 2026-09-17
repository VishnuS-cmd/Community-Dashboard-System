package com.studentfactory.generated.repository;

import com.studentfactory.generated.model.Role;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoleRepository extends JpaRepository<Role, String> {
  Optional<Role> findByName(String name);
}
