# Viva Questions

## Basic Questions

### 1. What is Community Dashboard Management System?

Community Dashboard Management System is a web-based community dashboard management system for handling Community Beneficiaries, Community Volunteers, Community Donations, Community Requests, and Community Campaigns.

### 2. Why did you choose this project?

It solves common record keeping and reporting problems in the community dashboard domain.

### 3. Who are the users of the system?

The main users are admin, staff or operator, and viewer or report user.

### 4. What is the main objective?

The main objective is to digitize and simplify management of Community Beneficiaries, Community Volunteers, Community Donations, Community Requests, and Community Campaigns.

### 5. What are the main modules?

Dashboard, Community Beneficiaries, Community Volunteers, Community Donations, Community Requests, Community Campaigns, Register Volunteer, Record Donation, Resolve Community Request, Reports, Audit Trail.

### 6. What is the demo login?

The demo login is admin@example.com with password Admin@123.

### 7. What is a dashboard?

A dashboard shows important project statistics and recent activity in one place.

### 8. What is CRUD?

CRUD means create, read, update, and delete community beneficiaries and related domain data.

### 9. Why is seed data used?

Seed data helps demonstrate the project immediately after setup.

### 10. What is an audit log?

An audit log stores important user actions for tracking and review.

### 11. Why is this a major project?

It includes advanced workflows, analytics, auditability, documentation, validation, screenshots, and Docker deployment for community dashboard.

### 12. What is the major project category?

Final Year Major Project

### 13. How is configuration used in generation?

The generator uses domain configuration for modules, menu labels, workflows, seed scenarios, report ideas, and student documentation.

### 14. What problem does the project solve?

It reduces manual work for managing Community Beneficiaries, Community Volunteers, Community Donations, Community Requests, and Community Campaigns.

### 15. What is the project category?

Management

### 16. Is this project web-based?

Yes, it runs in a browser with a backend API and database.

### 17. Can a student explain this project in viva?

Yes, the project includes simple modules, diagrams, test cases, and viva answers.

### 18. What is the role of the admin?

The admin logs in, views the dashboard, manages community beneficiaries, and reviews reports.

### 19. What is the role of staff?

Staff users can operate daily record and transaction workflows.

### 20. What is the role of viewer?

A viewer can understand dashboard and report information.

### 21. Why are reports important?

Reports help summarize project data for decisions and demonstrations.

### 22. What is a module?

A module is a separate part of the system with a clear responsibility.

### 23. Why is documentation included?

Documentation helps with college submission, presentation, and viva preparation.

### 24. What is the main page after login?

The dashboard is the main page after login.

### 25. What does student-friendly UI mean?

It means the interface is simple, clean, and easy to explain.

## Technical Questions

### 1. Which frontend technology is used?

The frontend uses React + Tailwind.

### 2. Which backend technology is used?

The backend uses Spring Boot to expose REST APIs.

### 3. Which database is used?

MySQL is used for project data storage.

### 4. What is Swagger?

Swagger provides interactive API documentation for testing backend endpoints.

### 5. What is Docker Compose?

Docker Compose runs the frontend, backend, and database services together.

### 6. What is JWT authentication?

JWT authentication uses a signed token to identify a logged-in user.

### 7. Why use validation pipes?

Validation pipes check request data before it reaches business logic.

### 8. What is a REST API?

A REST API exposes resources through HTTP methods such as GET, POST, PATCH, and DELETE.

### 9. What is CORS?

CORS allows the browser frontend to call the backend API from a different port.

### 10. How is the health endpoint useful?

It confirms that the backend service is running correctly.

### 11. Why use React + Tailwind?

React + Tailwind provides the user interface for login, dashboard, pages, forms, and reports.

### 12. Why use Tailwind CSS?

Tailwind makes styling faster and consistent through utility classes.

### 13. Why use Spring Boot?

Spring Boot provides REST APIs, authentication, seed support, and Swagger documentation.

### 14. What is TypeScript?

TypeScript adds type checking to JavaScript for safer code.

### 15. What is an API client?

An API client is frontend code that calls backend endpoints.

### 16. What is protected routing?

Protected routing prevents unauthenticated users from opening private pages.

### 17. What is a controller?

A controller receives HTTP requests and returns API responses.

### 18. What is a service?

A service contains business logic used by controllers.

### 19. What is an entity?

An entity represents a database table in the backend code.

### 20. What is DTO?

A DTO defines the shape of data accepted by an API.

### 21. What is pagination?

Pagination splits large record lists into smaller pages.

### 22. What is search?

Search lets users filter community beneficiaries by configured domain fields.

### 23. What is a build command?

A build command checks and compiles the app for production use.

### 24. What is integration testing?

Integration testing checks that multiple parts work together.

### 25. What is browser testing?

Browser testing checks the real UI flow in a browser.

## Database Questions

### 1. What are the main data models?

The data model includes users, roles, audit logs, and domain collections for Community Beneficiaries, Community Volunteers, Community Donations, Community Requests, Community Campaigns. Key fields include Community Beneficiaries with Community Beneficiary Code, Community Beneficiary Name, Community Category, NGO & Community Management Owner, Community Beneficiary Status, Community Beneficiary Code, Community Need Type, Community Location; Community Volunteers with Community Volunteer Code, Community Volunteer Name, Community Category, NGO & Community Management Owner, Community Volunteer Status, Community Volunteer Code, Community Skill, Community Availability; Community Donations with Community Donation Code, Community Donation Name, Community Category, NGO & Community Management Owner, Community Donation Status, Community Donation Number, Community Donor Name, Community Amount; Community Requests with Community Request Code, Community Request Name, Community Category, NGO & Community Management Owner, Community Request Status, Community Request Number, Community Request Type, Community Priority; Community Campaigns with Community Campaign Code, Community Campaign Name, Community Category, NGO & Community Management Owner, Community Campaign Status, Community Campaign Code, Community Target Amount, Community Impact Count.

### 2. What does the CommunityBeneficiary data represent?

It represents domain records with code, title, description, and status.

### 3. What does the Register Volunteer workflow represent?

It represents Register Volunteer, Record Donation, Resolve Community Request.

### 4. Why use MySQL?

MySQL is suitable for this generated project and supported by the Docker run system.

### 5. What is a primary key?

A primary key uniquely identifies each row in a table.

### 6. What is a foreign key?

A foreign key links one table to another table.

### 7. What is database migration?

Migration creates or updates database tables based on the application model.

### 8. What is database seeding?

Seeding inserts initial sample data for testing and demonstration.

### 9. How are reports generated?

Reports summarize Community Beneficiaries, Community Volunteers, Community Donations, Community Requests, and Community Campaigns and Register Volunteer activity through backend APIs.

### 10. How is data protected?

Access is protected using login authentication and backend validation.

### 11. What type of database is MySQL?

MySQL stores generated project data for local demonstration.

### 12. Why is structured data useful here?

It helps organize users, Community Beneficiaries, Community Volunteers, Community Donations, Community Requests, and Community Campaigns, workflows, and logs.

### 13. What is a table?

A table stores rows of related data.

### 14. What is a row?

A row is one record in a database table.

### 15. What is a column?

A column stores one type of value for each row.

### 16. What is indexing?

Indexing helps the database search data faster.

### 17. What is normalization?

Normalization organizes data to reduce duplication.

### 18. What is a transaction in database terms?

A transaction is a safe group of database operations.

### 19. Why store audit logs?

Audit logs help trace who performed important actions.

### 20. What data is seeded first?

Admin user, roles, and domain data for Community Beneficiaries, Community Volunteers, Community Donations, Community Requests, and Community Campaigns are seeded.

### 21. How are passwords stored?

Passwords should be stored using hashing, not plain text.

### 22. What is data integrity?

Data integrity means community beneficiaries and related workflow entries remain correct and consistent.

### 23. Can MySQL run with Docker?

Yes, the project run system configures MySQL through Docker or local backend configuration.

### 24. How can database data be reset?

The Docker volume can be removed and migrations/seeds can be run again.

### 25. What is a one-to-many relationship?

One row in a table can be connected to many rows in another table.

## Project-Specific Questions

### 1. What are the main entities in Community Dashboard Management System?

Community Beneficiaries, Community Volunteers, Community Donations, Community Requests, Community Campaigns.

### 2. What does Community Beneficiaries management do?

It allows users to create, view, update, search, and track Community Beneficiaries.

### 3. What dashboard stats are shown?

Active Volunteers, Total Donations, Open Requests, Running Campaigns.

### 4. What unique features are included?

Register Volunteer: Register Volunteer for community dashboard with clear steps, ownership, and audit-ready status updates., Record Donation: Record Donation for community dashboard with clear steps, ownership, and audit-ready status updates., Resolve Community Request: Resolve Community Request for community dashboard with clear steps, ownership, and audit-ready status updates..

### 5. How does this project help the domain?

It centralizes Community Beneficiaries, Community Volunteers, Community Donations, Community Requests, and Community Campaigns and improves searching, reporting, and tracking.

### 6. What screenshots are included?

Screenshots include Login Page, Dashboard, Community Beneficiaries, Community Volunteers, Community Donations, Community Requests, Community Campaigns, Register Volunteer, Record Donation, Resolve Community Request, Reports, Audit Trail, Swagger Api Docs.

### 7. What documentation is included?

Synopsis, abstract, problem statement, requirements, diagrams, API docs, test cases, viva questions, and presentation content are included.

### 8. What makes this project student-ready?

It includes working code, tests, Docker setup, docs, screenshots, and demo credentials.

### 9. Can the project be customized?

Yes, modules, seed data, names, and documentation can be generated from variant configuration.

### 10. What is the future scope?

Role permissions, exports, notifications, file uploads, analytics, and mobile support can be added.

### 11. What is the primary entity?

Community Beneficiaries

### 12. What is the transaction entity?

Register Volunteer

### 13. How is the dashboard domain-specific?

It shows statistics such as Active Volunteers, Total Donations, Open Requests, Running Campaigns.

### 14. How is seed data domain-specific?

It is based on domain records with code, title, description, and status, staff users and administrators, and Register Volunteer, Record Donation, Resolve Community Request.

### 15. What does the reports page show?

It shows summaries that help understand project activity.

### 16. What does the audit page show?

It shows important actions performed in the system.

### 17. How are categories used?

Categories group similar community beneficiaries for better organization.

### 18. How are departments used?

Departments identify ownership or responsibility areas.

### 19. How is Register Volunteer used?

Register Volunteer represents Register Volunteer, Record Donation, Resolve Community Request.

### 20. What is the best demo flow?

Login, show dashboard, open Community Beneficiaries, run Register Volunteer, view reports, then show Swagger.

### 21. What should be explained in presentation?

Problem, objectives, modules, architecture, database, testing, screenshots, and conclusion.

### 22. What is the learning outcome?

Students learn full-stack development, database design, testing, Docker, and documentation.

### 23. Can modules be renamed?

Yes, the variant configuration can define domain-specific module names.

### 24. Why include screenshots?

Screenshots prove the project runs and help complete the submission report.

### 25. Why include diagrams?

Diagrams make architecture, database, and workflows easier to explain.

## Deployment Questions

### 1. How do you run the project?

Run docker compose up --build inside the backend folder.

### 2. What is the frontend URL?

http://localhost:13000

### 3. What is the backend URL?

http://localhost:18080/api

### 4. What is the Swagger URL?

http://localhost:18080/api/docs

### 5. What is the health URL?

http://localhost:18080/api/health

### 6. Which services run in Docker?

Frontend, backend, and MySQL run as Docker Compose services.

### 7. What file stores environment variables?

backend/.env stores the local environment variables.

### 8. Why is backend/.env.example included?

It shows required configuration without exposing private environment values.

### 9. How can you validate the project?

Run npm run validate:project -- community-dashboard-management-system from the factory root.

### 10. How can screenshots be regenerated?

Run node scripts/capture-screenshots.mjs community-dashboard-management-system after starting the project.

### 11. What command starts Docker?

cd backend && docker compose up --build

### 12. What command stops Docker?

cd backend && docker compose down --remove-orphans

### 13. Which port does the frontend use?

The frontend uses port 13000 on localhost.

### 14. Which port does the backend use?

The backend uses port 18080 on localhost.

### 15. Which port does MySQL expose?

The database host port is configured in backend/.env as DB_HOST_PORT when the selected database needs a server port.

### 16. What is a container?

A container packages an application service with its runtime environment.

### 17. What is an image?

An image is the build template used to start a container.

### 18. Why use health checks?

Health checks confirm that services are ready before testing.

### 19. How is Swagger tested?

The automation opens the Swagger endpoint and browser screenshot.

### 20. How is login tested?

The validation script sends demo credentials to the login API.

### 21. How is CRUD tested?

The validation script creates and reads a sample category record.

### 22. How is frontend tested?

The frontend build and browser smoke test are run.

### 23. How is backend tested?

The backend build, health endpoint, Swagger, login, and CRUD APIs are checked.

### 24. Where are generated screenshots stored?

They are stored in projects/community-dashboard-management-system/docs/screenshots.

### 25. What is the one-command readiness script?

npm run project:ready -- community-dashboard-management-system --template management
