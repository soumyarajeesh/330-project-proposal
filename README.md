# 330-project-proposal

Project Proposal: Simple Online Store API

1. Project Scenario
This API serves a small online store, allowing customers to browse products, place orders, and submit feedback. Administrators can manage product listings and view detailed sales reports. The store aims to provide a smooth online shopping experience for users while enabling efficient store management for the administrator.

2. Problem Statement
The online retail market is competitive, requiring stores to operate efficiently and respond quickly to consumer needs. This project addresses the need for a flexible, reliable, and easy-to-use system that supports both customer interactions and administrative management. The primary goals are to streamline the product browsing and ordering process for customers and to simplify product and order management for administrators.

3. Technical Components

Data Models:
User: Stores user details, including name, email, password (hashed), and role (admin/customer).
Product: Contains product information like name, description, price, category, and image URLs.
Order: Tracks orders with fields for user reference, product details, quantity, total price, and order status.
Routes:
User Routes: Authentication, user registration, user profile management.
Product Routes: CRUD operations for products, search functionality.
Order Routes: CRUD operations for orders, including placing and updating orders.
External Data Sources:
Optional integration with external APIs for additional product details or payment processing, subject to availability of free tiers.
Advanced Features:
Text search for products.

4. Meeting Project Requirements

Authentication and Authorization: Implemented using JWTs, with separate access levels for customers and administrators.

CRUD Operations: Comprehensive CRUD functionality for users, products, and orders.
Performance Indexes: Indexes on frequently searched fields like product names and categories.
Advanced Features: Text search and sales aggregations to enhance user experience and provide valuable insights to administrators.

Testing: Aim for over 80% test coverage using Jest and Supertest.

5. Project Timeline

Week 1-2: Set up project structure, initialize Node.js and Express. Design and implement database schemas.
          Implement authentication and user management routes. Start on product management routes.
Week 2-3: Complete product and order routes. Implement basic CRUD operations.
          Add advanced features like text search and aggregations. 
Week 3-4: Focus on testing, ensure all routes are thoroughly tested. Start working on documentation.
          Finalize documentation, prepare Postman collections, and prepare for project demonstration.

UPDATE:

completed the below works:

1.Project Initialization:

Initialize Node.js project.
Set up Express server.
Connect to MongoDB using Mongoose.

2.Design Database Schema:

User Schema: name, email, password, role.
Product Schema: name, description, price, category, images.
Order Schema: user, product details, quantity, total price, status.

3.Implement Authentication:

User registration and login routes.
JWT-based authentication.
Middleware for role-based access control.

4.User Routes:

Implement CRUD operations for user profiles.
Secure routes using authentication middleware.

pending work:

Complete CRUD Operations and Add Features
Product Routes:

Implement CRUD operations for products.
Add text search functionality.
Order Routes:

Implement CRUD operations for orders.
Ensure orders are linked to authenticated users.
Indexes and Performance Optimization:

Add indexes to MongoDB collections for performance and uniqueness.
Optimize queries using Mongoose.

Testing:

Write unit and integration tests for all routes.
Aim for test coverage greater than 80%.

