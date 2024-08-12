const User = require('../models/User'); // Chỉ khai báo một lần ở đây
const Course = require('../models/Course');
const Review = require('../models/Review');
const path = require('path');
const Enrollment = require('../models/Enrollment'); // Thêm model này
// const Discount = require('../models/Discount');
// const Order = require('../models/Order');
// const BlogPost = require('../models/BlogPost');

const bcrypt = require('bcrypt'); // Thêm thư viện bcrypt để hash mật khẩu

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.getAll();
    res.json(users);
  } catch (error) {
    console.error('Error fetching users from database:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.createUser = async (req, res) => {
  try {
      const { username, password, email, fullName, role } = req.body;
      const profilePicture = req.file ? req.file.path : '../../assets/img/default-avatar.jpg'; // Đảm bảo đường dẫn ảnh mặc định đúng

      if (!username || !password || !email || !fullName) {
          return res.status(400).json({ message: 'Missing required fields' });
      }

      // Hash mật khẩu trước khi lưu vào database
      const hashedPassword = await bcrypt.hash(password, 10);

      await User.create({
          username,
          password: hashedPassword,
          email,
          full_name: fullName,
          profile_picture: profilePicture,
          role: role || 'user',
      });

      res.status(201).json({ message: 'Người dùng đã được thêm thành công!' });
  } catch (err) {
      console.error('Lỗi khi thêm người dùng:', err);
      res.status(500).json({ message: 'Đã xảy ra lỗi khi thêm người dùng.' });
  }
};

exports.deleteUser = async (req, res) => {
  const { userId } = req.params;
  try {
    await User.delete(userId);
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Lấy thông tin người dùng
exports.getUser = async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await User.findById(userId); // Cập nhật model để có hàm findById
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Cập nhật thông tin người dùng
exports.getUserById = async (req, res) => {
  const { userId } = req.params;
  try {
      const user = await User.findById(userId);
      if (user) {
          res.json(user);
      } else {
          res.status(404).json({ message: 'User not found' });
      }
  } catch (error) {
      console.error('Error fetching user:', error);
      res.status(500).json({ message: 'Server error' });
  }
};

exports.updateUser = async (req, res) => {
  const { userId } = req.params;
  const { username, email, password, fullName, profilePicture, role } = req.body;
  
  try {
    const user = await User.findById(userId); // Cập nhật model để có hàm findById

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Nếu mật khẩu mới được cung cấp, hash mật khẩu
    const hashedPassword = password ? await bcrypt.hash(password, 10) : user.password;

    await User.update(userId, {
      username,
      email,
      password: hashedPassword,
      full_name: fullName,
      profile_picture: profilePicture || user.profile_picture,
      role: role || user.role
    });

    res.json({ message: 'User updated successfully' });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// cấp quyền
//lấy danh sách 
exports.getUserPermissions = async (req, res) => {
  const { userId } = req.params;
  try {
      const user = await User.findById(userId);
      if (user) {
          const enrollments = await User.getUserEnrollments(userId); // Giả sử bạn có phương thức lấy quyền (enrollments)
          user.enrollments = enrollments;
          res.json(user);
      } else {
          res.status(404).json({ message: 'User not found' });
      }
  } catch (error) {
      console.error('Error fetching user permissions:', error);
      res.status(500).json({ message: 'Server error' });
  }
};


exports.updatePermissions = async (req, res) => {
    try {
        const { userId } = req.params;
        const { courses } = req.body;

        if (!courses || !Array.isArray(courses)) {
            return res.status(400).json({ message: 'Invalid data' });
        }

        // Logic để cập nhật quyền của người dùng (enroll các khóa học mới)
        await User.updateUserPermissions(userId, courses);

        res.status(200).json({ message: 'Permissions updated successfully' });
    } catch (error) {
        console.error('Error updating user permissions:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

//xoa quyen xem kh
exports.removePermission = async (req, res) => {
  const { userId, courseId } = req.params;

  try {
      const success = await User.removeUserPermission(userId, courseId);
      if (success) {
          res.status(200).json({ message: 'Permission removed successfully' });
      } else {
          res.status(400).json({ message: 'Failed to remove permission' });
      }
  } catch (error) {
      console.error('Error removing permission:', error);
      res.status(500).json({ message: 'Server error' });
  }
};

exports.updateUserRole = async (req, res) => {
  const { userId } = req.params;
  const { role } = req.body;
  try {
    await User.updateRole(userId, role);
    res.json({ message: 'User role updated successfully' });
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

exports.deleteCourse = async (req, res) => {
  const { courseId } = req.params;
  try {
    await Course.delete(courseId);
    res.json({ message: 'Course deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.hasPermission = async (req, res) => {
  const { userId, courseId } = req.params;

  try {
      const enrollment = await Enrollment.findByUserAndCourse(userId, courseId);
      if (enrollment) {
          res.status(200).json(true); // Có quyền
      } else {
          res.status(403).json(false); // Không có quyền
      }
  } catch (error) {
      console.error('Lỗi khi kiểm tra quyền:', error);
      res.status(500).json({ message: 'Server error' });
  }
};