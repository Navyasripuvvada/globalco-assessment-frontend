# Job Board Frontend

## Overview

The Job Board Frontend is a modern, responsive web application built with **Next.js**, **React**, **TypeScript**, and **Tailwind CSS**. It provides an intuitive interface for job seekers to discover opportunities and apply for jobs, while allowing recruiters to manage job postings through a clean and user-friendly dashboard.

The application communicates with the NestJS backend through secure REST APIs and is designed with a strong focus on user experience, responsiveness, and performance.

---

## Features

### Job Seeker Features

* Browse Available Jobs
* Search Jobs
* View Detailed Job Information
* User Registration
* User Login
* Apply for Jobs
* Responsive Design

### Recruiter Features

* Create Job Listings
* Edit Existing Jobs
* Delete Job Listings
* View Posted Jobs
* Secure Authentication

### User Experience

* Modern Landing Page
* Responsive Navigation
* Loading Indicators
* Error Handling
* Mobile-Friendly Design
* Clean and Intuitive Interface

---

## Technology Stack

| Technology        | Purpose           |
| ----------------- | ----------------- |
| Next.js           | React Framework   |
| React             | UI Development    |
| TypeScript        | Type Safety       |
| Tailwind CSS      | Styling           |
| Axios / Fetch API | API Communication |

---

## Project Structure

```text
src/
│
├── app/
├── components/
├── hooks/
├── lib/
├── services/
├── types/
├── utils/
└── styles/
```

The project follows a component-based architecture, making the code reusable, maintainable, and easy to scale.

---

## Pages

* Home
* Jobs
* Job Details
* Login
* Register
* Profile
* Recruiter Dashboard
* Create Job
* Edit Job

---

## Application Workflow

1. Users visit the home page.
2. Browse or search available job listings.
3. View detailed information for a selected job.
4. Register or log in to the application.
5. Apply for jobs.
6. Recruiters can create, update, and delete job postings after authentication.

---

## Backend Integration

The frontend communicates with the NestJS backend using REST APIs.

Main API operations include:

* User Authentication
* Fetch Jobs
* Fetch Job Details
* Create Job
* Update Job
* Delete Job
* Apply for Job

---

## Environment Variables

Create a `.env.local` file with the following variable:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

Update the URL based on your deployed backend.

---

## Installation

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Build the application:

```bash
npm run build
```

Start the production build:

```bash
npm run start
```

---

## Responsive Design

The application is fully responsive and optimized for:

* Desktop
* Tablet
* Mobile Devices

---

## Performance

The frontend leverages Next.js features such as optimized routing, component-based rendering, and efficient asset loading to provide a smooth user experience.

---

## Deployment

The frontend is deployed on **Vercel**.

Deployment process:

* Push code to GitHub.
* GitHub Actions validates the project build.
* Vercel automatically deploys the latest version.

---

## Future Enhancements

* Saved Jobs
* Resume Upload
* Company Profiles
* Advanced Job Filters
* Email Notifications
* Dark Mode
* Interview Scheduling
* Job Recommendations

---

## Author

Developed by **Navya** as part of a full-stack Job Board application using **Next.js**, **NestJS**, and **MongoDB**.
