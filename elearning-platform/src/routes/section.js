const express = require('express');
const router = express.Router();
const sectionController = require('../controllers/sectionController');

// Route cho việc lấy các sections của một khóa học
router.get('/courses/:courseId/sections', sectionController.getSectionsByCourseId);

// Routes cho các chức năng CRUD của Section
router.post('/', sectionController.createSection);
router.get('/', sectionController.getSections);
router.get('/:id', sectionController.getSectionById);
router.put('/:id', sectionController.updateSection);
router.delete('/:id', sectionController.deleteSection);

module.exports = router;
