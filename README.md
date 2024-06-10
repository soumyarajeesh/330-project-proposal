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

Project Overview
The Simple Online Store API is a RESTful service designed to handle basic operations for an online store. The API allows for user registration and authentication, as well as managing products and orders. This document provides a detailed evaluation of the project's approach, results, learning experiences, and potential improvements.

Self-Evaluation:

Approach and Results

Initial Setup and Structure
The project was structured following the MVC (Model-View-Controller) pattern, which helped in maintaining a clear separation of concerns. The main components included:

Models: Defined the data structure using Mongoose schemas.
Controllers: Handled the business logic and interacted with the models.
Routes: Mapped HTTP requests to controller methods.
Middleware: Included authentication and authorization logic.
This structure made it easier to manage the codebase and ensured that each part of the application had a single responsibility.

Development Process
User Authentication:

Implemented user registration and login endpoints.
Used JWT for secure authentication.
Results: The authentication module worked well and securely managed user sessions.
Product Management:

Created CRUD endpoints for managing products.
Results: The product endpoints were functional, but there were issues with authorization in testing, leading to forbidden errors.
Order Management:

Implemented endpoints to create, retrieve, update, and delete orders.
Results: Most order operations worked correctly, but some tests failed due to internal server errors.

What Worked Well:

Modular Structure: The modular structure using MVC helped in maintaining and expanding the codebase.
Authentication: The implementation of JWT for authentication was effective and provided secure access control.
Testing with Jest: Writing tests using Jest helped in identifying issues early and ensured that the endpoints behaved as expected.

Challenges and Issues:

Authorization Errors: Tests for product routes frequently failed due to authorization issues, resulting in 403 Forbidden errors.
Database Connection Issues: At times, tests failed due to database connection problems, such as address already in use errors.
Test Environment Setup: Ensuring a clean and isolated test environment was challenging, leading to test failures related to port conflicts and database state.
Learning Experiences
Comprehensive Testing: The importance of thorough testing was evident. Writing unit and integration tests helped in identifying bugs and issues that were not apparent during manual testing.
Error Handling: Improved understanding of error handling in Express and Mongoose, which is crucial for building robust APIs.
JWT Authentication: Gained deeper insights into implementing and managing JWT tokens for secure authentication.
Potential Improvements
Enhanced Authorization Logic: Refactor the authorization middleware to ensure it works correctly across all routes and tests.
Improved Error Handling: Implement more granular error handling to provide clearer error messages and avoid internal server errors.
Test Isolation: Enhance the test setup to ensure complete isolation and prevent issues like address conflicts. This might include using different ports or databases for testing.
Documentation: Improve API documentation to provide clear usage instructions for each endpoint, including expected responses and error codes.

What Didn't Work

Initial Testing Setup: The initial setup for testing was problematic, leading to issues with database connections and port conflicts.
Error Reporting in Tests: The error messages in tests were sometimes not descriptive enough to quickly diagnose the issues.
Environment Management: Managing different environments (development, testing, production) was challenging and sometimes led to configuration issues.

Conclusion:

Overall, the Simple Online Store API project was a valuable learning experience. It provided practical insights into building and testing RESTful APIs, handling authentication, and managing application state with a database. While there were challenges, especially with testing and authorization, the project was a significant step towards becoming proficient in backend development with Node.js, Express, and MongoDB. Future improvements will focus on refining the authorization logic, enhancing error handling, and ensuring robust test environments.






