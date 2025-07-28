# 💸 No Cash – Digital Wallet System API

No Cash is a secure, modular, and role-based **RESTful API** for a digital wallet platform (like **Bkash** or **Nagad**), built using **Node.js**, **Express**, and **MongoDB (Mongoose)**. It allows **users**, **agents**, and **admins** to perform and manage core financial operations like adding, sending, withdrawing money, and viewing transactions — all with strict access control and audit-ready logging.

---

## 🚀 Table of Contents

- [✨ Features](#-features)
- [🛠️ Technologies Used](#-technologies-used)
- [📁 Project Structure](#-project-structure)
- [⚙️ Getting Started](#️-getting-started)
  - [🔧 Prerequisites](#-prerequisites)
  - [📥 Installation](#-installation)
  - [📄 Environment Variables](#-environment-variables)
  - [🚀 Running the Server](#-running-the-server)
- [🔐 Role-Based Functionalities](#-role-based-functionalities)
- [📦 API Endpoints Summary](#-api-endpoints-summary)
- [🧪 Testing with Postman](#-testing-with-postman)
- [🎥 Project Walkthrough (For Submission)](#-project-walkthrough-for-submission)
- [📈 Future Enhancements](#-future-enhancements)
- [🧑 Author](#-author)

---

## ✨ Features

### 🧑 Users
- 🔐 Register/Login
- 💳 Wallet auto-created on signup (৳50 starting balance)
- ➕ Add money
- ➖ Withdraw money
- 🔄 Send money to another user
- 📜 View own transaction history

### 🧑‍💼 Agents
- 🏧 Cash-in (add money to a user’s wallet)
- 💵 Cash-out (withdraw from a user’s wallet)
- 💰 View commission history (optional)

### 👨‍💼 Admins
- 👥 View all users/agents
- 📂 View all wallets & transactions
- ⛔ Block/unblock user wallets
- ✅ Approve/suspend agents
- ⚙️ Manage transaction settings (optional)

### 🔁 Transactions
- Fully trackable and atomic
- Types: `add`, `withdraw`, `send`, `cash-in`, `cash-out`
- Fields: initiator, recipient, amount, fee, commission, status

---

## 🛠️ Technologies Used

| Tech              | Purpose                                |
|-------------------|----------------------------------------|
| **Node.js**       | Server-side runtime                    |
| **Express.js**    | Web framework                          |
| **MongoDB**       | NoSQL database                         |
| **Mongoose**      | MongoDB object modeling                |
| **JWT**           | Authentication (access control)        |
| **bcrypt**        | Password hashing                       |
| **dotenv**        | Environment configuration              |
| **Postman**       | API testing/documentation              |

---

## 📁 Project Structure

