package com.studentfactory.generated.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.studentfactory.generated.config.JwtUtil;
import com.studentfactory.generated.model.AuditLog;
import com.studentfactory.generated.model.Category;
import com.studentfactory.generated.model.Department;
import com.studentfactory.generated.model.DomainRecord;
import com.studentfactory.generated.model.ManagedRecord;
import com.studentfactory.generated.model.Role;
import com.studentfactory.generated.model.TransactionItem;
import com.studentfactory.generated.model.UserAccount;
import com.studentfactory.generated.repository.AuditLogRepository;
import com.studentfactory.generated.repository.CategoryRepository;
import com.studentfactory.generated.repository.DepartmentRepository;
import com.studentfactory.generated.repository.DomainRecordRepository;
import com.studentfactory.generated.repository.RecordRepository;
import com.studentfactory.generated.repository.RoleRepository;
import com.studentfactory.generated.repository.TransactionRepository;
import com.studentfactory.generated.repository.UserRepository;

import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.Base64;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/api")
public class ApiController {

  private final ObjectMapper mapper;
  private final BCryptPasswordEncoder passwordEncoder;
  private final JwtUtil jwtUtil;

  private final UserRepository users;
  private final RoleRepository roles;
  private final CategoryRepository categories;
  private final DepartmentRepository departments;
  private final RecordRepository records;
  private final TransactionRepository transactions;
  private final AuditLogRepository auditLogs;
  private final DomainRecordRepository domainRecords;

  public ApiController(
    ObjectMapper mapper,
    BCryptPasswordEncoder passwordEncoder,
    JwtUtil jwtUtil,
    UserRepository users,
    RoleRepository roles,
    CategoryRepository categories,
    DepartmentRepository departments,
    RecordRepository records,
    TransactionRepository transactions,
    AuditLogRepository auditLogs,
    DomainRecordRepository domainRecords
  ) {
    this.mapper = mapper;
    this.passwordEncoder = passwordEncoder;
    this.jwtUtil = jwtUtil;
    this.users = users;
    this.roles = roles;
    this.categories = categories;
    this.departments = departments;
    this.records = records;
    this.transactions = transactions;
    this.auditLogs = auditLogs;
    this.domainRecords = domainRecords;
  }

  // ---------------------------------------------------------
  // Health
  // ---------------------------------------------------------

  @GetMapping("/health")
  public Map<String, String> health() {
    return Map.of(
      "status",
      "ok",
      "service",
      "community-dashboard-management-system-api"
    );
  }

  // ---------------------------------------------------------
  // Authentication
  // ---------------------------------------------------------

  @PostMapping("/auth/login")
  public Map<String, Object> login(
    @RequestBody Map<String, String> body
  ) {
    UserAccount user = users.findByEmail(
      body.getOrDefault("email", "")
    ).orElseThrow(
      () -> new ResponseStatusException(
        HttpStatus.UNAUTHORIZED,
        "Invalid credentials"
      )
    );

    if (!passwordEncoder.matches(
      body.getOrDefault("password", ""),
      user.passwordHash
    )) {
      throw new ResponseStatusException(
        HttpStatus.UNAUTHORIZED,
        "Invalid credentials"
      );
    }

    String roleName = roles.findById(
      user.roleId != null ? user.roleId : ""
    )
      .map((Role r) -> r.name)
      .orElse("user");

    String token = jwtUtil.generateToken(
      user.email,
      roleName
    );

    // Build user map with resolved roleName so the frontend can store it without
    // decoding the JWT — preserves existing sanitizeUser fields plus adds roleName.
    Map<String, Object> userMap = new LinkedHashMap<>(sanitizeUser(user));
    userMap.put("roleName", roleName);

    return Map.of(
      "accessToken",
      token,
      "user",
      userMap
    );
  }

  // ---------------------------------------------------------
  // Dashboard
  // ---------------------------------------------------------

  @GetMapping("/dashboard/stats")
  public Map<String, Long> dashboardStats() {
    return Map.of(
      "records",
      records.count(),
      "categories",
      categories.count(),
      "departments",
      departments.count(),
      "transactions",
      transactions.count()
    );
  }

  @GetMapping("/dashboard/modules")
  public Map<String, Object> dashboardModules() {
    try {
      Path path = Path.of(
        "config",
        "modules.json"
      );

      JsonNode node = mapper.readTree(
        Files.readString(path)
      );

      return Map.of(
        "modules",
        node.path("modules")
      );

    } catch (Exception e) {

      return Map.of(
        "modules",
        List.of(
          "records",
          "categories",
          "departments",
          "transactions",
          "reports",
          "dashboard",
          "export-csv",
          "audit-log"
        )
      );
    }
  }

  // ---------------------------------------------------------
  // Categories
  // ---------------------------------------------------------

  @GetMapping("/categories")
  public Object categories(
    @RequestParam(required = false) Integer page,
    @RequestParam(defaultValue = "10") Integer limit
  ) {

    if (page == null) {
      return categories.findAll();
    }

    return paginate(
      categories.findAll(
        PageRequest.of(
          Math.max(0, page - 1),
          clamp(limit)
        )
      )
    );
  }

  @PostMapping("/categories")
  @ResponseStatus(HttpStatus.CREATED)
  public Category createCategory(
    @RequestBody Category category,
    @RequestHeader(
      value = "Authorization",
      required = false
    ) String auth
  ) throws JsonProcessingException {

    Category saved = categories.save(category);

    writeAudit(
      "create",
      "category",
      saved.id,
      saved,
      resolveActor(auth)
    );

    return saved;
  }

  @DeleteMapping("/categories/{id}")
  @ResponseStatus(HttpStatus.NO_CONTENT)
  public void deleteCategory(
    @PathVariable String id,
    @RequestHeader(
      value = "Authorization",
      required = false
    ) String auth
  ) throws JsonProcessingException {

    Category cat = categories.findById(id)
      .orElseThrow(
        () -> new ResponseStatusException(
          HttpStatus.NOT_FOUND,
          "Category not found"
        )
      );

    categories.deleteById(id);

    writeAudit(
      "delete",
      "category",
      id,
      cat,
      resolveActor(auth)
    );
  }

  // ---------------------------------------------------------
  // Departments
  // ---------------------------------------------------------

  @GetMapping("/departments")
  public Object departments(
    @RequestParam(required = false) Integer page,
    @RequestParam(defaultValue = "10") Integer limit
  ) {

    if (page == null) {
      return departments.findAll();
    }

    return paginate(
      departments.findAll(
        PageRequest.of(
          Math.max(0, page - 1),
          clamp(limit)
        )
      )
    );
  }

  @PostMapping("/departments")
  @ResponseStatus(HttpStatus.CREATED)
  public Department createDepartment(
    @RequestBody Department department,
    @RequestHeader(
      value = "Authorization",
      required = false
    ) String auth
  ) throws JsonProcessingException {

    Department saved = departments.save(
      department
    );

    writeAudit(
      "create",
      "department",
      saved.id,
      saved,
      resolveActor(auth)
    );

    return saved;
  }

  @DeleteMapping("/departments/{id}")
  @ResponseStatus(HttpStatus.NO_CONTENT)
  public void deleteDepartment(
    @PathVariable String id,
    @RequestHeader(
      value = "Authorization",
      required = false
    ) String auth
  ) throws JsonProcessingException {

    departments.findById(id)
      .orElseThrow(
        () -> new ResponseStatusException(
          HttpStatus.NOT_FOUND,
          "Department not found"
        )
      );

    departments.deleteById(id);

    writeAudit(
      "delete",
      "department",
      id,
      Map.of(),
      resolveActor(auth)
    );
  }

  // ---------------------------------------------------------
  // Records
  // ---------------------------------------------------------

  @GetMapping("/records")
  public Object records(
    @RequestParam(required = false) Integer page,
    @RequestParam(defaultValue = "10") Integer limit
  ) {

    if (page == null) {
      return records.findAll();
    }

    return paginate(
      records.findAll(
        PageRequest.of(
          Math.max(0, page - 1),
          clamp(limit)
        )
      )
    );
  }

  @PostMapping("/records")
  @ResponseStatus(HttpStatus.CREATED)
  public ManagedRecord createRecord(
    @RequestBody ManagedRecord record,
    @RequestHeader(
      value = "Authorization",
      required = false
    ) String auth
  ) throws JsonProcessingException {

    ManagedRecord saved = records.save(
      record
    );

    writeAudit(
      "create",
      "record",
      saved.id,
      saved,
      resolveActor(auth)
    );

    return saved;
  }

  @DeleteMapping("/records/{id}")
  @ResponseStatus(HttpStatus.NO_CONTENT)
  public void deleteRecord(
    @PathVariable String id,
    @RequestHeader(
      value = "Authorization",
      required = false
    ) String auth
  ) throws JsonProcessingException {

    records.findById(id)
      .orElseThrow(
        () -> new ResponseStatusException(
          HttpStatus.NOT_FOUND,
          "Record not found"
        )
      );

    records.deleteById(id);

    writeAudit(
      "delete",
      "record",
      id,
      Map.of(),
      resolveActor(auth)
    );
  }

  // ---------------------------------------------------------
  // Transactions
  // ---------------------------------------------------------

  @GetMapping("/transactions")
  public Object transactions(
    @RequestParam(required = false) Integer page,
    @RequestParam(defaultValue = "10") Integer limit
  ) {

    if (page == null) {
      return transactions.findAll();
    }

    return paginate(
      transactions.findAll(
        PageRequest.of(
          Math.max(0, page - 1),
          clamp(limit)
        )
      )
    );
  }

  @PostMapping("/transactions")
  @ResponseStatus(HttpStatus.CREATED)
  public TransactionItem createTransaction(
    @RequestBody TransactionItem transaction,
    @RequestHeader(
      value = "Authorization",
      required = false
    ) String auth
  ) throws JsonProcessingException {

    TransactionItem saved =
      transactions.save(transaction);

    writeAudit(
      "create",
      "transaction",
      saved.id,
      saved,
      resolveActor(auth)
    );

    return saved;
  }

  @DeleteMapping("/transactions/{id}")
  @ResponseStatus(HttpStatus.NO_CONTENT)
  public void deleteTransaction(
    @PathVariable String id,
    @RequestHeader(
      value = "Authorization",
      required = false
    ) String auth
  ) throws JsonProcessingException {

    transactions.findById(id)
      .orElseThrow(
        () -> new ResponseStatusException(
          HttpStatus.NOT_FOUND,
          "Transaction not found"
        )
      );

    transactions.deleteById(id);

    writeAudit(
      "delete",
      "transaction",
      id,
      Map.of(),
      resolveActor(auth)
    );
  }

  // ---------------------------------------------------------
  // Domain Entities
  // ---------------------------------------------------------

  @GetMapping("/domain/{entityName}")
  public Object domainEntities(
    @PathVariable String entityName,
    @RequestParam(required = false) Integer page,
    @RequestParam(defaultValue = "10") Integer limit
  ) {

    if (page == null) {

      return domainRecords
        .findByEntityName(entityName)
        .stream()
        .map(
          r -> enrichWithId(
            parseData(r.data),
            r.id
          )
        )
        .toList();
    }

    var pageResult =
      domainRecords.findByEntityName(
        entityName,
        PageRequest.of(
          Math.max(0, page - 1),
          clamp(limit),
          Sort.by(
            Sort.Direction.DESC,
            "createdAt"
          )
        )
      );

    return Map.of(
      "data",
      pageResult
        .getContent()
        .stream()
        .map(
          r -> enrichWithId(
            parseData(r.data),
            r.id
          )
        )
        .toList(),

      "meta",
      Map.of(
        "page",
        pageResult.getNumber() + 1,

        "limit",
        pageResult.getSize(),

        "total",
        pageResult.getTotalElements(),

        "totalPages",
        Math.max(
          1,
          pageResult.getTotalPages()
        )
      )
    );
  }

  // ---------------------------------------------------------
  // Create Domain Entity
  // ---------------------------------------------------------

  @PostMapping("/domain/{entityName}")
  @ResponseStatus(HttpStatus.CREATED)
  public Object createDomainEntity(
    @PathVariable String entityName,
    @RequestBody Map<String, Object> body,
    @RequestHeader(
      value = "Authorization",
      required = false
    ) String auth
  ) throws JsonProcessingException {

    DomainRecord record =
      new DomainRecord();

    record.entityName =
      entityName;

    record.data =
      mapper.writeValueAsString(body);

    DomainRecord saved =
      domainRecords.save(record);

    Map<String, Object> result =
      new LinkedHashMap<>(body);

    result.put(
      "id",
      saved.id
    );

    writeAudit(
      "create",
      entityName,
      saved.id,
      result,
      resolveActor(auth)
    );

    return result;
  }

  // ---------------------------------------------------------
  // UPDATE DOMAIN ENTITY
  // ---------------------------------------------------------

  @PutMapping("/domain/{entityName}/{id}")
  public Object updateDomainEntity(
    @PathVariable String entityName,
    @PathVariable String id,
    @RequestBody Map<String, Object> body,
    @RequestHeader(
      value = "Authorization",
      required = false
    ) String auth
  ) throws JsonProcessingException {

    DomainRecord record =
      domainRecords.findById(id)
        .orElseThrow(
          () -> new ResponseStatusException(
            HttpStatus.NOT_FOUND,
            entityName + " not found"
          )
        );

    record.data =
      mapper.writeValueAsString(body);

    DomainRecord saved =
      domainRecords.save(record);

    Map<String, Object> result =
      new LinkedHashMap<>(body);

    result.put(
      "id",
      saved.id
    );

    writeAudit(
      "update",
      entityName,
      saved.id,
      result,
      resolveActor(auth)
    );

    return result;
  }

  // ---------------------------------------------------------
  // DELETE DOMAIN ENTITY
  // ---------------------------------------------------------

  @DeleteMapping("/domain/{entityName}/{id}")
  @ResponseStatus(HttpStatus.NO_CONTENT)
  public void deleteDomainEntity(
    @PathVariable String entityName,
    @PathVariable String id,
    @RequestHeader(
      value = "Authorization",
      required = false
    ) String auth
  ) throws JsonProcessingException {

    domainRecords.findById(id)
      .orElseThrow(
        () -> new ResponseStatusException(
          HttpStatus.NOT_FOUND,
          entityName + " not found"
        )
      );

    domainRecords.deleteById(id);

    writeAudit(
      "delete",
      entityName,
      id,
      Map.of(),
      resolveActor(auth)
    );
  }

  // ---------------------------------------------------------
  // Users and Roles
  // ---------------------------------------------------------

  @GetMapping("/users")
  public List<Map<String, Object>> listUsers() {

    return users.findAll()
      .stream()
      .map(this::sanitizeUser)
      .toList();
  }

  @GetMapping("/roles")
  public Object listRoles() {
    return roles.findAll();
  }

  // ---------------------------------------------------------
  // Reports
  // ---------------------------------------------------------

  @GetMapping("/reports/summary")
  public Map<String, Long> summary() {

    return Map.of(
      "records",
      records.count(),

      "categories",
      categories.count(),

      "departments",
      departments.count(),

      "transactions",
      transactions.count()
    );
  }

  @GetMapping("/reports/transactions-csv")
  public ResponseEntity<String> transactionsCsv() {

    List<TransactionItem> all =
      transactions.findAll(
        Sort.by(
          Sort.Direction.DESC,
          "createdAt"
        )
      );

    StringBuilder sb =
      new StringBuilder(
        "id,recordId,type,amount,note,createdAt\n"
      );

    for (TransactionItem t : all) {

      sb.append(
        String.format(
          "%s,%s,%s,%.2f,\"%s\",%s%n",

          nvl(t.id),

          nvl(t.recordId),

          nvl(t.type),

          t.amount == null
            ? 0.0
            : t.amount,

          nvl(t.note)
            .replace(
              "\"",
              "\"\""
            ),

          t.createdAt == null
            ? ""
            : t.createdAt.toString()
        )
      );
    }

    return ResponseEntity.ok()
      .header(
        "Content-Type",
        "text/csv; charset=UTF-8"
      )
      .header(
        "Content-Disposition",
        "attachment; filename=\"transactions.csv\""
      )
      .body(
        sb.toString()
      );
  }

  // ---------------------------------------------------------
  // Audit Logs
  // ---------------------------------------------------------

  @GetMapping("/audit-logs")
  public Object auditLogs(
    @RequestParam(required = false) Integer page,
    @RequestParam(defaultValue = "10") Integer limit
  ) {

    Sort sort =
      Sort.by(
        Sort.Direction.DESC,
        "timestamp"
      );

    if (page == null) {
      return auditLogs.findAll(sort);
    }

    return paginate(
      auditLogs.findAll(
        PageRequest.of(
          Math.max(0, page - 1),
          clamp(limit),
          sort
        )
      )
    );
  }

  // ---------------------------------------------------------
  // Private Helpers
  // ---------------------------------------------------------

  private Map<String, Object> sanitizeUser(
    UserAccount user
  ) {

    Map<String, Object> item =
      new LinkedHashMap<>();

    item.put(
      "id",
      user.id
    );

    item.put(
      "email",
      user.email
    );

    item.put(
      "displayName",
      user.displayName
    );

    item.put(
      "roleId",
      user.roleId
    );

    return item;
  }

  private Map<String, Object> paginate(
    org.springframework.data.domain.Page<?> page
  ) {

    return Map.of(
      "data",
      page.getContent(),

      "meta",
      Map.of(
        "page",
        page.getNumber() + 1,

        "limit",
        page.getSize(),

        "total",
        page.getTotalElements(),

        "totalPages",
        Math.max(
          1,
          page.getTotalPages()
        )
      )
    );
  }

  private void writeAudit(
    String action,
    String entity,
    String entityId,
    Object payload,
    String actor
  ) throws JsonProcessingException {

    AuditLog log =
      new AuditLog();

    log.actor =
      actor;

    log.action =
      action;

    log.entity =
      entity;

    log.entityId =
      entityId;

    log.payload =
      mapper.writeValueAsString(
        payload
      );

    auditLogs.save(log);
  }

  private String resolveActor(
    String authHeader
  ) {

    try {

      if (
        authHeader != null &&
        authHeader.startsWith("Bearer ")
      ) {

        return jwtUtil.extractEmail(
          authHeader.substring(7)
        );
      }

    } catch (Exception ignored) {
    }

    return "system";
  }

  @SuppressWarnings("unchecked")
  private Map<String, Object> parseData(
    String json
  ) {

    try {

      return mapper.readValue(
        json,
        Map.class
      );

    } catch (Exception e) {

      return Map.of(
        "data",
        json
      );
    }
  }

  private Map<String, Object> enrichWithId(
    Map<String, Object> data,
    String id
  ) {

    if (data.containsKey("id")) {
      return data;
    }

    Map<String, Object> result =
      new LinkedHashMap<>();

    result.put(
      "id",
      id
    );

    result.putAll(data);

    return result;
  }

  private int clamp(
    int limit
  ) {

    return Math.min(
      Math.max(limit, 1),
      100
    );
  }

  private String nvl(
    String s
  ) {

    return s == null
      ? ""
      : s;
  }
}