# Community Dashboard Management System

`Community Dashboard Management System` is a ready-to-run student project generated from the `management` template. It includes frontend, backend, database, Docker setup, Swagger API docs, demo login, seed data, screenshots, viva questions, project report content, and presentation material.

Project Category: `Web Application`.

This project can be used as a minor project or upgraded into a final-year major/enterprise project with custom modules, new UI, advanced reports, role permissions, payment/export modules, and complete college submission documentation.

## Features

- React + Tailwind frontend with protected dashboard
- Spring Boot backend REST API
- MySQL database
- Docker Compose run system
- Swagger API documentation
- Demo admin login
- CRUD modules
- Dashboard statistics
- Reports and CSV export
- Audit log
- Seed data
- Student documentation pack
- Browser-tested demo screenshots
- Upgrade-ready custom UI design

## Project Modules

`Community Beneficiaries, Community Volunteers, Community Donations, Community Requests, Community Campaigns`

## Tech Stack

- Frontend: React + Tailwind
- Backend: Spring Boot
- Database: MySQL
- API Docs: Swagger
- Runtime: Docker Compose

## Demo Login

```txt
Email: admin@example.com
Password: Admin@123
```

## Run Locally

### Prerequisites

Install these tools first:

- Git
- Docker Desktop
- Node.js 20 or newer

### Steps

```bash
git clone <your-repo-url>
cd community-dashboard-management-system
cd backend
cp .env.example .env
docker compose up --build
```

Open:

```txt
Frontend: http://localhost:13000
Backend API: http://localhost:18080/api
Swagger Docs: http://localhost:18080/api/docs
Health Check: http://localhost:18080/api/health
```

Stop the project:

```bash
cd backend
docker compose down
```

Reset database and seed again:

```bash
cd backend
docker compose down -v
docker compose up --build
```

## Change Master Login Email And Password

Before the first run, edit:

```txt
backend/config/seed.json
```

Change this section:

```json
{
  "admin": {
    "email": "admin@example.com",
    "password": "Admin@123",
    "displayName": "System Admin",
    "role": "admin"
  }
}
```

Then run:

```bash
cd backend
docker compose up --build
```

If you already ran the project once, reset the database so the new admin user is seeded:

```bash
cd backend
docker compose down -v
docker compose up --build
```

## Student Submission Docs

Generated documentation is available in:

```txt
docs/
```

Important files:

- `SYNOPSIS.md`
- `ABSTRACT.md`
- `PROJECT-REPORT.md`
- `MAJOR-PROJECT.md`
- `PRESENTATION-CONTENT.md`
- `PRESENTATION.pptx`
- `VIVA-QUESTIONS.md`
- `TEST-CASES.md`
- `ER-DIAGRAM.md`
- `UML-DIAGRAMS.md`
- `SCREENSHOTS-CHECKLIST.md`
- `screenshots/`
- `diagrams/`

## Screenshots

Demo screenshots are stored in:

```txt
docs/screenshots/
```

Typical screenshots include login page, dashboard, list pages, forms, reports, audit log, and Swagger docs.

## Promotional Upgrade Options

Want this project upgraded so it does not look like a common downloaded project?

Available upgrades:

- Convert minor project to major project
- Convert major project to enterprise-level project
- Change complete UI theme and layout
- Add unique vector images based on your project topic
- Make the project look fresh and different from common downloaded projects
- Add project-specific modules
- Add advanced dashboard analytics
- Add role-based permissions
- Add PDF/Excel export
- Add payment, email, SMS, or notification modules
- Add custom report, synopsis, PPT, viva, and screenshots
- Prepare a complete college submission package

## Contact And Community

For upgrades and customization, contact CSEProjects360:

```txt
WhatsApp: +91 78914 45668
Website: CSEProjects360
```

[Send WhatsApp Message](https://wa.me/917891445668?text=Hello%2C%20I%20want%20to%20upgrade%20my%20student%20project%20with%20a%20unique%20design%20and%20major%20project%20features.)

[Visit CSEProjects360](https://cseprojects360.com)

Scan to message on WhatsApp:

[![WhatsApp QR Code](https://quickchart.io/qr?text=https%3A%2F%2Fwa.me%2F917891445668%3Ftext%3DHello%252C%2520I%2520want%2520to%2520upgrade%2520my%2520student%2520project%2520with%2520a%2520unique%2520design%2520and%2520major%2520project%2520features.&size=180)](https://wa.me/917891445668?text=Hello%2C%20I%20want%20to%20upgrade%20my%20student%20project%20with%20a%20unique%20design%20and%20major%20project%20features.)

Community links:

- WhatsApp Group: request the latest group invite on WhatsApp.
- WhatsApp Channel: request the latest channel link on WhatsApp.
- Telegram Group: request the latest group invite on WhatsApp.
- Telegram Channel: request the latest channel link on WhatsApp.

## Why Customize?

Many student projects look the same because they use the same template, same colors, same dashboard, and same module names. This project factory supports domain-specific modules, configurable design templates, vector illustrations, documentation, and screenshots so your project can look original and presentation-ready.

## Notes

- Change demo credentials before submission.
- Do not commit real API keys or production passwords.
- Use Docker Compose for the easiest local setup.
- If ports are busy, update `backend/.env` and run again.


## Domain-Specific Project Details

A student-ready community dashboard generated from the management template with domain modules, seed data, reports, Swagger docs, Docker support, screenshots, viva questions, PPT content, and submission documentation.

### Target Users

- NGO Admin
- Volunteer Coordinator
- Donor Manager
- Community Worker

### Domain Modules

- Community Beneficiaries: Community Beneficiary Code, Community Beneficiary Name, Community Category, NGO & Community Management Owner, Community Beneficiary Status, Community Beneficiary Code, Community Need Type, Community Location
- Community Volunteers: Community Volunteer Code, Community Volunteer Name, Community Category, NGO & Community Management Owner, Community Volunteer Status, Community Volunteer Code, Community Skill, Community Availability
- Community Donations: Community Donation Code, Community Donation Name, Community Category, NGO & Community Management Owner, Community Donation Status, Community Donation Number, Community Donor Name, Community Amount
- Community Requests: Community Request Code, Community Request Name, Community Category, NGO & Community Management Owner, Community Request Status, Community Request Number, Community Request Type, Community Priority
- Community Campaigns: Community Campaign Code, Community Campaign Name, Community Category, NGO & Community Management Owner, Community Campaign Status, Community Campaign Code, Community Target Amount, Community Impact Count

### Workflows

- Register Volunteer: Capture Profile -> Verify Availability -> Assign Campaign -> Activate Volunteer
- Record Donation: Add Donor -> Capture Amount -> Issue Receipt -> Update Fund
- Resolve Community Request: Review Request -> Assign Volunteer -> Deliver Support -> Close Request

### Demo Use Cases

- Manage community beneficiaries for Community Dashboard
- Track community volunteers and operational ownership
- Run register volunteer workflow
- Generate community reports and audit history

### Problem Statement

Community Dashboard needs a focused system for community beneficiaries, community volunteers, community donations, community requests, workflows, reports, and audit visibility instead of manual spreadsheets.

### Learning Outcomes

- Community Dashboard domain modelling
- NGO & Community Management CRUD and dashboard design
- Community workflow automation
- Student-ready documentation, screenshots, and Docker deployment
