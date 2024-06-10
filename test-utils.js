const mongoose = require('mongoose');
const { app } = require('./server'); // Only import app here, not the server itself

let server;

const connectDB = async () => {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }
};

const disconnectDB = async () => {
  if (mongoose.connection.readyState !== 0) {
    await mongoose.disconnect();
  }
};

const clearDB = async () => {
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    const collection = collections[key];
    await collection.deleteMany({});
  }
};

const startServer = () => {
  return new Promise((resolve) => {
    server = app.listen(0, () => {
      console.log('Test server running');
      resolve(server);
    });
  });
};

const stopServer = () => {
  return new Promise((resolve, reject) => {
    if (server) {
      server.close((err) => {
        if (err) return reject(err);
        console.log('Test server stopped');
        resolve();
      });
    } else {
      resolve();
    }
  });
};

module.exports = {
  connectDB,
  disconnectDB,
  clearDB,
  startServer,
  stopServer,
};

