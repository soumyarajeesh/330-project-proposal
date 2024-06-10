
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config({ path: '/Users/soumyarajeesh/Desktop/project330/UW-SimpleOnlineStore-project/config/config.env' });
console.log(process.env.PORT); 
console.log(process.env.MONGO_URI); 

const connectDB = async () => {
  try {
    console.log('Attempting to connect to MongoDB...');
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected');
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;

