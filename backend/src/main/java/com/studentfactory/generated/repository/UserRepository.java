package com.studentfactory.generated.repository;

import com.studentfactory.generated.model.UserAccount;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<UserAccount, String> {
  Optional<UserAccount> findByEmail(String email);
}
