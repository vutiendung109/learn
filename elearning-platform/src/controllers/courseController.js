//4.2
const Course = require('../models/Course');

exports.createCourse = async (req, res) => {
  try {
    const { title, description, price } = req.body;
    const instructorId = req.user.userId; // Lấy từ middleware xác thực

    const courseId = await Course.create(title, description, instructorId, price);

    res.status(201).json({ message: 'Course created successfully', courseId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getAllCourses = async (req, res) => {
  try {
    const courses = await Course.getAll();
    res.json(courses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getCourseById = async (req, res) => {
  try {
    const courseId = req.params.id;
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    res.json(course);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateCourse = async (req, res) => {
  try {
    const courseId = req.params.id;
    const { title, description, price } = req.body;

    await Course.update(courseId, title, description, price);
    res.json({ message: 'Course updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.deleteCourse = async (req, res) => {
  try {
    const courseId = req.params.id;
    await Course.delete(courseId);
    res.json({ message: 'Course deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }

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


