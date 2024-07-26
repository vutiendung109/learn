const db = require('../config/db');

class User {
  static async create(username, email, password, fullName) {
    const [result] = await db.execute(
      'INSERT INTO users (username, email, password, full_name) VALUES (?, ?, ?, ?)',
      [username, email, password, fullName]
    );
    return result.insertId;
  }

  static async findByEmail(email) {
    const [rows] = await db.execute('SELECT * FROM users WHERE email = ?', [email]);
    return rows[0];
  }

  //4.6

  static async getAll() {
    const [rows] = await db.execute('SELECT * FROM users');
    return rows;
  }
  
  static async updateRole(userId, role) {
    await db.execute('UPDATE users SET role = ? WHERE user_id = ?', [role, userId]);
  }
  
  static async delete(userId) {
    await db.execute('DELETE FROM users WHERE user_id = ?', [userId]);
  }

  

}




module.exports = User;