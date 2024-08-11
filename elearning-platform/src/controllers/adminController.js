const User = require('../models/User');
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

exports.updateUserPermissions = async (req, res) => {
  const { userId } = req.params;
  const { courses } = req.body;

  try {
      await Enrollment.deleteByUserId(userId); // Xóa các đăng ký cũ
      for (const courseId of courses) {
          await Enrollment.create({ userId, courseId });
      }
      res.json({ message: 'User permissions updated successfully' });
  } catch (error) {
      console.error('Error updating user permissions:', error);
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

// exports.getAllReviews = async (req, res) => {
//   try {
//     const reviews = await Review.getAll();
//     res.json(reviews);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// exports.deleteReview = async (req, res) => {
//   const { reviewId } = req.params;
//   try {
//     await Review.delete(reviewId);
//     res.json({ message: 'Review deleted successfully' });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Server error' });
//   }
// };



// // New functions for orders
// exports.getAllOrders = async (req, res) => {
//   try {
//     const orders = await Order.getAll();
//     res.json(orders);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// exports.updateOrderStatus = async (req, res) => {
//   // Implement this function
// };

// // New functions for blog posts
// exports.getAllBlogPosts = async (req, res) => {
//   try {
//     const posts = await BlogPost.getAll();
//     res.json(posts);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// exports.createBlogPost = async (req, res) => {
//   // Implement this function
// };

// exports.updateBlogPost = async (req, res) => {
//   // Implement this function
// };

// exports.deleteBlogPost = async (req, res) => {
//   // Implement this function
// };