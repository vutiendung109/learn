const Course = require('../models/Course');

exports.createCourse = async (req, res) => {
  try {
    console.log('Received course data:', req.body);
    
    // Validate input data
    if (!req.body.title || !req.body.regular_price) {
      return res.status(400).json({ message: 'Title and regular price are required' });
    }

    const courseData = {
      category_id: req.body.category_id,
      title: req.body.title,
      description: req.body.description,
      content: req.body.content,
      regular_price: req.body.regular_price,
      discounted_price: req.body.discounted_price,
      discount_start_date: req.body.discount_start_date,
      discount_end_date: req.body.discount_end_date,
      image_url: req.body.image_url,
      status: req.body.status || 'draft'
    };

    const courseId = await Course.create(courseData);
    res.status(201).json({ message: 'Khóa học đã được tạo', courseId });
  } catch (error) {
    console.error('Lỗi khi tạo khóa học:', error);
    res.status(500).json({ message: 'Lỗi server khi tạo khóa học', error: error.message });
  }
};

exports.getCourses = async (req, res) => {
  try {
    const { startIndex, limit, page } = req.pagination;
    const courses = await Course.getAll(startIndex, limit);
    const totalCount = await Course.getTotalCount();
    
    res.status(200).json({
      courses,
      currentPage: page,
      totalPages: Math.ceil(totalCount / limit),
      totalCount
    });
  } catch (error) {
    console.error('Lỗi khi lấy danh sách khóa học:', error);
    res.status(500).json({ message: 'Lỗi server khi lấy danh sách khóa học', error: error.message });
  }
};

exports.getCourseById = async (req, res) => {
  try {
    const course = await Course.getById(req.params.id);
    if (!course) {
      return res.status(404).json({ message: 'Không tìm thấy khóa học' });
    }
    res.status(200).json(course);
  } catch (error) {
    console.error('Lỗi khi lấy thông tin khóa học:', error);
    res.status(500).json({ message: 'Lỗi server khi lấy thông tin khóa học', error: error.message });
  }
};

exports.updateCourse = async (req, res) => {
  try {
    const updated = await Course.update(req.params.id, req.body);
    if (!updated) {
      return res.status(404).json({ message: 'Không tìm thấy khóa học để cập nhật' });
    }
    res.status(200).json({ message: 'Khóa học đã được cập nhật' });
  } catch (error) {
    console.error('Lỗi khi cập nhật khóa học:', error);
    res.status(500).json({ message: 'Lỗi server khi cập nhật khóa học', error: error.message });
  }
};

exports.deleteCourse = async (req, res) => {
  try {
    await Course.delete(req.params.id);
    res.status(200).json({ message: 'Khóa học đã được xóa' });
  } catch (error) {
    console.error('Lỗi khi xóa khóa học:', error);
    res.status(500).json({ message: 'Lỗi server khi xóa khóa học', error: error.message });
  }
};

exports.searchCourses = async (req, res) => {
  try {
    const { query, minPrice, maxPrice, categoryId, status } = req.query;
    const filters = { minPrice, maxPrice, categoryId, status };
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
    console.error('Lỗi khi tìm kiếm khóa học:', error);
    res.status(500).json({ message: 'Lỗi server khi tìm kiếm khóa học', error: error.message });
  }
};