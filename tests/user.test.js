const request = require('supertest');
const mongoose = require('mongoose');
const User = require('../models/user');
const { connectDB, disconnectDB, clearDB, startServer, stopServer } = require('../test-utils');
const bcrypt = require('bcryptjs');

let server;
let token;

beforeAll(async () => {
  await connectDB();
});

afterAll(async () => {
  await disconnectDB();
});

beforeEach(async () => {
  await clearDB();
  server = await startServer();

  const userData = {
    name: 'John Doe',
    email: 'john@example.com',
    password: 'password123',
  };

  const hashedPassword = await bcrypt.hash(userData.password, 10);
  const user = new User({
    ...userData,
    password: hashedPassword,
  });
  await user.save();

  const res = await request(server)
    .post('/api/auth/login')
    .send({ email: userData.email, password: userData.password })
    .expect(200);

  token = res.body.token;
  console.log('User Token:', token);
});

afterEach(async () => {
  await clearDB();
  await stopServer();
  if (server && server.close) {
    await server.close();
  }
});

describe('User Routes', () => {
  const userData = {
    name: 'John Doe',
    email: 'john@example.com',
    password: 'password123',
  };

  it('should get user profile', async () => {
    const res = await request(server)
      .get('/api/users/profile')
      .set('Authorization', `Bearer ${token}`)
      .expect(200);

    expect(res.body).toHaveProperty('name', userData.name);
    expect(res.body).toHaveProperty('email', userData.email);
  });

  it('should update user profile', async () => {
    const res = await request(server)
      .put('/api/users/profile')
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'Updated Name' })
      .expect(200);

    expect(res.body.name).toBe('Updated Name');
  });

  it('should not get profile without token', async () => {
    await request(server)
      .get('/api/users/profile')
      .expect(401);
  });
});

