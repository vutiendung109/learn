const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');
const authMiddleware = require('../middleware/auth');
const paginationMiddleware = require('../middleware/pagination');

router.get('/search', paginationMiddleware, courseController.searchCourses);

// router.post('/', authMiddleware, courseController.createCourse);
// router.get('/', courseController.getAllCourses);
// router.get('/:id', courseController.getCourseById);
// router.put('/:id', authMiddleware, courseController.updateCourse);
// router.delete('/:id', authMiddleware, courseController.deleteCourse);
// //4.5 tìm kiếm , lọc khoá học
// router.get('/search', courseController.searchCourses);
// // Cập nhật routes Course để sử dụng middleware phân trang
// router.get('/search', paginationMiddleware, courseController.searchCourses);


//  UPDATE: lần 2 chưa có middleware phân trang
router.post('/', courseController.createCourse);
router.get('/', courseController.getCourses);
router.get('/:id', courseController.getCourseById);
router.put('/:id', courseController.updateCourse);
router.delete('/:id', courseController.deleteCourse);




module.exports = router;