# API Documentation

The backend exposes REST APIs for Community Dashboard Management System. Swagger documentation is available at:

```txt
http://localhost:18080/api/docs
```

## Authentication

| Method | Endpoint | Purpose |
| --- | --- | --- |
| POST | `/api/auth/login` | Login and receive an access token |

## Common APIs

| Method | Endpoint | Purpose |
| --- | --- | --- |
| GET | `/api/health` | Check backend health |
| GET | `/api/dashboard/stats` | Fetch dashboard statistics |
| GET | `/api/reports/summary` | View report summary |
| GET | `/api/audit-log` | View audit history |

## Domain APIs

| Method | Endpoint | Purpose |
| --- | --- | --- |
| GET | `/api/domain/CommunityBeneficiary` | List Community Beneficiaries |
| POST | `/api/domain/CommunityBeneficiary` | Create Community Beneficiaries entry |
| GET | `/api/domain/CommunityVolunteer` | List Community Volunteers |
| POST | `/api/domain/CommunityVolunteer` | Create Community Volunteers entry |
| GET | `/api/domain/CommunityDonation` | List Community Donations |
| POST | `/api/domain/CommunityDonation` | Create Community Donations entry |
| GET | `/api/domain/CommunityRequest` | List Community Requests |
| POST | `/api/domain/CommunityRequest` | Create Community Requests entry |
| GET | `/api/domain/CommunityCampaign` | List Community Campaigns |
| POST | `/api/domain/CommunityCampaign` | Create Community Campaigns entry |

## Demo Login

```json
{
  "email": "admin@example.com",
  "password": "Admin@123"
}
```
