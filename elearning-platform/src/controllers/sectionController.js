const Section = require('../models/Section');

exports.createSection = async (req, res) => {
    try {
        const sectionId = await Section.create(req.body);
        res.status(201).json({ message: 'Section created', sectionId });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getSections = async (req, res) => {
    try {
        const courseId = req.query.courseId;
        if (!courseId) {
            return res.status(400).json({ error: 'Course ID is required' });
        }
        const sections = await Section.getAll(courseId);
        res.status(200).json(sections);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getSectionById = async (req, res) => {
    try {
        const section = await Section.getById(req.params.id);
        if (!section) {
            return res.status(404).json({ error: 'Section not found' });
        }
        res.status(200).json(section);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateSection = async (req, res) => {
    try {
        await Section.update(req.params.id, req.body);
        res.status(200).json({ message: 'Section updated' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteSection = async (req, res) => {
    try {
        await Section.delete(req.params.id);
        res.status(200).json({ message: 'Section deleted' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};