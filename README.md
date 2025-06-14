# 🚀 Evangadi Forum

> A Full-Stack Forum Platform for Engaging Community Q&A Discussions  
> 💻 Built with MySQL, Express, Node.js, React, and REST APIs

![Evangadi Logo](./assets/logo.png)

---

## 📖 Table of Contents

- [About the Project](#about-the-project)
- [Tech Stack](#tech-stack)
- [Features](#features)
- [API Endpoints](#api-endpoints)
- [Database Schema](#database-schema)
- [Frontend Pages](#frontend-pages)
- [Installation](#installation)
- [Usage](#usage)
- [Contributors](#contributors)
- [Screenshots](#screenshots)
- [License](#license)

---

## 🧠 About the Project

The **Evangadi Forum** is a full-stack Q&A platform similar to Stack Overflow, allowing users to:
- Sign up and log in
- Post questions
- Answer questions
- Browse and interact with content
- Engage in an online learning community

It is built for educational and collaborative purposes, targeting aspiring developers and learners.

---

## 🔧 Tech Stack

| Layer      | Technology                  |
|------------|-----------------------------|
| Frontend   | React, HTML5, CSS3          |
| Backend    | Node.js, Express.js         |
| Database   | MySQL                       |
| API Auth   | JWT (JSON Web Tokens)       |
| Styling    | Responsive CSS, Flexbox/Grid|

---

## ✨ Features

- 🔐 JWT Authentication (Sign-up/Login)
- 📥 Post & View Questions
- 📤 Post & View Answers
- 📋 Full API Integration
- 🎨 Responsive UI/UX
- 📚 MySQL-Backed Data Management

---

## 🔗 API Endpoints

### ✅ Authentication

- `GET /api/user/checkUser` - Check token validity  
  **Headers**: `Authorization: Bearer <token>`

### 👤 User Registration & Login

- `POST /api/user/register`  
  **Body**: `username`, `first_name`, `last_name`, `email`, `password`

- `POST /api/user/login`  
  **Body**: `email`, `password`  
  **Response**: JWT Token

### ❓ Questions

- `GET /api/question` – Get all questions  
- `GET /api/question/:question_id` – Get one question  
- `POST /api/question` – Post a new question  
  **Body**: `title`, `description`

### 💬 Answers

- `GET /api/answer/:question_id` – Get answers for a question  
- `POST /api/answer` – Submit an answer  
  **Body**: `questionid`, `answer`

---
## 🗃️ Visual Interpretation

### Home Page
![Home Image](./assets/designes/Home%20page.jpg)
---
### Landing Page
![Landing Image](./assets/designes/landingPage.jpg)
---
### Ask Question Page
![Ask Question Image](./assets/designes/AskQuestion%20page.jpg)
---
### Question Detail Page
![Question Detail Image](./assets/designes/Question%20Detail%20and%20answer%20page.jpg)
---


## 🗃️ Database Schema


### Tables

- **userTable**:
  - `user_id`, `username`, `first_name`, `last_name`, `email`, `password`
- **questionTable**:
  - `question_id`, `user_id`, `title`, `content`, `created_at`
- **answerTable**:
  - `answer_id`, `question_id`, `user_id`, `content`, `created_at`

🔐 Uses foreign keys to maintain data integrity between questions and answers.

---

## 🧩 Frontend Pages and Components

| Page / Component | Description |
|------------------|-------------|
| `Header`         | Navigation bar (Login, Home, Logout) |
| `Footer`         | Links, Contact Info, Social Media     |
| `SignUpPage`     | Form for user registration            |
| `LoginPage`      | Form for user login                   |
| `HomePage`       | List of all questions                 |
| `QuestionPage`   | Specific question + answers + form    |
| `AnswerPage`     | List answers and submit a new one     |
| `AboutPage`      | Info about Evangadi and mission       |

All components are **responsive**, visually polished, and integrated with APIs.

---

## 🧪 Installation

1. **Clone the repository**

```bash
git clone https://github.com/yourusername/evangadi-forum.git
cd evangadi-forum
