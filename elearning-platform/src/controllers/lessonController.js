const Lesson = require('../models/Lesson');

exports.createLesson = async (req, res) => {
    try {
        const lessonId = await Lesson.create(req.body);
        res.status(201).json({ message: 'Lesson created', lessonId });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getLessons = async (req, res) => {
    try {
        const lessons = await Lesson.getAll();
        res.status(200).json(lessons);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getLessonById = async (req, res) => {
    try {
        const lesson = await Lesson.getById(req.params.id);
        res.status(200).json(lesson);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateLesson = async (req, res) => {
    try {
        await Lesson.update(req.params.id, req.body);
        res.status(200).json({ message: 'Lesson updated' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteLesson = async (req, res) => {
    try {
        await Lesson.delete(req.params.id);
        res.status(200).json({ message: 'Lesson deleted' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
