package com.studentfactory.generated.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.studentfactory.generated.model.AuditLog;
import com.studentfactory.generated.model.Category;
import com.studentfactory.generated.model.Department;
import com.studentfactory.generated.model.ManagedRecord;
import com.studentfactory.generated.model.Role;
import com.studentfactory.generated.model.TransactionItem;
import com.studentfactory.generated.model.UserAccount;
import com.studentfactory.generated.repository.AuditLogRepository;
import com.studentfactory.generated.repository.CategoryRepository;
import com.studentfactory.generated.repository.DepartmentRepository;
import com.studentfactory.generated.repository.RecordRepository;
import com.studentfactory.generated.repository.RoleRepository;
import com.studentfactory.generated.repository.TransactionRepository;
import com.studentfactory.generated.repository.UserRepository;
import java.nio.file.Files;
import java.nio.file.Path;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class SeedService {

  private final ObjectMapper mapper;
  private final BCryptPasswordEncoder passwordEncoder;
  private final RoleRepository roles;
  private final UserRepository users;
  private final CategoryRepository categories;
  private final DepartmentRepository departments;
  private final RecordRepository records;
  private final TransactionRepository transactions;
  private final AuditLogRepository auditLogs;

  public SeedService(
    ObjectMapper mapper,
    BCryptPasswordEncoder passwordEncoder,
    RoleRepository roles,
    UserRepository users,
    CategoryRepository categories,
    DepartmentRepository departments,
    RecordRepository records,
    TransactionRepository transactions,
    AuditLogRepository auditLogs
  ) {
    this.mapper = mapper;
    this.passwordEncoder = passwordEncoder;
    this.roles = roles;
    this.users = users;
    this.categories = categories;
    this.departments = departments;
    this.records = records;
    this.transactions = transactions;
    this.auditLogs = auditLogs;
  }

  public void seed() throws Exception {

    JsonNode seed = loadSeed();

    /*
     * ============================
     * ADMIN ROLE
     * ============================
     */
    Role adminRole = roles
      .findByName(seed.path("admin").path("role").asText("admin"))
      .orElseGet(() -> {
        Role role = new Role();
        role.name = seed.path("admin").path("role").asText("admin");
        role.description = "Project administrator";
        return roles.save(role);
      });

    /*
     * ============================
     * ADMIN USER
     * ============================
     */
    String adminEmail = seed
      .path("admin")
      .path("email")
      .asText("admin@example.com");

    users.findByEmail(adminEmail).orElseGet(() -> {

      UserAccount user = new UserAccount();

      user.email = adminEmail;

      user.displayName = seed
        .path("admin")
        .path("displayName")
        .asText("System Admin");

      user.passwordHash = passwordEncoder.encode(
        seed
          .path("admin")
          .path("password")
          .asText("Admin@123")
      );

      user.roleId = adminRole.id;

      return users.save(user);
    });

    /*
     * ============================
     * OPERATOR ROLE
     * ============================
     */
    Role operatorRole = roles
      .findByName(seed.path("operator").path("role").asText("operator"))
      .orElseGet(() -> {

        Role role = new Role();

        role.name = seed
          .path("operator")
          .path("role")
          .asText("operator");

        role.description = "Project operator";

        return roles.save(role);
      });

    /*
     * ============================
     * OPERATOR USER
     * ============================
     */
    String operatorEmail = seed
      .path("operator")
      .path("email")
      .asText("operator@example.com");

    users.findByEmail(operatorEmail).orElseGet(() -> {

      UserAccount user = new UserAccount();

      user.email = operatorEmail;

      user.displayName = seed
        .path("operator")
        .path("displayName")
        .asText("System Operator");

      user.passwordHash = passwordEncoder.encode(
        seed
          .path("operator")
          .path("password")
          .asText("Operator@123")
      );

      user.roleId = operatorRole.id;

      return users.save(user);
    });

    /*
     * ============================
     * CATEGORIES
     * ============================
     */
    for (JsonNode item : seed.path("categories")) {

      if (
        categories
          .findAll()
          .stream()
          .noneMatch(existing -> existing.name.equals(item.asText()))
      ) {

        Category category = new Category();

        category.name = item.asText();

        category.description = item.asText() + " category";

        categories.save(category);
      }
    }

    /*
     * ============================
     * DEPARTMENTS
     * ============================
     */
    for (JsonNode item : seed.path("departments")) {

      if (
        departments
          .findAll()
          .stream()
          .noneMatch(existing -> existing.name.equals(item.asText()))
      ) {

        Department department = new Department();

        department.name = item.asText();

        department.description = item.asText() + " department";

        departments.save(department);
      }
    }

    /*
     * ============================
     * FIRST CATEGORY / DEPARTMENT
     * ============================
     */
    Category firstCategory = categories
      .findAll()
      .stream()
      .findFirst()
      .orElse(null);

    Department firstDepartment = departments
      .findAll()
      .stream()
      .findFirst()
      .orElse(null);

    /*
     * ============================
     * RECORDS
     * ============================
     */
    for (JsonNode item : seed.path("records")) {

      ManagedRecord record = new ManagedRecord();

      record.title = item
        .path("title")
        .asText("Seed Record");

      record.description = item
        .path("description")
        .asText("");

      record.status = item
        .path("status")
        .asText("active");

      record.categoryId =
        firstCategory == null
          ? null
          : firstCategory.id;

      record.departmentId =
        firstDepartment == null
          ? null
          : firstDepartment.id;

      records.save(record);
    }

    /*
     * ============================
     * TRANSACTIONS
     * ============================
     */
    ManagedRecord firstRecord = records
      .findAll()
      .stream()
      .findFirst()
      .orElse(null);

    for (JsonNode item : seed.path("transactions")) {

      TransactionItem transaction = new TransactionItem();

      transaction.recordId =
        firstRecord == null
          ? null
          : firstRecord.id;

      transaction.type = item
        .path("type")
        .asText("credit");

      transaction.amount = item
        .path("amount")
        .asDouble(100);

      transaction.note = item
        .path("note")
        .asText("Seed transaction");

      transactions.save(transaction);
    }

    /*
     * ============================
     * AUDIT LOG
     * ============================
     */
    AuditLog log = new AuditLog();

    log.actor = adminEmail;

    log.action = "seed";

    log.entity = "project";

    log.entityId = "community-dashboard-management-system";

    log.payload = "{\"source\":\"springboot-seed\"}";

    auditLogs.save(log);
  }

  /*
   * ============================
   * LOAD SEED JSON
   * ============================
   */
  private JsonNode loadSeed() throws Exception {

    Path path = Path.of("config", "seed.json");

    return mapper.readTree(
      Files.readString(path)
    );
  }
}