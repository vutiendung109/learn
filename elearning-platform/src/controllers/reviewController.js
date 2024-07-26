const Review = require('../models/Review');
const Course = require('../models/Course');
const Enrollment = require('../models/Enrollment');

exports.createReview = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { courseId, rating, comment } = req.body;

    // Kiểm tra xem khóa học có tồn tại không
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    // Kiểm tra xem người dùng đã đăng ký khóa học này chưa
    const enrollment = await Enrollment.findByUserAndCourse(userId, courseId);
    if (!enrollment) {
      return res.status(403).json({ message: 'You must be enrolled in the course to leave a review' });
    }

    // Kiểm tra xem người dùng đã đánh giá khóa học này chưa
    const existingReview = await Review.findByUserAndCourse(userId, courseId);
    if (existingReview) {
      return res.status(400).json({ message: 'You have already reviewed this course' });
    }

    const reviewId = await Review.create(userId, courseId, rating, comment);
    res.status(201).json({ message: 'Review created successfully', reviewId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getCourseReviews = async (req, res) => {
  try {
    const { courseId } = req.params;
    const reviews = await Review.getByCourse(courseId);
    res.json(reviews);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateReview = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { reviewId } = req.params;
    const { rating, comment } = req.body;

    const review = await Review.findByUserAndCourse(userId, reviewId);
    if (!review) {
      return res.status(404).json({ message: 'Review not found or you are not authorized to update it' });
    }

    await Review.update(reviewId, rating, comment);
    res.json({ message: 'Review updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.deleteReview = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { reviewId } = req.params;

    const review = await Review.findByUserAndCourse(userId, reviewId);
    if (!review) {
      return res.status(404).json({ message: 'Review not found or you are not authorized to delete it' });
    }

    await Review.delete(reviewId);
    res.json({ message: 'Review deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};