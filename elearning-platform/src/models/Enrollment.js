const db = require('../config/db');

class Enrollment {
  static async create(userId, courseId) {
    const [result] = await db.execute(
      'INSERT INTO enrollments (user_id, course_id, enrollment_date) VALUES (?, ?, NOW())',
      [userId, courseId]
    );
    return result.insertId;
  }

  static async findByUserAndCourse(userId, courseId) {
    const [rows] = await db.execute(
      'SELECT * FROM enrollments WHERE user_id = ? AND course_id = ?',
      [userId, courseId]
    );
    return rows[0];
  }

  static async getByUser(userId) {
    const [rows] = await db.execute(
      'SELECT e.*, c.title, c.description FROM enrollments e ' +
      'JOIN courses c ON e.course_id = c.course_id ' +
      'WHERE e.user_id = ?',
      [userId]
    );
    return rows;
  }

  static async getByCourse(courseId) {
    const [rows] = await db.execute(
      'SELECT e.*, u.username, u.email FROM enrollments e ' +
      'JOIN users u ON e.user_id = u.user_id ' +
      'WHERE e.course_id = ?',
      [courseId]
    );
    return rows;
  }

  static async deleteByUserId(userId) {
    await db.execute('DELETE FROM enrollments WHERE user_id = ?', [userId]);
  }
}

module.exports = Enrollment;
