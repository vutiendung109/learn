const User = require('../models/User');
const Course = require('../models/Course');
const Review = require('../models/Review');
// const Discount = require('../models/Discount');
// const Order = require('../models/Order');
// const BlogPost = require('../models/BlogPost');

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.getAll();
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateUserRole = async (req, res) => {
  // Implement this function
};

exports.deleteUser = async (req, res) => {
  // Implement this function
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
  // Implement this function
};

exports.getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.getAll();
    res.json(reviews);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.deleteReview = async (req, res) => {
  // Implement this function
};

// // New functions for discounts
// exports.getAllDiscounts = async (req, res) => {
//   try {
//     const discounts = await Discount.getAll();
//     res.json(discounts);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// exports.createDiscount = async (req, res) => {
//   // Implement this function
// };

// exports.updateDiscount = async (req, res) => {
//   // Implement this function
// };

// exports.deleteDiscount = async (req, res) => {
//   // Implement this function
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