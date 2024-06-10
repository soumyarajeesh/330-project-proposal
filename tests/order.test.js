const request = require('supertest');
const mongoose = require('mongoose');
const User = require('../models/user');
const Product = require('../models/product');
const Order = require('../models/order');
const { connectDB, disconnectDB, clearDB, startServer, stopServer } = require('../test-utils');
const bcrypt = require('bcryptjs');

let server;
let userToken;
let product;
let user;

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
    role: 'user',
  };

  const hashedPassword = await bcrypt.hash(userData.password, 10);
  user = new User({
    ...userData,
    password: hashedPassword,
  });
  await user.save();

  const res = await request(server)
    .post('/api/auth/login')
    .send({ email: userData.email, password: userData.password })
    .expect(200);

  userToken = res.body.token;

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

describe('Order Routes', () => {
  it('should create a new order', async () => {
    const orderData = {
      productDetails: [
        {
          product: product._id,
          quantity: 2,
          price: 29.99,
        },
      ],
      totalPrice: 59.98,
      status: 'Pending',
    };

    const res = await request(server)
      .post('/api/orders')
      .set('Authorization', `Bearer ${userToken}`)
      .send(orderData)
      .expect(201);

    expect(res.body).toHaveProperty('_id');
    expect(res.body.productDetails[0].product).toEqual(product._id.toString());
  });

  it('should get all orders', async () => {
    await Order.create({
      user: user._id,
      productDetails: [
        {
          product: product._id,
          quantity: 2,
          price: 29.99,
        },
      ],
      totalPrice: 59.98,
      status: 'Pending',
    });

    const res = await request(server)
      .get('/api/orders')
      .set('Authorization', `Bearer ${userToken}`)
      .expect(200);

    expect(res.body.length).toBeGreaterThanOrEqual(1);
  });

  it('should get an order by ID', async () => {
    const order = await Order.create({
      user: user._id,
      productDetails: [
        {
          product: product._id,
          quantity: 2,
          price: 29.99,
        },
      ],
      totalPrice: 59.98,
      status: 'Pending',
    });

    const res = await request(server)
      .get(`/api/orders/${order._id}`)
      .set('Authorization', `Bearer ${userToken}`)
      .expect(200);

    expect(res.body._id).toEqual(order._id.toString());
  });

  it('should update an order by ID', async () => {
    const order = await Order.create({
      user: user._id,
      productDetails: [
        {
          product: product._id,
          quantity: 2,
          price: 29.99,
        },
      ],
      totalPrice: 59.98,
      status: 'Pending',
    });

    const res = await request(server)
      .put(`/api/orders/${order._id}`)
      .set('Authorization', `Bearer ${userToken}`)
      .send({ status: 'Shipped' })
      .expect(200);

    expect(res.body.status).toBe('Shipped');
  });

  it('should delete an order by ID', async () => {
    const order = await Order.create({
      user: user._id,
      productDetails: [
        {
          product: product._id,
          quantity: 2,
          price: 29.99,
        },
      ],
      totalPrice: 59.98,
      status: 'Pending',
    });

    const res = await request(server)
      .delete(`/api/orders/${order._id}`)
      .set('Authorization', `Bearer ${userToken}`)
      .expect(200);

    const foundOrder = await Order.findById(order._id);
    expect(foundOrder).toBeNull();
  });
});

