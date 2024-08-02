const db = require('../config/db');

class Section {
    static async create(section) {
        const [result] = await db.execute(
            'INSERT INTO sections (course_id, title, description) VALUES (?, ?, ?)',
            [section.course_id, section.title, section.description]
        );
        return result.insertId;
    }

    static async getAll() {
        const [rows] = await db.execute('SELECT * FROM sections');
        return Array.isArray(rows) ? rows : [];
    }

    static async getById(section_id) {
        const [rows] = await db.execute('SELECT * FROM sections WHERE section_id = ?', [section_id]);
        return rows[0];
    }

    static async update(section_id, section) {
        await db.execute(
            'UPDATE sections SET course_id = ?, title = ?, description = ? WHERE section_id = ?',
            [section.course_id, section.title, section.description, section_id]
        );
    }

    static async delete(section_id) {
        await db.execute('DELETE FROM sections WHERE section_id = ?', [section_id]);
    }
}

module.exports = Section;
