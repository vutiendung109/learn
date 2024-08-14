const db = require('../config/db');

class User {
  // static async create({ username, email, password, full_name, profile_picture, role }) {
  //   if (!username || !email || !password || !full_name) {
  //     throw new Error('Missing required fields');
  //   }

  //   const [result] = await db.execute(
  //     'INSERT INTO users (username, email, password, full_name, profile_picture, role) VALUES (?, ?, ?, ?, ?, ?)',
  //     [username, email, password, full_name, profile_picture || null, role || 'user']
  //   );
  //   return result.insertId;
  // }

  static async create({ username, email, password, full_name, profile_picture, role }) {
    if (!username || !email || !password || !full_name) {
        throw new Error('Missing required fields');
    }

    // Loại bỏ khoảng trắng ở đầu và cuối username, email, và full_name
    username = username.trim();
    email = email.trim();
    full_name = full_name.trim();

    // Kiểm tra xem username đã tồn tại chưa
    const existingUser = await this.findByUsername(username);
    if (existingUser) {
        throw new Error('Username already exists');
    }

    // Kiểm tra xem email đã tồn tại chưa
    const existingEmail = await this.findByEmail(email);
    if (existingEmail) {
        throw new Error('Email already exists');
    }

    const [result] = await db.execute(
        'INSERT INTO users (username, email, password, full_name, profile_picture, role) VALUES (?, ?, ?, ?, ?, ?)',
        [username, email, password, full_name, profile_picture || null, role || 'user']
    );
    return result.insertId;
}



  static async findById(userId) {
    const [rows] = await db.execute('SELECT * FROM users WHERE user_id = ?', [userId]);
    return rows[0];
  }

  // static async update(userId, { username, email, password, full_name, profile_picture, role }) {
  //   const [result] = await db.execute(
  //     'UPDATE users SET username = ?, email = ?, password = ?, full_name = ?, profile_picture = ?, role = ? WHERE user_id = ?',
  //     [username, email, password, full_name, profile_picture, role, userId]
  //   );
  //   return result.affectedRows > 0;
  // }

  static async update(userId, { username, email, password, full_name, profile_picture, role }) {
    // Loại bỏ khoảng trắng ở đầu và cuối username, email, và full_name
    username = username.trim();
    email = email.trim();
    full_name = full_name.trim();

    const [result] = await db.execute(
        'UPDATE users SET username = ?, email = ?, password = ?, full_name = ?, profile_picture = ?, role = ? WHERE user_id = ?',
        [username, email, password, full_name, profile_picture, role, userId]
    );
    return result.affectedRows > 0;
}


  static async findByEmail(email) {
    const [rows] = await db.execute('SELECT * FROM users WHERE email = ?', [email]);
    return rows[0];
  }

  //4.6

  static async getAll() {
    try {
      const [rows] = await db.execute('SELECT * FROM users');
      return rows;
    } catch (error) {
      console.error('Error fetching users from database:', error);
      throw error;
    }
  }
  
  static async updateRole(userId, role) {
    await db.execute('UPDATE users SET role = ? WHERE user_id = ?', [role, userId]);
  }
  
  static async delete(userId) {
    await db.execute('DELETE FROM users WHERE user_id = ?', [userId]);
  }


  static async findByUsername(username) {
    try {
        // Loại bỏ khoảng trắng ở đầu và cuối username
        const trimmedUsername = username.trim();
        const [rows] = await db.execute('SELECT * FROM users WHERE username = ?', [trimmedUsername]);
        return rows[0];
    } catch (error) {
        console.error('Error finding user by username:', error);
        throw error;
    }
}



  static async getUserEnrollments(userId) {
    try {
        const [rows] = await db.execute(`
            SELECT c.course_id, c.title 
            FROM enrollments e 
            JOIN courses c ON e.course_id = c.course_id 
            WHERE e.user_id = ?
        `, [userId]);
        return rows;
    } catch (error) {
        console.error('Error fetching user enrollments:', error);
        throw error;
    }
}


  static async updateUserPermissions(userId, courseIds) {
    try {
        for (const courseId of courseIds) {
            // Kiểm tra xem quyền này đã tồn tại hay chưa
            const [existing] = await db.execute(
                'SELECT * FROM enrollments WHERE user_id = ? AND course_id = ?',
                [userId, courseId]
            );

            if (existing.length === 0) {
                // Nếu chưa có thì mới thêm quyền
                await db.execute(
                    'INSERT INTO enrollments (user_id, course_id, enrollment_date) VALUES (?, ?, NOW())',
                    [userId, courseId]
                );
            }
        }

        return true; // Trả về true nếu cập nhật thành công
    } catch (error) {
        console.error('Error in updateUserPermissions:', error);
        throw error;
    }
}

static async removeUserPermission(userId, courseId) {
  try {
      await db.execute(
          'DELETE FROM enrollments WHERE user_id = ? AND course_id = ?',
          [userId, courseId]
      );

      return true; // Trả về true nếu xóa thành công
  } catch (error) {
      console.error('Error in removeUserPermission:', error);
      throw error;
  }
}



}




module.exports = User;