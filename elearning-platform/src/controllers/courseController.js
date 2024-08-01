//4.2
const Course = require('../models/Course');


exports.createCourse = async (req, res) => {
    try {
        const courseId = await Course.create(req.body);
        res.status(201).json({ message: 'Course created', courseId });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getCourses = async (req, res) => {
    try {
        const courses = await Course.getAll();
        res.status(200).json(courses);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getCourseById = async (req, res) => {
    try {
        const course = await Course.getById(req.params.id);
        res.status(200).json(course);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateCourse = async (req, res) => {
    try {
        await Course.update(req.params.id, req.body);
        res.status(200).json({ message: 'Course updated' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteCourse = async (req, res) => {
    try {
        await Course.delete(req.params.id);
        res.status(200).json({ message: 'Course deleted' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

  //4.5 tìm kiếm , lọc khoá học
  exports.searchCourses = async (req, res) => {
    try {
      const { query, minPrice, maxPrice, instructorId } = req.query;
      const filters = { minPrice, maxPrice, instructorId };
  
      const courses = await Course.search(query, filters);
      res.json(courses);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  };


// 4.5 Cập nhật controller Course để sử dụng phân trang
exports.searchCourses = async (req, res) => {
  try {
    const { query, minPrice, maxPrice, instructorId } = req.query;
    const filters = { minPrice, maxPrice, instructorId };
    const { startIndex, limit, page } = req.pagination;

    const courses = await Course.searchWithPagination(query, filters, startIndex, limit);
    const totalCount = await Course.getTotalCount(query, filters);

    res.json({
      courses,
      currentPage: page,
      totalPages: Math.ceil(totalCount / limit),
      totalCount
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};


