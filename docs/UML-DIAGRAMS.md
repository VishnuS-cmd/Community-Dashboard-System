# UML Diagrams

## Use Case Diagram

```mermaid
flowchart LR
  Admin((Admin))
  Staff((Staff))
  Viewer((Viewer))

  Login[Login]
  Dashboard[View Dashboard]
  ManagePrimary[Manage Community Beneficiaries]
  ManageWorkflow[Run Register Volunteer]
  Reports[View Reports]
  Audit[View Audit Log]

  Admin --> Login
  Staff --> Login
  Viewer --> Login
  Admin --> Dashboard
  Staff --> Dashboard
  Viewer --> Dashboard
  Admin --> ManagePrimary
  Staff --> ManagePrimary
  Admin --> ManageWorkflow
  Staff --> ManageWorkflow
  Admin --> Reports
  Viewer --> Reports
  Admin --> Audit
```

## Class Diagram

```mermaid
classDiagram
  class User {
    +id
    +name
    +email
    +role
  }
  class DomainItem {
    +id
    +entityName
    +payload
    +status
  }
  class AuditLog {
    +id
    +action
    +entity
    +createdAt
  }

  User "1" --> "*" DomainItem
  DomainItem "1" --> "*" AuditLog
  User "1" --> "*" AuditLog
```

## Sequence Diagram

```mermaid
sequenceDiagram
  actor Admin
  participant UI as Frontend
  participant API as Backend API
  participant DB as MySQL

  Admin->>UI: Submit login
  UI->>API: POST /api/auth/login
  API->>DB: Verify user
  DB-->>API: User found
  API-->>UI: JWT token
  Admin->>UI: Create Community Beneficiaries
  UI->>API: POST /api/domain/CommunityBeneficiary
  API->>DB: Save CommunityBeneficiary
  API-->>UI: Created response
```
