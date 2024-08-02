//4.2
const Course = require('../models/Course');

exports.createCourse = async (req, res) => {
    console.log('Dữ liệu nhận được:', req.body);

    try {
        const courseData = {
          title: req.body.title || null,
          description: req.body.description || null,
          content: req.body.content || null,
          regular_price: req.body.regular_price || null,
          discounted_price: req.body.discounted_price || null,
          discount_start_date: req.body.discount_start_date || null,
          discount_end_date: req.body.discount_end_date || null,
          image_url: req.body.image_url || null
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
      let startIndex = 0;
      let limit = 10;
      let page = 1;

      if (req.pagination) {
          ({ startIndex, limit, page } = req.pagination);
      }

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
    console.log('Updating course with ID:', req.params.id);
    console.log('Received data:', req.body);
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
        const deleted = await Course.delete(req.params.id);
        if (!deleted) {
            return res.status(404).json({ message: 'Không tìm thấy khóa học để xóa' });
        }
        res.status(200).json({ message: 'Khóa học đã được xóa' });
    } catch (error) {
        console.error('Lỗi khi xóa khóa học:', error);
        res.status(500).json({ message: 'Lỗi server khi xóa khóa học', error: error.message });
    }
};

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
        console.error('Lỗi khi tìm kiếm khóa học:', error);
        res.status(500).json({ message: 'Lỗi server khi tìm kiếm khóa học', error: error.message });
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


