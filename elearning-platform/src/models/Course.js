//4.2

const db = require('../config/db');

class Course {
  static async create(course) {
    const [result] = await db.execute(
      `INSERT INTO courses (title, description, content, regular_price, discounted_price, discount_start_date, discount_end_date, image_url)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        course.title,
        course.description,
        course.content,
        course.regular_price,
        course.discounted_price,
        course.discount_start_date,
        course.discount_end_date,
        course.image_url
      ]
    );
    return result.insertId;
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

// static async update(course_id, course) {
//     await db.execute(
//         `UPDATE courses SET title = ?, description = ?, content = ?, regular_price = ?, discounted_price = ?, discount_start_date = ?, discount_end_date = ?, image_url = ? 
//          WHERE course_id = ?`,
//         [course.title, course.description, course.content, course.regular_price, course.discounted_price, course.discount_start_date, course.discount_end_date, course.image_url, course_id]
//     );
   
// }

static async update(course_id, course) {
  const [result] = await db.execute(
      `UPDATE courses SET title = ?, description = ?, content = ?, regular_price = ?, discounted_price = ?, discount_start_date = ?, discount_end_date = ?, image_url = ? 
       WHERE course_id = ?`,
      [course.title, course.description, course.content, course.regular_price, course.discounted_price, course.discount_start_date, course.discount_end_date, course.image_url, course_id]
  );
  return result.affectedRows > 0;
}

static async delete(course_id) {
    await db.execute('DELETE FROM courses WHERE course_id = ?', [course_id]);
}

  // phần này cần xem lại 4.5 tìm kiếm , lọc khoá học
  static async search(query, filters = {}) {
    let sql = 'SELECT * FROM courses WHERE 1=1';
    const params = [];
  
    if (query) {
      sql += ' AND (title LIKE ? OR description LIKE ?)';
      params.push(`%${query}%`, `%${query}%`);
    }
  
    if (filters.minPrice) {
      sql += ' AND price >= ?';
      params.push(filters.minPrice);
    }
  
    if (filters.maxPrice) {
      sql += ' AND price <= ?';
      params.push(filters.maxPrice);
    }
  
    if (filters.instructorId) {
      sql += ' AND instructor_id = ?';
      params.push(filters.instructorId);
    }
  
    const [rows] = await db.execute(sql, params);
    return rows;
  }

  //4.5  Cập nhật model Course để hỗ trợ phân trang
  static async searchWithPagination(query, filters = {}, startIndex, limit) {
    let sql = 'SELECT * FROM courses WHERE 1=1';
    const params = [];
  
    if (query) {
      sql += ' AND (title LIKE ? OR description LIKE ?)';
      params.push(`%${query}%`, `%${query}%`);
    }
  
    if (filters.minPrice) {
      sql += ' AND price >= ?';
      params.push(filters.minPrice);
    }
  
    if (filters.maxPrice) {
      sql += ' AND price <= ?';
      params.push(filters.maxPrice);
    }
  
    if (filters.instructorId) {
      sql += ' AND instructor_id = ?';
      params.push(filters.instructorId);
    }
  
    sql += ' LIMIT ? OFFSET ?';
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
      sql += ' AND price >= ?';
      params.push(filters.minPrice);
    }
  
    if (filters.maxPrice) {
      sql += ' AND price <= ?';
      params.push(filters.maxPrice);
    }
  
    if (filters.instructorId) {
      sql += ' AND instructor_id = ?';
      params.push(filters.instructorId);
    }
  
    const [rows] = await db.execute(sql, params);
    return rows[0].total;
  }


}

module.exports = Course;