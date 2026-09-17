# Test Cases

| Test Case ID | Scenario | Steps | Expected Result |
| --- | --- | --- | --- |
| TC-001 | Admin login | Enter valid demo credentials and submit | Dashboard opens successfully |
| TC-002 | Invalid login | Enter wrong password and submit | Error message is displayed |
| TC-003 | View dashboard | Login and open dashboard | Statistics for Active Volunteers, Total Donations, Open Requests, and Running Campaigns are shown |
| TC-004 | Create CommunityBeneficiary | Open Community Beneficiaries page and submit valid form | New CommunityBeneficiary entry is created |
| TC-005 | Edit record | Update an existing Community Beneficiaries item | Updated values are saved |
| TC-006 | Delete record | Delete an existing item after confirmation | Item is removed or marked inactive |
| TC-007 | Search Community Beneficiaries | Search by domain fields | Matching Community Beneficiaries are displayed |
| TC-008 | View reports | Open reports page | Summary report loads correctly |
| TC-009 | Swagger check | Open `/api/docs` | Swagger documentation is visible |
| TC-010 | Health check | Call `/api/health` | API returns healthy status |

## Domain-Specific Test Focus

The tester should verify that seed data correctly represents domain records with code, title, description, and status, staff users and administrators, and Register Volunteer, Record Donation, Resolve Community Request.
