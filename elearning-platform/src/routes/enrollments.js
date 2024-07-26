const express = require('express');
const router = express.Router();
const enrollmentController = require('../controllers/enrollmentController');
const authMiddleware = require('../middleware/auth');

const checkRole = require('../middleware/checkRole');



router.post('/', authMiddleware, enrollmentController.enrollCourse);
router.get('/user', authMiddleware, enrollmentController.getUserEnrollments);
router.get('/course/:courseId', authMiddleware, enrollmentController.getCourseEnrollments);
// Chỉ cho phép giảng viên xem danh sách đăng ký của khóa học
router.get('/course/:courseId', authMiddleware, checkRole('instructor'), enrollmentController.getCourseEnrollments);

module.exports = router;