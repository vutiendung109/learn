const db = require('../config/db');

class Review {
  static async create(userId, courseId, rating, comment) {
    const [result] = await db.execute(
      'INSERT INTO reviews (user_id, course_id, rating, comment, created_at) VALUES (?, ?, ?, ?, NOW())',
      [userId, courseId, rating, comment]
    );
    return result.insertId;
  }

  static async findByUserAndCourse(userId, courseId) {
    const [rows] = await db.execute(
      'SELECT * FROM reviews WHERE user_id = ? AND course_id = ?',
      [userId, courseId]
    );
    return rows[0];
  }

  static async getByCourse(courseId) {
    const [rows] = await db.execute(
      'SELECT r.*, u.username FROM reviews r ' +
      'JOIN users u ON r.user_id = u.user_id ' +
      'WHERE r.course_id = ?',
      [courseId]
    );
    return rows;
  }

  static async update(reviewId, rating, comment) {
    await db.execute(
      'UPDATE reviews SET rating = ?, comment = ? WHERE review_id = ?',
      [rating, comment, reviewId]
    );
  }

  static async delete(reviewId) {
    await db.execute('DELETE FROM reviews WHERE review_id = ?', [reviewId]);
  }
}

module.exports = Review;