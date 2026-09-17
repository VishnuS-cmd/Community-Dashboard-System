export const projectConfig: any = {
  "projectName": "community-dashboard-management-system",
  "displayName": "Community Dashboard",
  "shortDescription": "Community Dashboard for ngo & community workflows, dashboard tracking, domain records, reports, and audit history.",
  "longDescription": "A student-ready community dashboard generated from the management template with domain modules, seed data, reports, Swagger docs, Docker support, screenshots, viva questions, PPT content, and submission documentation.",
  "targetUsers": [
    "NGO Admin",
    "Volunteer Coordinator",
    "Donor Manager",
    "Community Worker"
  ],
  "useCases": [
    "Manage community beneficiaries for Community Dashboard",
    "Track community volunteers and operational ownership",
    "Run register volunteer workflow",
    "Generate community reports and audit history"
  ],
  "projectCategory": "web",
  "projectCategoryName": "Web Application",
  "category": "Management",
  "layoutVariant": "topbar-analytics",
  "visualIdentity": {
    "icon": "HeartHandshake",
    "heroTitle": "Community Dashboard Workspace",
    "heroSubtitle": "Community Dashboard workspace for community beneficiaries, community volunteers, community donations, community requests, guided workflows, reports, and audit history.",
    "vectorTitle": "Community Dashboard vector dashboard",
    "vectorMotifs": [
      "Community Beneficiaries",
      "Community Volunteers",
      "Community Donations",
      "Community Requests",
      "Community Campaigns"
    ],
    "badge": "Community Major Project",
    "vectorStyle": "ngo-community-dashboard"
  },
  "sidebarGroups": [
    {
      "group": "Community Operations",
      "items": [
        {
          "label": "Dashboard",
          "icon": "HeartHandshake",
          "route": "/dashboard",
          "roles": [
            "admin",
            "operator"
          ],
          "order": 1
        },
        {
          "label": "Community Beneficiaries",
          "icon": "UsersRound",
          "route": "/community-beneficiaries",
          "roles": [
            "admin",
            "operator"
          ],
          "order": 2
        },
        {
          "label": "Community Volunteers",
          "icon": "UserRoundCheck",
          "route": "/community-volunteers",
          "roles": [
            "admin",
            "operator"
          ],
          "order": 3
        },
        {
          "label": "Community Donations",
          "icon": "HandCoins",
          "route": "/community-donations",
          "roles": [
            "admin",
            "operator"
          ],
          "order": 4
        },
        {
          "label": "Community Requests",
          "icon": "MessageSquareWarning",
          "route": "/community-requests",
          "roles": [
            "admin",
            "operator"
          ],
          "order": 5
        },
        {
          "label": "Community Campaigns",
          "icon": "Megaphone",
          "route": "/community-campaigns",
          "roles": [
            "admin",
            "operator"
          ],
          "order": 6
        },
        {
          "label": "Register Volunteer",
          "icon": "HelpingHand",
          "route": "/community-workflows/register-volunteer",
          "roles": [
            "admin",
            "operator"
          ],
          "order": 7
        },
        {
          "label": "Record Donation",
          "icon": "HelpingHand",
          "route": "/community-workflows/record-donation",
          "roles": [
            "admin",
            "operator"
          ],
          "order": 8
        },
        {
          "label": "Resolve Community Request",
          "icon": "HelpingHand",
          "route": "/community-workflows/resolve-community-request",
          "roles": [
            "admin",
            "operator"
          ],
          "order": 9
        },
        {
          "label": "Reports",
          "icon": "FileText",
          "route": "/reports",
          "roles": [
            "admin"
          ],
          "order": 10
        },
        {
          "label": "Audit Trail",
          "icon": "History",
          "route": "/audit-logs",
          "roles": [
            "admin"
          ],
          "order": 11
        }
      ]
    }
  ],
  "entities": [
    {
      "name": "CommunityBeneficiary",
      "plural": "Community Beneficiaries",
      "route": "/community-beneficiaries",
      "icon": "UsersRound",
      "fields": [
        {
          "name": "beneficiaryCode",
          "label": "Community Beneficiary Code",
          "type": "string",
          "required": true,
          "table": true,
          "form": true,
          "unique": true
        },
        {
          "name": "name",
          "label": "Community Beneficiary Name",
          "type": "string",
          "required": true,
          "table": true,
          "form": true
        },
        {
          "name": "category",
          "label": "Community Category",
          "type": "string",
          "required": true,
          "table": true,
          "form": true
        },
        {
          "name": "ownerName",
          "label": "NGO & Community Management Owner",
          "type": "string",
          "required": true,
          "table": true,
          "form": true
        },
        {
          "name": "status",
          "label": "Community Beneficiary Status",
          "type": "select",
          "required": true,
          "table": true,
          "form": true,
          "options": [
            "Active",
            "Pending Review",
            "Approved",
            "Closed"
          ]
        },
        {
          "name": "beneficiaryCode",
          "label": "Community Beneficiary Code",
          "type": "string",
          "required": true,
          "table": true,
          "form": true
        },
        {
          "name": "needType",
          "label": "Community Need Type",
          "type": "select",
          "required": true,
          "table": true,
          "form": true,
          "options": [
            "Active",
            "Pending",
            "Approved",
            "Closed"
          ]
        },
        {
          "name": "location",
          "label": "Community Location",
          "type": "string",
          "required": true,
          "table": true,
          "form": true
        }
      ],
      "relationships": [],
      "page": {
        "title": "Community Beneficiaries",
        "createAction": "Add Community Beneficiary",
        "intro": "Community Dashboard uses community beneficiaries to handle community operations with domain-specific tracking.",
        "searchPlaceholder": "Search community beneficiaries by code, name, category, owner, or status...",
        "emptyState": "No community beneficiaries have been added yet.",
        "successMessage": "Community Beneficiary saved successfully.",
        "validationMessage": "Please enter valid community beneficiaries details."
      },
      "seed": [
        {
          "beneficiaryCode": "CB-2026-0001",
          "name": "Aarav Sharma",
          "category": "Community Operations",
          "ownerName": "Aarav Sharma",
          "status": "Active",
          "needType": "Community Operations",
          "location": "Pune",
          "title": "Community Donation Request"
        },
        {
          "beneficiaryCode": "CB-2026-0002",
          "name": "Diya Patel",
          "category": "Community Service",
          "ownerName": "Diya Patel",
          "status": "Pending Review",
          "needType": "Community Service",
          "location": "Mumbai",
          "title": "Community Community Complaint"
        },
        {
          "beneficiaryCode": "CB-2026-0003",
          "name": "Rohan Mehta",
          "category": "Community Review",
          "ownerName": "Rohan Mehta",
          "status": "Approved",
          "needType": "Community Review",
          "location": "Bengaluru",
          "title": "Community Awareness Campaign"
        },
        {
          "beneficiaryCode": "CB-2026-0004",
          "name": "Ananya Rao",
          "category": "Community Support",
          "ownerName": "Ananya Rao",
          "status": "In Progress",
          "needType": "Community Support",
          "location": "Hyderabad",
          "title": "Community Volunteer Drive"
        },
        {
          "beneficiaryCode": "CB-2026-0005",
          "name": "Kabir Singh",
          "category": "Community Operations",
          "ownerName": "Kabir Singh",
          "status": "Closed",
          "needType": "Community Operations",
          "location": "Ahmedabad",
          "title": "Community Donation Request"
        },
        {
          "beneficiaryCode": "CB-2026-0006",
          "name": "Isha Nair",
          "category": "Community Service",
          "ownerName": "Isha Nair",
          "status": "Escalated",
          "needType": "Community Service",
          "location": "Jaipur",
          "title": "Community Community Complaint"
        },
        {
          "beneficiaryCode": "CB-2026-0007",
          "name": "Arjun Verma",
          "category": "Community Review",
          "ownerName": "Arjun Verma",
          "status": "Active",
          "needType": "Community Review",
          "location": "Chennai",
          "title": "Community Awareness Campaign"
        },
        {
          "beneficiaryCode": "CB-2026-0008",
          "name": "Meera Iyer",
          "category": "Community Support",
          "ownerName": "Meera Iyer",
          "status": "Pending Review",
          "needType": "Community Support",
          "location": "Kochi",
          "title": "Community Volunteer Drive"
        },
        {
          "beneficiaryCode": "CB-2026-0009",
          "name": "Vivaan Joshi",
          "category": "Community Operations",
          "ownerName": "Vivaan Joshi",
          "status": "Approved",
          "needType": "Community Operations",
          "location": "Indore",
          "title": "Community Donation Request"
        },
        {
          "beneficiaryCode": "CB-2026-0010",
          "name": "Sara Khan",
          "category": "Community Service",
          "ownerName": "Sara Khan",
          "status": "In Progress",
          "needType": "Community Service",
          "location": "Lucknow",
          "title": "Community Community Complaint"
        }
      ]
    },
    {
      "name": "CommunityVolunteer",
      "plural": "Community Volunteers",
      "route": "/community-volunteers",
      "icon": "UserRoundCheck",
      "fields": [
        {
          "name": "volunteerCode",
          "label": "Community Volunteer Code",
          "type": "string",
          "required": true,
          "table": true,
          "form": true,
          "unique": true
        },
        {
          "name": "name",
          "label": "Community Volunteer Name",
          "type": "string",
          "required": true,
          "table": true,
          "form": true
        },
        {
          "name": "category",
          "label": "Community Category",
          "type": "string",
          "required": true,
          "table": true,
          "form": true
        },
        {
          "name": "ownerName",
          "label": "NGO & Community Management Owner",
          "type": "string",
          "required": true,
          "table": true,
          "form": true
        },
        {
          "name": "status",
          "label": "Community Volunteer Status",
          "type": "select",
          "required": true,
          "table": true,
          "form": true,
          "options": [
            "Active",
            "Pending Review",
            "Approved",
            "Closed"
          ]
        },
        {
          "name": "volunteerCode",
          "label": "Community Volunteer Code",
          "type": "string",
          "required": true,
          "table": true,
          "form": true
        },
        {
          "name": "skill",
          "label": "Community Skill",
          "type": "string",
          "required": true,
          "table": true,
          "form": true
        },
        {
          "name": "availability",
          "label": "Community Availability",
          "type": "select",
          "required": true,
          "table": true,
          "form": true,
          "options": [
            "Active",
            "Pending",
            "Approved",
            "Closed"
          ]
        }
      ],
      "relationships": [],
      "page": {
        "title": "Community Volunteers",
        "createAction": "Manage Community Volunteer",
        "intro": "Community Dashboard uses community volunteers to handle community operations with domain-specific tracking.",
        "searchPlaceholder": "Search community volunteers by code, name, category, owner, or status...",
        "emptyState": "No community volunteers have been added yet.",
        "successMessage": "Community Volunteer saved successfully.",
        "validationMessage": "Please enter valid community volunteers details."
      },
      "seed": [
        {
          "volunteerCode": "CV-2026-0001",
          "name": "Aarav Sharma",
          "category": "Community Operations",
          "ownerName": "Aarav Sharma",
          "status": "Active",
          "skill": "Northstar Operations Community Volunteer 1",
          "availability": "Active",
          "title": "Community Donation Request"
        },
        {
          "volunteerCode": "CV-2026-0002",
          "name": "Diya Patel",
          "category": "Community Service",
          "ownerName": "Diya Patel",
          "status": "Pending Review",
          "skill": "Greenfield Services Community Volunteer 2",
          "availability": "Pending Review",
          "title": "Community Community Complaint"
        },
        {
          "volunteerCode": "CV-2026-0003",
          "name": "Rohan Mehta",
          "category": "Community Review",
          "ownerName": "Rohan Mehta",
          "status": "Approved",
          "skill": "BluePeak Solutions Community Volunteer 3",
          "availability": "Approved",
          "title": "Community Awareness Campaign"
        },
        {
          "volunteerCode": "CV-2026-0004",
          "name": "Ananya Rao",
          "category": "Community Support",
          "ownerName": "Ananya Rao",
          "status": "In Progress",
          "skill": "MetroCare Group Community Volunteer 4",
          "availability": "In Progress",
          "title": "Community Volunteer Drive"
        },
        {
          "volunteerCode": "CV-2026-0005",
          "name": "Kabir Singh",
          "category": "Community Operations",
          "ownerName": "Kabir Singh",
          "status": "Closed",
          "skill": "Sunrise Associates Community Volunteer 5",
          "availability": "Closed",
          "title": "Community Donation Request"
        },
        {
          "volunteerCode": "CV-2026-0006",
          "name": "Isha Nair",
          "category": "Community Service",
          "ownerName": "Isha Nair",
          "status": "Escalated",
          "skill": "Vertex Admin Office Community Volunteer 6",
          "availability": "Escalated",
          "title": "Community Community Complaint"
        }
      ]
    },
    {
      "name": "CommunityDonation",
      "plural": "Community Donations",
      "route": "/community-donations",
      "icon": "HandCoins",
      "fields": [
        {
          "name": "donationCode",
          "label": "Community Donation Code",
          "type": "string",
          "required": true,
          "table": true,
          "form": true,
          "unique": true
        },
        {
          "name": "name",
          "label": "Community Donation Name",
          "type": "string",
          "required": true,
          "table": true,
          "form": true
        },
        {
          "name": "category",
          "label": "Community Category",
          "type": "string",
          "required": true,
          "table": true,
          "form": true
        },
        {
          "name": "ownerName",
          "label": "NGO & Community Management Owner",
          "type": "string",
          "required": true,
          "table": true,
          "form": true
        },
        {
          "name": "status",
          "label": "Community Donation Status",
          "type": "select",
          "required": true,
          "table": true,
          "form": true,
          "options": [
            "Active",
            "Pending Review",
            "Approved",
            "Closed"
          ]
        },
        {
          "name": "donationNo",
          "label": "Community Donation Number",
          "type": "string",
          "required": true,
          "table": true,
          "form": true
        },
        {
          "name": "donorName",
          "label": "Community Donor Name",
          "type": "string",
          "required": true,
          "table": true,
          "form": true
        },
        {
          "name": "amount",
          "label": "Community Amount",
          "type": "number",
          "required": true,
          "table": true,
          "form": true
        }
      ],
      "relationships": [],
      "page": {
        "title": "Community Donations",
        "createAction": "Manage Community Donation",
        "intro": "Community Dashboard uses community donations to handle community operations with domain-specific tracking.",
        "searchPlaceholder": "Search community donations by code, name, category, owner, or status...",
        "emptyState": "No community donations have been added yet.",
        "successMessage": "Community Donation saved successfully.",
        "validationMessage": "Please enter valid community donations details."
      },
      "seed": [
        {
          "donationCode": "CD-2026-0001",
          "name": "Aarav Sharma",
          "category": "Community Operations",
          "ownerName": "Aarav Sharma",
          "status": "Active",
          "donationNo": "CD-2026-0001",
          "donorName": "Aarav Sharma",
          "amount": 1250,
          "title": "Community Donation Request"
        },
        {
          "donationCode": "CD-2026-0002",
          "name": "Diya Patel",
          "category": "Community Service",
          "ownerName": "Diya Patel",
          "status": "Pending Review",
          "donationNo": "CD-2026-0002",
          "donorName": "Diya Patel",
          "amount": 2500,
          "title": "Community Community Complaint"
        },
        {
          "donationCode": "CD-2026-0003",
          "name": "Rohan Mehta",
          "category": "Community Review",
          "ownerName": "Rohan Mehta",
          "status": "Approved",
          "donationNo": "CD-2026-0003",
          "donorName": "Rohan Mehta",
          "amount": 3750,
          "title": "Community Awareness Campaign"
        },
        {
          "donationCode": "CD-2026-0004",
          "name": "Ananya Rao",
          "category": "Community Support",
          "ownerName": "Ananya Rao",
          "status": "In Progress",
          "donationNo": "CD-2026-0004",
          "donorName": "Ananya Rao",
          "amount": 5000,
          "title": "Community Volunteer Drive"
        },
        {
          "donationCode": "CD-2026-0005",
          "name": "Kabir Singh",
          "category": "Community Operations",
          "ownerName": "Kabir Singh",
          "status": "Closed",
          "donationNo": "CD-2026-0005",
          "donorName": "Kabir Singh",
          "amount": 6250,
          "title": "Community Donation Request"
        },
        {
          "donationCode": "CD-2026-0006",
          "name": "Isha Nair",
          "category": "Community Service",
          "ownerName": "Isha Nair",
          "status": "Escalated",
          "donationNo": "CD-2026-0006",
          "donorName": "Isha Nair",
          "amount": 7500,
          "title": "Community Community Complaint"
        }
      ]
    },
    {
      "name": "CommunityRequest",
      "plural": "Community Requests",
      "route": "/community-requests",
      "icon": "MessageSquareWarning",
      "fields": [
        {
          "name": "requestCode",
          "label": "Community Request Code",
          "type": "string",
          "required": true,
          "table": true,
          "form": true,
          "unique": true
        },
        {
          "name": "name",
          "label": "Community Request Name",
          "type": "string",
          "required": true,
          "table": true,
          "form": true
        },
        {
          "name": "category",
          "label": "Community Category",
          "type": "string",
          "required": true,
          "table": true,
          "form": true
        },
        {
          "name": "ownerName",
          "label": "NGO & Community Management Owner",
          "type": "string",
          "required": true,
          "table": true,
          "form": true
        },
        {
          "name": "status",
          "label": "Community Request Status",
          "type": "select",
          "required": true,
          "table": true,
          "form": true,
          "options": [
            "Active",
            "Pending Review",
            "Approved",
            "Closed"
          ]
        },
        {
          "name": "requestNo",
          "label": "Community Request Number",
          "type": "string",
          "required": true,
          "table": true,
          "form": true
        },
        {
          "name": "requestType",
          "label": "Community Request Type",
          "type": "select",
          "required": true,
          "table": true,
          "form": true,
          "options": [
            "Active",
            "Pending",
            "Approved",
            "Closed"
          ]
        },
        {
          "name": "priority",
          "label": "Community Priority",
          "type": "select",
          "required": true,
          "table": true,
          "form": true,
          "options": [
            "Active",
            "Pending",
            "Approved",
            "Closed"
          ]
        }
      ],
      "relationships": [],
      "page": {
        "title": "Community Requests",
        "createAction": "Manage Community Request",
        "intro": "Community Dashboard uses community requests to handle community operations with domain-specific tracking.",
        "searchPlaceholder": "Search community requests by code, name, category, owner, or status...",
        "emptyState": "No community requests have been added yet.",
        "successMessage": "Community Request saved successfully.",
        "validationMessage": "Please enter valid community requests details."
      },
      "seed": [
        {
          "requestCode": "CR-2026-0001",
          "name": "Aarav Sharma",
          "category": "Community Operations",
          "ownerName": "Aarav Sharma",
          "status": "Active",
          "requestNo": "CR-2026-0001",
          "requestType": "Community Operations",
          "priority": "High",
          "title": "Community Donation Request"
        },
        {
          "requestCode": "CR-2026-0002",
          "name": "Diya Patel",
          "category": "Community Service",
          "ownerName": "Diya Patel",
          "status": "Pending Review",
          "requestNo": "CR-2026-0002",
          "requestType": "Community Service",
          "priority": "Medium",
          "title": "Community Community Complaint"
        },
        {
          "requestCode": "CR-2026-0003",
          "name": "Rohan Mehta",
          "category": "Community Review",
          "ownerName": "Rohan Mehta",
          "status": "Approved",
          "requestNo": "CR-2026-0003",
          "requestType": "Community Review",
          "priority": "Low",
          "title": "Community Awareness Campaign"
        },
        {
          "requestCode": "CR-2026-0004",
          "name": "Ananya Rao",
          "category": "Community Support",
          "ownerName": "Ananya Rao",
          "status": "In Progress",
          "requestNo": "CR-2026-0004",
          "requestType": "Community Support",
          "priority": "Critical",
          "title": "Community Volunteer Drive"
        },
        {
          "requestCode": "CR-2026-0005",
          "name": "Kabir Singh",
          "category": "Community Operations",
          "ownerName": "Kabir Singh",
          "status": "Closed",
          "requestNo": "CR-2026-0005",
          "requestType": "Community Operations",
          "priority": "High",
          "title": "Community Donation Request"
        },
        {
          "requestCode": "CR-2026-0006",
          "name": "Isha Nair",
          "category": "Community Service",
          "ownerName": "Isha Nair",
          "status": "Escalated",
          "requestNo": "CR-2026-0006",
          "requestType": "Community Service",
          "priority": "Medium",
          "title": "Community Community Complaint"
        }
      ]
    },
    {
      "name": "CommunityCampaign",
      "plural": "Community Campaigns",
      "route": "/community-campaigns",
      "icon": "Megaphone",
      "fields": [
        {
          "name": "campaignCode",
          "label": "Community Campaign Code",
          "type": "string",
          "required": true,
          "table": true,
          "form": true,
          "unique": true
        },
        {
          "name": "name",
          "label": "Community Campaign Name",
          "type": "string",
          "required": true,
          "table": true,
          "form": true
        },
        {
          "name": "category",
          "label": "Community Category",
          "type": "string",
          "required": true,
          "table": true,
          "form": true
        },
        {
          "name": "ownerName",
          "label": "NGO & Community Management Owner",
          "type": "string",
          "required": true,
          "table": true,
          "form": true
        },
        {
          "name": "status",
          "label": "Community Campaign Status",
          "type": "select",
          "required": true,
          "table": true,
          "form": true,
          "options": [
            "Active",
            "Pending Review",
            "Approved",
            "Closed"
          ]
        },
        {
          "name": "campaignCode",
          "label": "Community Campaign Code",
          "type": "string",
          "required": true,
          "table": true,
          "form": true
        },
        {
          "name": "targetAmount",
          "label": "Community Target Amount",
          "type": "number",
          "required": true,
          "table": true,
          "form": true
        },
        {
          "name": "impactCount",
          "label": "Community Impact Count",
          "type": "number",
          "required": true,
          "table": true,
          "form": true
        }
      ],
      "relationships": [],
      "page": {
        "title": "Community Campaigns",
        "createAction": "Manage Community Campaign",
        "intro": "Community Dashboard uses community campaigns to handle community operations with domain-specific tracking.",
        "searchPlaceholder": "Search community campaigns by code, name, category, owner, or status...",
        "emptyState": "No community campaigns have been added yet.",
        "successMessage": "Community Campaign saved successfully.",
        "validationMessage": "Please enter valid community campaigns details."
      },
      "seed": [
        {
          "campaignCode": "CC-2026-0001",
          "name": "Aarav Sharma",
          "category": "Community Operations",
          "ownerName": "Aarav Sharma",
          "status": "Active",
          "targetAmount": 1250,
          "impactCount": 14,
          "title": "Community Donation Request"
        },
        {
          "campaignCode": "CC-2026-0002",
          "name": "Diya Patel",
          "category": "Community Service",
          "ownerName": "Diya Patel",
          "status": "Pending Review",
          "targetAmount": 2500,
          "impactCount": 21,
          "title": "Community Community Complaint"
        },
        {
          "campaignCode": "CC-2026-0003",
          "name": "Rohan Mehta",
          "category": "Community Review",
          "ownerName": "Rohan Mehta",
          "status": "Approved",
          "targetAmount": 3750,
          "impactCount": 28,
          "title": "Community Awareness Campaign"
        },
        {
          "campaignCode": "CC-2026-0004",
          "name": "Ananya Rao",
          "category": "Community Support",
          "ownerName": "Ananya Rao",
          "status": "In Progress",
          "targetAmount": 5000,
          "impactCount": 35,
          "title": "Community Volunteer Drive"
        },
        {
          "campaignCode": "CC-2026-0005",
          "name": "Kabir Singh",
          "category": "Community Operations",
          "ownerName": "Kabir Singh",
          "status": "Closed",
          "targetAmount": 6250,
          "impactCount": 42,
          "title": "Community Donation Request"
        },
        {
          "campaignCode": "CC-2026-0006",
          "name": "Isha Nair",
          "category": "Community Service",
          "ownerName": "Isha Nair",
          "status": "Escalated",
          "targetAmount": 7500,
          "impactCount": 49,
          "title": "Community Community Complaint"
        }
      ]
    }
  ],
  "workflows": [
    {
      "name": "RegisterVolunteer",
      "label": "Register Volunteer",
      "description": "Register Volunteer for community dashboard with clear steps, ownership, and audit-ready status updates.",
      "route": "/community-workflows/register-volunteer",
      "steps": [
        "Capture Profile",
        "Verify Availability",
        "Assign Campaign",
        "Activate Volunteer"
      ],
      "actions": [
        "Capture Profile",
        "Verify Availability",
        "Assign Campaign",
        "Activate Volunteer"
      ],
      "serviceMethod": "registerVolunteer",
      "pluginHook": "generateWorkflowActions"
    },
    {
      "name": "RecordDonation",
      "label": "Record Donation",
      "description": "Record Donation for community dashboard with clear steps, ownership, and audit-ready status updates.",
      "route": "/community-workflows/record-donation",
      "steps": [
        "Add Donor",
        "Capture Amount",
        "Issue Receipt",
        "Update Fund"
      ],
      "actions": [
        "Add Donor",
        "Capture Amount",
        "Issue Receipt",
        "Update Fund"
      ],
      "serviceMethod": "recordDonation",
      "pluginHook": "generateWorkflowActions"
    },
    {
      "name": "ResolveCommunityRequest",
      "label": "Resolve Community Request",
      "description": "Resolve Community Request for community dashboard with clear steps, ownership, and audit-ready status updates.",
      "route": "/community-workflows/resolve-community-request",
      "steps": [
        "Review Request",
        "Assign Volunteer",
        "Deliver Support",
        "Close Request"
      ],
      "actions": [
        "Review Request",
        "Assign Volunteer",
        "Deliver Support",
        "Close Request"
      ],
      "serviceMethod": "resolveCommunityRequest",
      "pluginHook": "generateWorkflowActions"
    }
  ],
  "pluginHooks": [
    "beforeCreateEntity",
    "afterCreateEntity",
    "calculateDerivedFields",
    "generateWorkflowActions",
    "seedDomainData"
  ],
  "theme": {
    "accent": "ngo-community-community",
    "sidebarTitle": "Community Dashboard for ngo & community workflows, dashboard tracking, domain records, reports, and audit history."
  },
  "themeConfig": {
    "projectName": "community-dashboard",
    "displayName": "Community Dashboard",
    "domain": "ngo-community",
    "designTemplateId": "ngo-community-topbar-analytics",
    "designTemplateName": "Community Dashboard Topbar Analytics",
    "style": "ngo-community-major-project",
    "styleDescription": "Community Dashboard layout with ngo-community-dashboard visuals and domain-specific controls.",
    "colors": {
      "primary": "#15803d",
      "accent": "#db2777",
      "background": "#f0fdf4",
      "surface": "#ffffff",
      "muted": "#bbf7d0",
      "text": "#111827"
    },
    "radius": "10px",
    "density": "comfortable",
    "vector": "ngo-community-dashboard",
    "vectorFamily": "ngo-community-community",
    "illustration": {
      "title": "Community Dashboard visual",
      "motifs": [
        "Community Beneficiaries",
        "Community Volunteers",
        "Community Donations",
        "Community Requests"
      ]
    },
    "sidebarVariant": "topbar-analytics",
    "cardStyle": "insight-panel",
    "layout": {
      "variant": "topbar-analytics"
    }
  },
  "dashboardTitle": "Community Dashboard Command Center",
  "dashboardIntro": "Community Dashboard shows community beneficiaries, community volunteers, community donations, community requests, workflows, alerts, and reports.",
  "workflowPanelTitle": "Community Dashboard Workflow Board",
  "tableSearchPlaceholder": "Search community beneficiaries, community volunteers, community donations...",
  "emptyState": "No community beneficiaries found for this filter.",
  "navigationLabels": [
    {
      "to": "/dashboard",
      "label": "Dashboard",
      "icon": "HeartHandshake",
      "group": "Community Operations",
      "roles": [
        "admin",
        "operator"
      ]
    },
    {
      "to": "/community-beneficiaries",
      "label": "Community Beneficiaries",
      "icon": "UsersRound",
      "group": "Community Operations",
      "roles": [
        "admin",
        "operator"
      ]
    },
    {
      "to": "/community-volunteers",
      "label": "Community Volunteers",
      "icon": "UserRoundCheck",
      "group": "Community Operations",
      "roles": [
        "admin",
        "operator"
      ]
    },
    {
      "to": "/community-donations",
      "label": "Community Donations",
      "icon": "HandCoins",
      "group": "Community Operations",
      "roles": [
        "admin",
        "operator"
      ]
    },
    {
      "to": "/community-requests",
      "label": "Community Requests",
      "icon": "MessageSquareWarning",
      "group": "Community Operations",
      "roles": [
        "admin",
        "operator"
      ]
    },
    {
      "to": "/community-campaigns",
      "label": "Community Campaigns",
      "icon": "Megaphone",
      "group": "Community Operations",
      "roles": [
        "admin",
        "operator"
      ]
    },
    {
      "to": "/community-workflows/register-volunteer",
      "label": "Register Volunteer",
      "icon": "HelpingHand",
      "group": "Community Operations",
      "roles": [
        "admin",
        "operator"
      ]
    },
    {
      "to": "/community-workflows/record-donation",
      "label": "Record Donation",
      "icon": "HelpingHand",
      "group": "Community Operations",
      "roles": [
        "admin",
        "operator"
      ]
    },
    {
      "to": "/community-workflows/resolve-community-request",
      "label": "Resolve Community Request",
      "icon": "HelpingHand",
      "group": "Community Operations",
      "roles": [
        "admin",
        "operator"
      ]
    },
    {
      "to": "/reports",
      "label": "Reports",
      "icon": "FileText",
      "group": "Community Operations",
      "roles": [
        "admin"
      ]
    },
    {
      "to": "/audit-logs",
      "label": "Audit Trail",
      "icon": "History",
      "group": "Community Operations",
      "roles": [
        "admin"
      ]
    }
  ],
  "dashboardCards": [
    {
      "key": "domain:CommunityBeneficiary",
      "title": "Active Volunteers",
      "helper": "count metric from CommunityBeneficiary",
      "sourceEntity": "CommunityBeneficiary",
      "metric": "count",
      "value": "35"
    },
    {
      "key": "domain:CommunityVolunteer",
      "title": "Total Donations",
      "helper": "pendingCount metric from CommunityVolunteer",
      "sourceEntity": "CommunityVolunteer",
      "metric": "pendingCount",
      "value": "42"
    },
    {
      "key": "domain:CommunityDonation",
      "title": "Open Requests",
      "helper": "sumValue metric from CommunityDonation",
      "sourceEntity": "CommunityDonation",
      "metric": "sumValue",
      "value": "46"
    },
    {
      "key": "domain:CommunityRequest",
      "title": "Running Campaigns",
      "helper": "todayCount metric from CommunityRequest",
      "sourceEntity": "CommunityRequest",
      "metric": "todayCount",
      "value": "39"
    }
  ],
  "domainModules": [
    {
      "title": "Community Beneficiaries",
      "description": "Community Beneficiaries module with Community Beneficiary Code, Community Beneficiary Name, Community Category, NGO & Community Management Owner.",
      "metric": "12",
      "tone": "blue"
    },
    {
      "title": "Community Volunteers",
      "description": "Community Volunteers module with Community Volunteer Code, Community Volunteer Name, Community Category, NGO & Community Management Owner.",
      "metric": "15",
      "tone": "emerald"
    },
    {
      "title": "Community Donations",
      "description": "Community Donations module with Community Donation Code, Community Donation Name, Community Category, NGO & Community Management Owner.",
      "metric": "31",
      "tone": "amber"
    },
    {
      "title": "Community Requests",
      "description": "Community Requests module with Community Request Code, Community Request Name, Community Category, NGO & Community Management Owner.",
      "metric": "20",
      "tone": "rose"
    },
    {
      "title": "Community Campaigns",
      "description": "Community Campaigns module with Community Campaign Code, Community Campaign Name, Community Category, NGO & Community Management Owner.",
      "metric": "31",
      "tone": "violet"
    }
  ],
  "workflowSteps": [
    "Capture Profile",
    "Verify Availability",
    "Assign Campaign",
    "Activate Volunteer"
  ],
  "quickActions": [
    "Register Volunteer",
    "Record Donation",
    "Resolve Community Request"
  ],
  "insightPanels": [
    {
      "title": "Register Volunteer",
      "value": "4",
      "description": "Register Volunteer for community dashboard with clear steps, ownership, and audit-ready status updates."
    },
    {
      "title": "Record Donation",
      "value": "15",
      "description": "Record Donation for community dashboard with clear steps, ownership, and audit-ready status updates."
    },
    {
      "title": "Resolve Community Request",
      "value": "13",
      "description": "Resolve Community Request for community dashboard with clear steps, ownership, and audit-ready status updates."
    }
  ],
  "formSchema": [
    {
      "name": "beneficiaryCode",
      "label": "Community Beneficiary Code",
      "type": "string",
      "required": true,
      "table": true,
      "form": true,
      "unique": true
    },
    {
      "name": "name",
      "label": "Community Beneficiary Name",
      "type": "string",
      "required": true,
      "table": true,
      "form": true
    },
    {
      "name": "category",
      "label": "Community Category",
      "type": "string",
      "required": true,
      "table": true,
      "form": true
    },
    {
      "name": "ownerName",
      "label": "NGO & Community Management Owner",
      "type": "string",
      "required": true,
      "table": true,
      "form": true
    },
    {
      "name": "status",
      "label": "Community Beneficiary Status",
      "type": "select",
      "required": true,
      "table": true,
      "form": true,
      "options": [
        "Active",
        "Pending Review",
        "Approved",
        "Closed"
      ]
    },
    {
      "name": "beneficiaryCode",
      "label": "Community Beneficiary Code",
      "type": "string",
      "required": true,
      "table": true,
      "form": true
    },
    {
      "name": "needType",
      "label": "Community Need Type",
      "type": "select",
      "required": true,
      "table": true,
      "form": true,
      "options": [
        "Active",
        "Pending",
        "Approved",
        "Closed"
      ]
    },
    {
      "name": "location",
      "label": "Community Location",
      "type": "string",
      "required": true,
      "table": true,
      "form": true
    }
  ],
  "recordPage": {
    "entityName": "CommunityBeneficiary",
    "title": "Community Beneficiaries",
    "route": "/community-beneficiaries",
    "createAction": "Add Community Beneficiary",
    "intro": "Community Dashboard uses community beneficiaries to handle community operations with domain-specific tracking.",
    "searchPlaceholder": "Search community beneficiaries by code, name, category, owner, or status...",
    "emptyState": "No community beneficiaries have been added yet.",
    "fields": [
      {
        "name": "beneficiaryCode",
        "label": "Community Beneficiary Code",
        "type": "string",
        "required": true,
        "table": true,
        "form": true,
        "unique": true
      },
      {
        "name": "name",
        "label": "Community Beneficiary Name",
        "type": "string",
        "required": true,
        "table": true,
        "form": true
      },
      {
        "name": "category",
        "label": "Community Category",
        "type": "string",
        "required": true,
        "table": true,
        "form": true
      },
      {
        "name": "ownerName",
        "label": "NGO & Community Management Owner",
        "type": "string",
        "required": true,
        "table": true,
        "form": true
      },
      {
        "name": "status",
        "label": "Community Beneficiary Status",
        "type": "select",
        "required": true,
        "table": true,
        "form": true,
        "options": [
          "Active",
          "Pending Review",
          "Approved",
          "Closed"
        ]
      },
      {
        "name": "beneficiaryCode",
        "label": "Community Beneficiary Code",
        "type": "string",
        "required": true,
        "table": true,
        "form": true
      },
      {
        "name": "needType",
        "label": "Community Need Type",
        "type": "select",
        "required": true,
        "table": true,
        "form": true,
        "options": [
          "Active",
          "Pending",
          "Approved",
          "Closed"
        ]
      },
      {
        "name": "location",
        "label": "Community Location",
        "type": "string",
        "required": true,
        "table": true,
        "form": true
      }
    ],
    "columns": [
      {
        "key": "beneficiaryCode",
        "label": "Community Beneficiary Code"
      },
      {
        "key": "name",
        "label": "Community Beneficiary Name"
      },
      {
        "key": "category",
        "label": "Community Category"
      },
      {
        "key": "ownerName",
        "label": "NGO & Community Management Owner"
      },
      {
        "key": "status",
        "label": "Community Beneficiary Status"
      },
      {
        "key": "beneficiaryCode",
        "label": "Community Beneficiary Code"
      },
      {
        "key": "needType",
        "label": "Community Need Type"
      },
      {
        "key": "location",
        "label": "Community Location"
      }
    ]
  },
  "transactionPage": {
    "entityName": "CommunityVolunteer",
    "title": "Community Volunteers",
    "route": "/community-volunteers",
    "createAction": "Manage Community Volunteer",
    "intro": "Community Dashboard uses community volunteers to handle community operations with domain-specific tracking.",
    "searchPlaceholder": "Search community volunteers by code, name, category, owner, or status...",
    "emptyState": "No community volunteers have been added yet.",
    "fields": [
      {
        "name": "volunteerCode",
        "label": "Community Volunteer Code",
        "type": "string",
        "required": true,
        "table": true,
        "form": true,
        "unique": true
      },
      {
        "name": "name",
        "label": "Community Volunteer Name",
        "type": "string",
        "required": true,
        "table": true,
        "form": true
      },
      {
        "name": "category",
        "label": "Community Category",
        "type": "string",
        "required": true,
        "table": true,
        "form": true
      },
      {
        "name": "ownerName",
        "label": "NGO & Community Management Owner",
        "type": "string",
        "required": true,
        "table": true,
        "form": true
      },
      {
        "name": "status",
        "label": "Community Volunteer Status",
        "type": "select",
        "required": true,
        "table": true,
        "form": true,
        "options": [
          "Active",
          "Pending Review",
          "Approved",
          "Closed"
        ]
      },
      {
        "name": "volunteerCode",
        "label": "Community Volunteer Code",
        "type": "string",
        "required": true,
        "table": true,
        "form": true
      },
      {
        "name": "skill",
        "label": "Community Skill",
        "type": "string",
        "required": true,
        "table": true,
        "form": true
      },
      {
        "name": "availability",
        "label": "Community Availability",
        "type": "select",
        "required": true,
        "table": true,
        "form": true,
        "options": [
          "Active",
          "Pending",
          "Approved",
          "Closed"
        ]
      }
    ],
    "columns": [
      {
        "key": "volunteerCode",
        "label": "Community Volunteer Code"
      },
      {
        "key": "name",
        "label": "Community Volunteer Name"
      },
      {
        "key": "category",
        "label": "Community Category"
      },
      {
        "key": "ownerName",
        "label": "NGO & Community Management Owner"
      },
      {
        "key": "status",
        "label": "Community Volunteer Status"
      },
      {
        "key": "volunteerCode",
        "label": "Community Volunteer Code"
      },
      {
        "key": "skill",
        "label": "Community Skill"
      },
      {
        "key": "availability",
        "label": "Community Availability"
      }
    ]
  },
  "entityPages": {
    "CommunityBeneficiary": {
      "entityName": "CommunityBeneficiary",
      "title": "Community Beneficiaries",
      "route": "/community-beneficiaries",
      "createAction": "Add Community Beneficiary",
      "intro": "Community Dashboard uses community beneficiaries to handle community operations with domain-specific tracking.",
      "searchPlaceholder": "Search community beneficiaries by code, name, category, owner, or status...",
      "emptyState": "No community beneficiaries have been added yet.",
      "fields": [
        {
          "name": "beneficiaryCode",
          "label": "Community Beneficiary Code",
          "type": "string",
          "required": true,
          "table": true,
          "form": true,
          "unique": true
        },
        {
          "name": "name",
          "label": "Community Beneficiary Name",
          "type": "string",
          "required": true,
          "table": true,
          "form": true
        },
        {
          "name": "category",
          "label": "Community Category",
          "type": "string",
          "required": true,
          "table": true,
          "form": true
        },
        {
          "name": "ownerName",
          "label": "NGO & Community Management Owner",
          "type": "string",
          "required": true,
          "table": true,
          "form": true
        },
        {
          "name": "status",
          "label": "Community Beneficiary Status",
          "type": "select",
          "required": true,
          "table": true,
          "form": true,
          "options": [
            "Active",
            "Pending Review",
            "Approved",
            "Closed"
          ]
        },
        {
          "name": "beneficiaryCode",
          "label": "Community Beneficiary Code",
          "type": "string",
          "required": true,
          "table": true,
          "form": true
        },
        {
          "name": "needType",
          "label": "Community Need Type",
          "type": "select",
          "required": true,
          "table": true,
          "form": true,
          "options": [
            "Active",
            "Pending",
            "Approved",
            "Closed"
          ]
        },
        {
          "name": "location",
          "label": "Community Location",
          "type": "string",
          "required": true,
          "table": true,
          "form": true
        }
      ],
      "columns": [
        {
          "key": "beneficiaryCode",
          "label": "Community Beneficiary Code"
        },
        {
          "key": "name",
          "label": "Community Beneficiary Name"
        },
        {
          "key": "category",
          "label": "Community Category"
        },
        {
          "key": "ownerName",
          "label": "NGO & Community Management Owner"
        },
        {
          "key": "status",
          "label": "Community Beneficiary Status"
        },
        {
          "key": "beneficiaryCode",
          "label": "Community Beneficiary Code"
        },
        {
          "key": "needType",
          "label": "Community Need Type"
        },
        {
          "key": "location",
          "label": "Community Location"
        }
      ]
    },
    "CommunityVolunteer": {
      "entityName": "CommunityVolunteer",
      "title": "Community Volunteers",
      "route": "/community-volunteers",
      "createAction": "Manage Community Volunteer",
      "intro": "Community Dashboard uses community volunteers to handle community operations with domain-specific tracking.",
      "searchPlaceholder": "Search community volunteers by code, name, category, owner, or status...",
      "emptyState": "No community volunteers have been added yet.",
      "fields": [
        {
          "name": "volunteerCode",
          "label": "Community Volunteer Code",
          "type": "string",
          "required": true,
          "table": true,
          "form": true,
          "unique": true
        },
        {
          "name": "name",
          "label": "Community Volunteer Name",
          "type": "string",
          "required": true,
          "table": true,
          "form": true
        },
        {
          "name": "category",
          "label": "Community Category",
          "type": "string",
          "required": true,
          "table": true,
          "form": true
        },
        {
          "name": "ownerName",
          "label": "NGO & Community Management Owner",
          "type": "string",
          "required": true,
          "table": true,
          "form": true
        },
        {
          "name": "status",
          "label": "Community Volunteer Status",
          "type": "select",
          "required": true,
          "table": true,
          "form": true,
          "options": [
            "Active",
            "Pending Review",
            "Approved",
            "Closed"
          ]
        },
        {
          "name": "volunteerCode",
          "label": "Community Volunteer Code",
          "type": "string",
          "required": true,
          "table": true,
          "form": true
        },
        {
          "name": "skill",
          "label": "Community Skill",
          "type": "string",
          "required": true,
          "table": true,
          "form": true
        },
        {
          "name": "availability",
          "label": "Community Availability",
          "type": "select",
          "required": true,
          "table": true,
          "form": true,
          "options": [
            "Active",
            "Pending",
            "Approved",
            "Closed"
          ]
        }
      ],
      "columns": [
        {
          "key": "volunteerCode",
          "label": "Community Volunteer Code"
        },
        {
          "key": "name",
          "label": "Community Volunteer Name"
        },
        {
          "key": "category",
          "label": "Community Category"
        },
        {
          "key": "ownerName",
          "label": "NGO & Community Management Owner"
        },
        {
          "key": "status",
          "label": "Community Volunteer Status"
        },
        {
          "key": "volunteerCode",
          "label": "Community Volunteer Code"
        },
        {
          "key": "skill",
          "label": "Community Skill"
        },
        {
          "key": "availability",
          "label": "Community Availability"
        }
      ]
    },
    "CommunityDonation": {
      "entityName": "CommunityDonation",
      "title": "Community Donations",
      "route": "/community-donations",
      "createAction": "Manage Community Donation",
      "intro": "Community Dashboard uses community donations to handle community operations with domain-specific tracking.",
      "searchPlaceholder": "Search community donations by code, name, category, owner, or status...",
      "emptyState": "No community donations have been added yet.",
      "fields": [
        {
          "name": "donationCode",
          "label": "Community Donation Code",
          "type": "string",
          "required": true,
          "table": true,
          "form": true,
          "unique": true
        },
        {
          "name": "name",
          "label": "Community Donation Name",
          "type": "string",
          "required": true,
          "table": true,
          "form": true
        },
        {
          "name": "category",
          "label": "Community Category",
          "type": "string",
          "required": true,
          "table": true,
          "form": true
        },
        {
          "name": "ownerName",
          "label": "NGO & Community Management Owner",
          "type": "string",
          "required": true,
          "table": true,
          "form": true
        },
        {
          "name": "status",
          "label": "Community Donation Status",
          "type": "select",
          "required": true,
          "table": true,
          "form": true,
          "options": [
            "Active",
            "Pending Review",
            "Approved",
            "Closed"
          ]
        },
        {
          "name": "donationNo",
          "label": "Community Donation Number",
          "type": "string",
          "required": true,
          "table": true,
          "form": true
        },
        {
          "name": "donorName",
          "label": "Community Donor Name",
          "type": "string",
          "required": true,
          "table": true,
          "form": true
        },
        {
          "name": "amount",
          "label": "Community Amount",
          "type": "number",
          "required": true,
          "table": true,
          "form": true
        }
      ],
      "columns": [
        {
          "key": "donationCode",
          "label": "Community Donation Code"
        },
        {
          "key": "name",
          "label": "Community Donation Name"
        },
        {
          "key": "category",
          "label": "Community Category"
        },
        {
          "key": "ownerName",
          "label": "NGO & Community Management Owner"
        },
        {
          "key": "status",
          "label": "Community Donation Status"
        },
        {
          "key": "donationNo",
          "label": "Community Donation Number"
        },
        {
          "key": "donorName",
          "label": "Community Donor Name"
        },
        {
          "key": "amount",
          "label": "Community Amount"
        }
      ]
    },
    "CommunityRequest": {
      "entityName": "CommunityRequest",
      "title": "Community Requests",
      "route": "/community-requests",
      "createAction": "Manage Community Request",
      "intro": "Community Dashboard uses community requests to handle community operations with domain-specific tracking.",
      "searchPlaceholder": "Search community requests by code, name, category, owner, or status...",
      "emptyState": "No community requests have been added yet.",
      "fields": [
        {
          "name": "requestCode",
          "label": "Community Request Code",
          "type": "string",
          "required": true,
          "table": true,
          "form": true,
          "unique": true
        },
        {
          "name": "name",
          "label": "Community Request Name",
          "type": "string",
          "required": true,
          "table": true,
          "form": true
        },
        {
          "name": "category",
          "label": "Community Category",
          "type": "string",
          "required": true,
          "table": true,
          "form": true
        },
        {
          "name": "ownerName",
          "label": "NGO & Community Management Owner",
          "type": "string",
          "required": true,
          "table": true,
          "form": true
        },
        {
          "name": "status",
          "label": "Community Request Status",
          "type": "select",
          "required": true,
          "table": true,
          "form": true,
          "options": [
            "Active",
            "Pending Review",
            "Approved",
            "Closed"
          ]
        },
        {
          "name": "requestNo",
          "label": "Community Request Number",
          "type": "string",
          "required": true,
          "table": true,
          "form": true
        },
        {
          "name": "requestType",
          "label": "Community Request Type",
          "type": "select",
          "required": true,
          "table": true,
          "form": true,
          "options": [
            "Active",
            "Pending",
            "Approved",
            "Closed"
          ]
        },
        {
          "name": "priority",
          "label": "Community Priority",
          "type": "select",
          "required": true,
          "table": true,
          "form": true,
          "options": [
            "Active",
            "Pending",
            "Approved",
            "Closed"
          ]
        }
      ],
      "columns": [
        {
          "key": "requestCode",
          "label": "Community Request Code"
        },
        {
          "key": "name",
          "label": "Community Request Name"
        },
        {
          "key": "category",
          "label": "Community Category"
        },
        {
          "key": "ownerName",
          "label": "NGO & Community Management Owner"
        },
        {
          "key": "status",
          "label": "Community Request Status"
        },
        {
          "key": "requestNo",
          "label": "Community Request Number"
        },
        {
          "key": "requestType",
          "label": "Community Request Type"
        },
        {
          "key": "priority",
          "label": "Community Priority"
        }
      ]
    },
    "CommunityCampaign": {
      "entityName": "CommunityCampaign",
      "title": "Community Campaigns",
      "route": "/community-campaigns",
      "createAction": "Manage Community Campaign",
      "intro": "Community Dashboard uses community campaigns to handle community operations with domain-specific tracking.",
      "searchPlaceholder": "Search community campaigns by code, name, category, owner, or status...",
      "emptyState": "No community campaigns have been added yet.",
      "fields": [
        {
          "name": "campaignCode",
          "label": "Community Campaign Code",
          "type": "string",
          "required": true,
          "table": true,
          "form": true,
          "unique": true
        },
        {
          "name": "name",
          "label": "Community Campaign Name",
          "type": "string",
          "required": true,
          "table": true,
          "form": true
        },
        {
          "name": "category",
          "label": "Community Category",
          "type": "string",
          "required": true,
          "table": true,
          "form": true
        },
        {
          "name": "ownerName",
          "label": "NGO & Community Management Owner",
          "type": "string",
          "required": true,
          "table": true,
          "form": true
        },
        {
          "name": "status",
          "label": "Community Campaign Status",
          "type": "select",
          "required": true,
          "table": true,
          "form": true,
          "options": [
            "Active",
            "Pending Review",
            "Approved",
            "Closed"
          ]
        },
        {
          "name": "campaignCode",
          "label": "Community Campaign Code",
          "type": "string",
          "required": true,
          "table": true,
          "form": true
        },
        {
          "name": "targetAmount",
          "label": "Community Target Amount",
          "type": "number",
          "required": true,
          "table": true,
          "form": true
        },
        {
          "name": "impactCount",
          "label": "Community Impact Count",
          "type": "number",
          "required": true,
          "table": true,
          "form": true
        }
      ],
      "columns": [
        {
          "key": "campaignCode",
          "label": "Community Campaign Code"
        },
        {
          "key": "name",
          "label": "Community Campaign Name"
        },
        {
          "key": "category",
          "label": "Community Category"
        },
        {
          "key": "ownerName",
          "label": "NGO & Community Management Owner"
        },
        {
          "key": "status",
          "label": "Community Campaign Status"
        },
        {
          "key": "campaignCode",
          "label": "Community Campaign Code"
        },
        {
          "key": "targetAmount",
          "label": "Community Target Amount"
        },
        {
          "key": "impactCount",
          "label": "Community Impact Count"
        }
      ]
    }
  },
  "reportSections": [
    {
      "heading": "Project Overview",
      "description": "A student-ready community dashboard generated from the management template with domain modules, seed data, reports, Swagger docs, Docker support, screenshots, viva questions, PPT content, and submission documentation."
    },
    {
      "heading": "Demo Use Cases",
      "description": "Manage community beneficiaries for Community Dashboard, Track community volunteers and operational ownership, Run register volunteer workflow, Generate community reports and audit history"
    },
    {
      "heading": "Learning Outcomes",
      "description": "Community Dashboard domain modelling, NGO & Community Management CRUD and dashboard design, Community workflow automation, Student-ready documentation, screenshots, and Docker deployment"
    }
  ],
  "docs": {
    "problemStatement": "Community Dashboard needs a focused system for community beneficiaries, community volunteers, community donations, community requests, workflows, reports, and audit visibility instead of manual spreadsheets.",
    "learningOutcomes": [
      "Community Dashboard domain modelling",
      "NGO & Community Management CRUD and dashboard design",
      "Community workflow automation",
      "Student-ready documentation, screenshots, and Docker deployment"
    ]
  }
};
