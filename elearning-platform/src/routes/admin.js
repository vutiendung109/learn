

const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const authMiddleware = require('../middleware/auth');
const checkAdminRole = require('../middleware/checkAdminRole.js');




router.use(authMiddleware);
router.use(checkAdminRole);

// User management
router.get('/users', adminController.getAllUsers);
router.put('/users/:userId/role', adminController.updateUserRole);
router.delete('/users/:userId', adminController.deleteUser);

// Course management
router.get('/courses', adminController.getAllCourses);
router.delete('/courses/:courseId', adminController.deleteCourse);

module.exports = router;