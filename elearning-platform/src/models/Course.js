const db = require('../config/db');

class Course {
  static async create(course) {
    try {
      const [result] = await db.execute(
        `INSERT INTO courses (category_id, title, description, content, regular_price, discounted_price, discount_start_date, discount_end_date, image_url, status)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          course.category_id,
          course.title,
          course.description,
          course.content,
          course.regular_price,
          course.discounted_price,
          course.discount_start_date,
          course.discount_end_date,
          course.image_url,
          course.status
        ]
      );
      return result.insertId;
    } catch (error) {
      console.error('Database error when creating course:', error);
      throw error;
    }
  }

  static async getAll(startIndex, limit) {
    const query = 'SELECT * FROM courses LIMIT ? OFFSET ?';
    const [courses] = await db.query(query, [limit, startIndex]);
    return courses;
  }

  static async getTotalCount() {
    const query = 'SELECT COUNT(*) as total FROM courses';
    const [result] = await db.query(query);
    return result[0].total;
  }

  static async getById(course_id) {
    const [rows] = await db.execute('SELECT * FROM courses WHERE course_id = ?', [course_id]);
    return rows[0];
  }

  static async update(course_id, course) {
    const [result] = await db.execute(
      `UPDATE courses SET category_id = ?, title = ?, description = ?, content = ?, regular_price = ?, discounted_price = ?, discount_start_date = ?, discount_end_date = ?, image_url = ?, status = ? 
       WHERE course_id = ?`,
      [course.category_id, course.title, course.description, course.content, course.regular_price, course.discounted_price, course.discount_start_date, course.discount_end_date, course.image_url, course.status, course_id]
    );
    return result.affectedRows > 0;
  }

  static async delete(course_id) {
    await db.execute('DELETE FROM courses WHERE course_id = ?', [course_id]);
  }

  static async searchWithPagination(query, filters = {}, startIndex, limit) {
    let sql = 'SELECT * FROM courses WHERE 1=1';
    const params = [];

    if (query) {
      sql += ' AND (title LIKE ? OR description LIKE ?)';
      params.push(`%${query}%`, `%${query}%`);
    }

    if (filters.minPrice) {
      sql += ' AND regular_price >= ?';
      params.push(filters.minPrice);
    }

    if (filters.maxPrice) {
      sql += ' AND regular_price <= ?';
      params.push(filters.maxPrice);
    }

    if (filters.categoryId) {
      sql += ' AND category_id = ?';
      params.push(filters.categoryId);
    }

    if (filters.status) {
      sql += ' AND status = ?';
      params.push(filters.status);
    }

    sql += ' ORDER BY created_at DESC LIMIT ? OFFSET ?';
    params.push(limit, startIndex);

    const [rows] = await db.execute(sql, params);
    return rows;
  }

  static async getTotalCount(query, filters = {}) {
    let sql = 'SELECT COUNT(*) as total FROM courses WHERE 1=1';
    const params = [];

    if (query) {
      sql += ' AND (title LIKE ? OR description LIKE ?)';
      params.push(`%${query}%`, `%${query}%`);
    }

    if (filters.minPrice) {
      sql += ' AND regular_price >= ?';
      params.push(filters.minPrice);
    }

    if (filters.maxPrice) {
      sql += ' AND regular_price <= ?';
      params.push(filters.maxPrice);
    }

    if (filters.categoryId) {
      sql += ' AND category_id = ?';
      params.push(filters.categoryId);
    }

    if (filters.status) {
      sql += ' AND status = ?';
      params.push(filters.status);
    }

    const [rows] = await db.execute(sql, params);
    return rows[0].total;
  }
}

module.exports = Course;