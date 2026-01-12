# Subscription Tracker API

## Overview
A RESTful API for managing users and their subscriptions, helping users organize, monitor, and manage their recurring subscriptions.

## Features
- Create and Manage Users
- Create and manage subscriptions
- Track billing cycles and renewal dates
- Calculate total monthly/yearly costs
- Categorize subscriptions

## Tech Stack
- **Runtime**: Node.js
- **Framework**: Express
- **Database**: MongoDB
- **Authentication**: JWT
- **Password Hashing**: bcryptjs

## Installation
```bash
git clone https://github.com/geekharman003/subscription-tracker-api.git
cd subscription-tracker-api
npm install 
```

## Usage
```bash
npm start
```

API will run on `http://localhost:3000`

## API Endpoints


## auth endpoints
- `POST /api/v1/auth/sign-up` - Create User
- `POST /api/v1/auth/sign-in` -  Login the user

## user endpoints
- `GET /api/v1/users/` -  List all users
- `GET /api/v1/users/:id` -  Get user details
- `PUT /api/v1/users/:id` -  Update user details
- `DELETE /api/v1/users/:id` -  Delete user

## subscriptions endpoints
- `GET /api/v1/subscriptions/` -  List all subscriptions
- `GET /api/v1/subscriptions/:id` -  Get subscription details
- `POST /api/v1/subscriptions/` - Creates a subscription
- `PUT /api/v1/subscriptions/:id` - Update subscription
- `DELETE /api/subscriptions/:id` - Delete subscription
- `GET /api/v1/subscriptions/user/:id` - Get all subscriptions of a user
- `GET /api/v1/subscriptions/:id/cancel` - Cancel user subscription
- `GET /api/v1/subscriptions/upcoming-renewals` - Get expired subscriptions


## License
MIT

---