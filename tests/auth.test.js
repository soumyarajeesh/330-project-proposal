const request = require('supertest');
const User = require('../models/user');
const { connectDB, disconnectDB, clearDB, startServer, stopServer } = require('../test-utils');
const bcrypt = require('bcryptjs');

let server;

beforeAll(async () => {
  await connectDB();
});

afterAll(async () => {
  await disconnectDB();
});

beforeEach(async () => {
  await clearDB();
  server = await startServer();
});

afterEach(async () => {
  await stopServer();
});

describe('Auth Routes', () => {
  const userData = {
    name: 'John Doe',
    email: 'john@example.com',
    password: 'password123',
  };

  it('should register a new user', async () => {
    const res = await request(server)
      .post('/api/auth/register')
      .send(userData)
      .expect(201);

    expect(res.body).toHaveProperty('_id');
    expect(res.body).toHaveProperty('token');
  });

  it('should not register a user with an existing email', async () => {
    await User.create({
      name: userData.name,
      email: userData.email,
      password: await bcrypt.hash(userData.password, 10),
    });

    await request(server)
      .post('/api/auth/register')
      .send(userData)
      .expect(400);
  });

  it('should login an existing user', async () => {
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    await User.create({
      name: userData.name,
      email: userData.email,
      password: hashedPassword,
    });

    const res = await request(server)
      .post('/api/auth/login')
      .send({ email: userData.email, password: userData.password })
      .expect(200);

    expect(res.body).toHaveProperty('token');
  });

  it('should not login with incorrect credentials', async () => {
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    await User.create({
      name: userData.name,
      email: userData.email,
      password: hashedPassword,
    });

    await request(server)
      .post('/api/auth/login')
      .send({ email: userData.email, password: 'wrongpassword' })
      .expect(401);
  });
});
