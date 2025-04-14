# Blog API

A RESTful API for managing blog posts and comments, built with Node.js, Express, and MongoDB.

## Live Demo

The API is deployed and accessible at: [https://blog-api-virid-phi.vercel.app/](https://blog-api-virid-phi.vercel.app/)

## Overview

This Blog API provides endpoints for creating, reading, updating, and deleting blog posts and comments. It features user authentication, post categorization, and comment management.

## Features

- User authentication and authorization
- CRUD operations for blog posts
- Comment system for posts
- Category-based organization
- RESTful architecture
- MongoDB integration
- Token-based authentication

## Tech Stack

- Node.js
- Express.js
- MongoDB
- JWT for authentication & bcrypt for password hashing


## Setup and Installation

### Prerequisites
- Node.js and npm
- MongoDB instance (local or Atlas)

### Installation Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/YoussefGoma/Blog-API.git
   cd Blog-API
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory with the following variables:
   ```
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   PORT=3000
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. The API will be available at `http://localhost:3000`

## License

This project is open source and available under the [MIT License](LICENSE).