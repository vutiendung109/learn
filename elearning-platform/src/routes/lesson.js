const express = require('express');
const router = express.Router();
const lessonController = require('../controllers/lessonController');

// Routes cho các chức năng CRUD của Lesson
router.post('/', lessonController.createLesson);
router.get('/', lessonController.getLessons);
router.get('/:id', lessonController.getLessonById);
router.put('/:id', lessonController.updateLesson);
router.delete('/:id', lessonController.deleteLesson);

module.exports = router;
