const db = require('../config/db');

class User {
  static async create({ username, email, password, full_name, profile_picture, role }) {
    if (!username || !email || !password || !full_name) {
      throw new Error('Missing required fields');
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

  static async update(userId, { username, email, password, full_name, profile_picture, role }) {
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
      const [rows] = await db.execute('SELECT * FROM users WHERE username = ?', [username]);
      return rows[0];
    } catch (error) {
      console.error('Error finding user by username:', error);
      throw error;
    }
  }

}




module.exports = User;