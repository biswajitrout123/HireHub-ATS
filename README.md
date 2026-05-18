# 🚀 SmartJobPortal - Full-Stack Applicant Tracking System (ATS)

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![Tailwind](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

SmartJobPortal is a production-ready Applicant Tracking System (ATS) built with the MERN stack. It bridges the gap between job seekers and recruiters through a secure, interactive, and data-driven platform. 

## ✨ Key Features

### 🏢 For Recruiters (Enterprise Dashboard)
* **Pipeline Analytics:** Live visual data dashboards using **Recharts** to track application statuses (Applied, Shortlisted, Hired) across all active job postings.
* **Role-Based Access Control (RBAC):** Secure recruiter-only routes and actions protected by JWT middleware.
* **Dynamic Candidate Management:** View applicants, download PDF resumes, and seamlessly move candidates through the hiring pipeline via Optimistic UI updates.
* **Job Posting Engine:** Full CRUD functionality to create, read, update, and completely delete job listings.

### 🧑‍💻 For Job Seekers
* **Frictionless Applications:** Upload PDF resumes directly to the cloud utilizing **ImageKit** integration.
* **Real-Time Status Tracking:** A dedicated "My Applications" portal allowing users to track where they stand in the hiring process via dynamic status badges.
* **Smart Protections:** Backend MongoDB indexing prevents users from spamming or submitting duplicate applications for the same role.

## 🛠️ Tech Stack

**Frontend (Client)**
* React.js (Hooks, Context)
* React Router DOM (Dynamic Routing)
* Tailwind CSS (Responsive UI/UX)
* Recharts (Data Visualization)
* Axios (HTTP Client)

**Backend (Server)**
* Node.js & Express.js (RESTful API architecture)
* MongoDB & Mongoose (Database & ODM)
* JSON Web Tokens (JWT) & bcrypt (Authentication & Security)
* ImageKit API (Cloud File Storage)
* Multer (Multipart/form-data parsing)

## ⚙️ Getting Started

Follow these instructions to set up the project locally on your machine.

### 1. Clone the repository
```bash
git clone [https://github.com/yourusername/SmartJobPortal.git](https://github.com/yourusername/SmartJobPortal.git)
cd SmartJobPortal