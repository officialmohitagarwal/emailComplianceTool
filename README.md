# Email Health Checker

A full-stack email analysis tool that helps users check an email before sending it by analyzing compliance requirements, link health, and email rendering.

## About the Project

Email Health Checker allows users to paste email HTML, select the compliance standards they want to check, and analyze the email before sending.

The tool helps identify common email issues such as:

- Missing unsubscribe links
- Missing physical address
- Missing sender information
- Broken or unhealthy links
- Compliance issues
- Potential rendering issues

It also provides an email preview and an overall health score.

> **Note:** This tool is intended as a practical email-health aid and is not legal advice or a complete legal compliance audit.

---

## Features

### Compliance Checking

The tool supports:

- **CAN-SPAM** — United States
- **CASL** — Canada
- **GDPR** — European Union

Each selected compliance standard provides individual checks and clearly identifies which checks pass or need attention.

### Link Checking

The application extracts links from the email HTML and checks their health.

It can identify:

- Working links
- Broken links
- HTTP errors
- Link status
- Overall link health score

### Email Preview

The submitted email HTML can be viewed in a preview section so users can visually inspect the email before sending it.

### Email Rendering Analysis

The backend renders the submitted HTML in a browser environment and analyzes the rendered email for potential compatibility issues.

### Email Health Score

The application calculates:

- Overall score
- Compliance score
- Link Health score

### Compliance Information

A responsive information panel explains the basic purpose of CAN-SPAM, CASL, and GDPR, including their applicable regions and the types of checks performed by the tool.

### Responsive UI

The interface is designed to work across:

- Desktop
- Tablet
- Mobile

---

# Tech Stack

## Frontend

- React
- Vite
- Tailwind CSS
- Axios
- JavaScript

## Backend

- Node.js
- Express.js
- JavaScript (ES Modules)
- Puppeteer
- CORS
- dotenv

---

# Project Structure

```text
email-health-checker/
│
├── frontend/
│   ├── public/
│   │
│   ├── src/
│   │   ├── components/
│   │   │   ├── ComplianceInfo.jsx
│   │   │   ├── ComplianceResults.jsx
│   │   │   ├── EmailForm.jsx
│   │   │   ├── EmailPreview.jsx
│   │   │   ├── LinkResults.jsx
│   │   │   ├── SectionScoreCard.jsx
│   │   │   └── SendReadiness.jsx
│   │   │
│   │   ├── pages/
│   │   ├── services/
│   │   │   └── email.api.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── ...
│   │
│   ├── .env
│   ├── package.json
│   ├── vite.config.js
│   └── ...
│
├── backend/
│   ├── routes/
│   │   └── analysis.routes.js
│   │
│   ├── services/
│   │   ├── analysis.service.js
│   │   ├── canspan.service.js
│   │   ├── casl.service.js
│   │   ├── gdpr.service.js
│   │   ├── image.service.js
│   │   ├── link.service.js
│   │   └── render.service.js
│   │
│   ├── .env
│   ├── package.json
│   └── server.js
│
├── .gitignore
└── README.md
```

---

# Getting Started

## Prerequisites

Make sure the following are installed:

- Node.js
- npm
- Git

Check your installations:

```bash
node -v
npm -v
git --version
```

---

# Run Locally

The frontend and backend run as separate applications.

You need to start **both** applications for the Email Health Checker to work.

```text
Frontend
React + Vite
http://localhost:5173
        │
        │ API Request
        ▼
Backend
Node + Express
http://localhost:5002
        │
        ▼
Email Analysis
```

## 1. Clone the Repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
cd email-health-checker
```

## 2. Start the Backend

Open a terminal and navigate to the backend folder:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Create:

```text
backend/.env
```

Add:

```env
PORT=5002
```

Start the backend:

```bash
npm run dev
```

The backend should now be running at:

```text
http://localhost:5002
```

### Backend Health Check

Open:

```text
http://localhost:5002/
```

Expected response:

```json
{
  "success": true,
  "message": "server is working"
}
```

Keep this terminal running.

## 3. Start the Frontend

Open a **new terminal**.

Navigate to the frontend:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Create:

```text
frontend/.env
```

Add:

```env
VITE_API_URL=http://localhost:5002
```

Start the frontend:

```bash
npm run dev
```

The frontend will normally be available at:

```text
http://localhost:5173
```

Open that URL in your browser.

---

# Environment Variables

## Backend

Create:

```text
backend/.env
```

Example:

```env
PORT=5002
```

The backend uses `dotenv` to load environment variables.

## Frontend

Create:

```text
frontend/.env
```

Example:

```env
VITE_API_URL=http://localhost:5002
```

The frontend reads the API URL through Vite:

```js
const API_URL = import.meta.env.VITE_API_URL;
```

The API request is sent to:

```text
${API_URL}/api/analyze
```

---

# Local Development

Once both applications are running:

### Frontend

```text
http://localhost:5173
```

### Backend

```text
http://localhost:5002
```

### Analyze API

```text
POST http://localhost:5002/api/analyze
```

The frontend sends the email HTML and selected compliance information to the backend.

The backend then:

1. Receives the email HTML
2. Renders the email
3. Extracts visible text
4. Analyzes links
5. Analyzes images
6. Runs compliance checks
7. Calculates scores
8. Returns the analysis result

The frontend displays the results to the user.

---

# API

## Analyze Email

### Endpoint

```http
POST /api/analyze
```

### Local URL

```text
http://localhost:5002/api/analyze
```

### Request Body

```json
{
  "html": "<html>...</html>",
  "jurisdictions": [
    "CAN-SPAM"
  ],
  "senderEmail": "sender@example.com",
  "consent": false
}
```

### Fields

| Field | Type | Description |
|---|---|---|
| `html` | String | Email HTML/content |
| `jurisdictions` | Array | Compliance standards to check |
| `senderEmail` | String | Sender email address |
| `consent` | Boolean | CASL consent value |

---

# Compliance Standards

## CAN-SPAM

**Region:** United States

The tool checks areas such as:

- Unsubscribe link
- Physical mailing address
- Sender email
- Working email links

## CASL

**Region:** Canada

The tool checks areas such as:

- Recipient consent
- Sender identification
- Unsubscribe mechanism
- Ability to respect unsubscribe requests

## GDPR

**Region:** European Union

The tool provides checks related to:

- Consent
- Withdrawal of consent
- Sender and processing information
- Appropriate handling of personal data

> The checks provided by this project are simplified automated checks and should not be considered a complete legal assessment.

---

# Link Analysis

Links are extracted from the submitted email HTML and checked for their status.

Example:

```html
<a href="https://example.com/unsubscribe">
    Unsubscribe
</a>
```

A working link can pass the link-health check.

A broken link such as:

```text
https://example.com/preferences
```

returning:

```text
HTTP 404
```

can be reported as a broken link.

---

# Example Email HTML

You can test the application with an HTML email such as:

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Email</title>
</head>

<body>

    <h1>Increase your sales</h1>

    <p>
        Hi Mohit,
    </p>

    <p>
        Here's an opportunity to improve your sales process
        and grow your business.
    </p>

    <p>
        <a href="https://example.com">
            Learn More
        </a>
    </p>

    <p>
        You are receiving this email because you subscribed
        to our communications.
    </p>

    <p>
        <a href="https://example.com/unsubscribe">
            Unsubscribe
        </a>
    </p>

    <p>
        123 Main Street, New York, NY 10001
    </p>

</body>
</html>
```

---

# Application Flow

```text
                    Email Health Checker
                             │
                             ▼
                     Enter Email Details
                             │
                             ▼
                       Paste HTML
                             │
                             ▼
                   Select Compliance
                             │
                             ▼
                     Analyze Email
                             │
              ┌──────────────┼──────────────┐
              ▼              ▼              ▼
         Compliance        Links        Rendering
              │              │              │
              └──────────────┼──────────────┘
                             ▼
                       Health Score
                             │
                             ▼
                          Results
```

---

# Frontend Commands

Install dependencies:

```bash
cd frontend
npm install
```

Start development server:

```bash
npm run dev
```

Create production build:

```bash
npm run build
```

Preview production build:

```bash
npm run preview
```

---

# Backend Commands

Install dependencies:

```bash
cd backend
npm install
```

Start development server:

```bash
npm run dev
```

Start production server:

```bash
npm start
```

> The production command assumes the corresponding script exists in `backend/package.json`.

---

# Deployment

The application is split into:

- Frontend deployment
- Backend deployment

The frontend can be deployed to Vercel, while the backend needs to be deployed on a Node.js-compatible hosting platform.

## Frontend Deployment

After deploying the backend, configure the frontend environment variable:

```env
VITE_API_URL=YOUR_DEPLOYED_BACKEND_URL
(or use this : https://emailcompliancetool.onrender.com)
```

For example:

```env
VITE_API_URL=https://your-backend-domain.com
(or use this : https://emailcompliancetool.onrender.com)
```

Do not use the localhost URL in the production frontend:

```env
VITE_API_URL=http://localhost:5002
```

## Backend Deployment

Deploy the `backend` folder to your Node.js hosting provider.

Configure the required environment variables on the hosting platform.

After deployment, copy the backend URL and use it as:

```env
VITE_API_URL=YOUR_DEPLOYED_BACKEND_URL
```

in the frontend deployment.

The backend CORS configuration should allow requests from the deployed frontend.

---

# Live Demo

**Vercel:**  
https://email-compliance-tool.vercel.app/


---

# GitHub Repository

**GitHub:**  
https://github.com/officialmohitagarwal/emailComplianceTool


---

# Project Goals

Email campaigns can fail because of issues that are easy to overlook, including:

- Missing unsubscribe mechanisms
- Broken URLs
- Missing sender information
- Missing physical address
- Compliance issues
- HTML/rendering problems

Email Health Checker brings these checks together into a single workflow so users can identify common problems before sending their emails.

---


# Security & Environment Files

Environment files should not be committed to GitHub.

Make sure your `.gitignore` contains:

```text
.env
.env.local
.env.*.local
node_modules/
dist/
```

