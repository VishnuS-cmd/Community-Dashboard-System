# Module Description

Community Dashboard Management System is divided into modules so each part of the system has a clear responsibility.

## Core Modules

- Dashboard: Shows Community Beneficiaries, Community Volunteers, Community Donations, Community Requests, and Community Campaigns statistics, insight panels, and domain workflow status.
- Community Beneficiaries: Manages community beneficiaries with community beneficiary code, community beneficiary name, community category, ngo & community management owner, community beneficiary status, community beneficiary code, community need type, community location.
- Community Volunteers: Manages community volunteers with community volunteer code, community volunteer name, community category, ngo & community management owner, community volunteer status, community volunteer code, community skill, community availability.
- Community Donations: Manages community donations with community donation code, community donation name, community category, ngo & community management owner, community donation status, community donation number, community donor name, community amount.
- Community Requests: Manages community requests with community request code, community request name, community category, ngo & community management owner, community request status, community request number, community request type, community priority.
- Community Campaigns: Manages community campaigns with community campaign code, community campaign name, community category, ngo & community management owner, community campaign status, community campaign code, community target amount, community impact count.
- Register Volunteer: Supports workflow steps such as Capture Profile, Verify Availability, Assign Campaign, Activate Volunteer.
- Record Donation: Supports workflow steps such as Add Donor, Capture Amount, Issue Receipt, Update Fund.
- Resolve Community Request: Supports workflow steps such as Review Request, Assign Volunteer, Deliver Support, Close Request.
- Reports: Provides summary views for Community Beneficiaries, Community Volunteers, Community Donations, Community Requests, and Community Campaigns and configured workflows.
- Audit Trail: Tracks important actions performed in the system.

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

## Dashboard Statistics

- Active Volunteers
- Total Donations
- Open Requests
- Running Campaigns

## Unique Domain Features

- Register Volunteer: Register Volunteer for community dashboard with clear steps, ownership, and audit-ready status updates.
- Record Donation: Record Donation for community dashboard with clear steps, ownership, and audit-ready status updates.
- Resolve Community Request: Resolve Community Request for community dashboard with clear steps, ownership, and audit-ready status updates.

## Seed Data Theme

- Primary Data: domain records with code, title, description, and status
- People / Owners: staff users and administrators
- Workflows: Register Volunteer, Record Donation, Resolve Community Request
