# Synopsis

## Project Title

Community Dashboard Management System

## Project Category

Management

## Synopsis

Community Dashboard Management System is a web-based management system designed to help users manage Community Beneficiaries, Community Volunteers, Community Donations, Community Requests, and Community Campaigns through a secure dashboard, structured CRUD workflows, reports, and audit history.

The project uses the Student Project Factory management template and adapts it for the community dashboard domain. It includes domain-specific modules, sample seed data, dashboard statistics, API documentation, and demo credentials so students can run and explain the project confidently.

## Main Features

- Register Volunteer: Register Volunteer for community dashboard with clear steps, ownership, and audit-ready status updates.
- Record Donation: Record Donation for community dashboard with clear steps, ownership, and audit-ready status updates.
- Resolve Community Request: Resolve Community Request for community dashboard with clear steps, ownership, and audit-ready status updates.

## Main Modules

- Dashboard
- Community Beneficiaries
- Community Volunteers
- Community Donations
- Community Requests
- Community Campaigns
- Register Volunteer
- Record Donation
- Resolve Community Request
- Reports
- Audit Trail

## Technology Stack

- Frontend: React + Tailwind
- Backend: Spring Boot
- Database: MySQL
- API Docs: Swagger
- Runtime: Docker Compose

## Domain Entities

- Community Beneficiaries: Community Beneficiary Code, Community Beneficiary Name, Community Category, NGO & Community Management Owner, Community Beneficiary Status, Community Beneficiary Code, Community Need Type, Community Location
- Community Volunteers: Community Volunteer Code, Community Volunteer Name, Community Category, NGO & Community Management Owner, Community Volunteer Status, Community Volunteer Code, Community Skill, Community Availability
- Community Donations: Community Donation Code, Community Donation Name, Community Category, NGO & Community Management Owner, Community Donation Status, Community Donation Number, Community Donor Name, Community Amount
- Community Requests: Community Request Code, Community Request Name, Community Category, NGO & Community Management Owner, Community Request Status, Community Request Number, Community Request Type, Community Priority
- Community Campaigns: Community Campaign Code, Community Campaign Name, Community Category, NGO & Community Management Owner, Community Campaign Status, Community Campaign Code, Community Target Amount, Community Impact Count

## Domain Workflows

- Register Volunteer: Capture Profile -> Verify Availability -> Assign Campaign -> Activate Volunteer
- Record Donation: Add Donor -> Capture Amount -> Issue Receipt -> Update Fund
- Resolve Community Request: Review Request -> Assign Volunteer -> Deliver Support -> Close Request

## Demo Access

```txt
Email: admin@example.com
Password: Admin@123
```
