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
        const sections = await Section.getAll();
        res.status(200).json(sections);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getSectionById = async (req, res) => {
    try {
        const section = await Section.getById(req.params.id);
        res.status(200).json(section);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// exports.getSectionsByCourseId = async (req, res) => {
//     const courseId = req.params.courseId;
//     try {
//         // Lấy dữ liệu từ cơ sở dữ liệu
//         const sections = await Section.getAll(); // Lấy tất cả các section

//         // Lọc các sections theo courseId
//         const filteredSections = sections.filter(section => section.course_id === parseInt(courseId));
        
//         res.json(filteredSections);
//     } catch (error) {
//         console.error('Error fetching sections:', error);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// };

exports.getSectionsByCourseId = async (req, res) => {
    const courseId = parseInt(req.params.courseId, 10); // Chuyển đổi thành số nguyên

    try {
        // Lấy tất cả các section
        const sections = await Section.getAll();

        if (!Array.isArray(sections)) {
            throw new Error('Dữ liệu trả về từ cơ sở dữ liệu không phải là mảng');
        }

        // Lọc các sections theo courseId
        const filteredSections = sections.filter(section => section.course_id === courseId);

        res.status(200).json(filteredSections); // Trả về danh sách các section đã lọc
    } catch (error) {
        console.error('Error fetching sections:', error);
        res.status(500).json({ error: 'Internal Server Error' });
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
