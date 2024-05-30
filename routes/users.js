/*const express = require('express');
const { protect, admin } = require('../middleware/authMiddleware');
const router = express.Router();

// Example of a protected route
router.get('/profile', protect, (req, res) => {
  res.json(req.user);
});

// Example of an admin-only route
router.get('/admin', protect, admin, (req, res) => {
  res.send('Admin content');
});

module.exports = router;*/

const express = require('express');
const { getUserProfile, updateUserProfile, getAllUsers, deleteUser } = require('../controllers/userController');
const { protect, admin } = require('../middleware/authMiddleware');
const router = express.Router();

// User profile routes
router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile);

// Admin routes
router.route('/').get(protect, admin, getAllUsers);
router.route('/:id').delete(protect, admin, deleteUser);

module.exports = router;
