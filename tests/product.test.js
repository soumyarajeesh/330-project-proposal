
const request = require('supertest');
const mongoose = require('mongoose');
const User = require('../models/user');
const Product = require('../models/product');
const { connectDB, disconnectDB, clearDB, startServer, stopServer } = require('../test-utils');
const bcrypt = require('bcryptjs');

let server;
let adminToken;
let product;

beforeAll(async () => {
  await connectDB();
});

afterAll(async () => {
  await disconnectDB();
});

beforeEach(async () => {
  await clearDB();
  server = await startServer();

  const adminData = {
    name: 'Admin User',
    email: 'admin@example.com',
    password: 'password123',
    role: 'admin',
  };

  const hashedPassword = await bcrypt.hash(adminData.password, 10);
  const admin = new User({
    ...adminData,
    password: hashedPassword,
  });
  await admin.save();

  const res = await request(server)
    .post('/api/auth/login')
    .send({ email: adminData.email, password: adminData.password })
    .expect(200);

  adminToken = res.body.token;

  const productData = {
    name: 'Sample Product',
    description: 'This is a sample product',
    price: 29.99,
    category: 'Sample Category',
    images: ['image1.jpg', 'image2.jpg'],
  };

  product = new Product(productData);
  await product.save();
});

afterEach(async () => {
  await clearDB();
  await stopServer();
  if (server && server.close) {
    await server.close();
  }
});

describe('Product Routes', () => {
  it('should create a new product', async () => {
    const productData = {
      name: 'New Product',
      description: 'This is a new product',
      price: 49.99,
      category: 'New Category',
      images: ['image3.jpg', 'image4.jpg'],
    };

    const res = await request(server)
      .post('/api/products')
      .set('Authorization', `Bearer ${adminToken}`)
      .send(productData)
      .expect(201);

    expect(res.body).toHaveProperty('_id');
    expect(res.body.name).toBe(productData.name);
  });

  it('should get all products', async () => {
    const res = await request(server).get('/api/products').expect(200);

    expect(res.body.length).toBeGreaterThanOrEqual(1);
    expect(res.body[0].name).toBe(product.name);
  });

  it('should get a product by ID', async () => {
    const res = await request(server).get(`/api/products/${product._id}`).expect(200);

    expect(res.body._id).toEqual(product._id.toString());
  });

  it('should update a product by ID', async () => {
    const res = await request(server)
      .put(`/api/products/${product._id}`)
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ name: 'Updated Product' })
      .expect(200);

    expect(res.body.name).toBe('Updated Product');
  });

  it('should delete a product by ID', async () => {
    const res = await request(server)
      .delete(`/api/products/${product._id}`)
      .set('Authorization', `Bearer ${adminToken}`)
      .expect(200);

    const foundProduct = await Product.findById(product._id);
    expect(foundProduct).toBeNull();
  });
});

