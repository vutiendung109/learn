const mysql = require('mysql2/promise');
const db = require('../config/db');

class Lesson {
    static async create(lesson) {
        const [result] = await db.execute(
            `INSERT INTO lessons (section_id, title, summary, video_url) 
             VALUES (?, ?, ?, ?)`,
            [lesson.section_id, lesson.title, lesson.summary, lesson.video_url]
        );
        return result.insertId;
    }

    static async getAll() {
        const [rows] = await db.execute('SELECT * FROM lessons');
        return rows;
    }

    static async getById(lesson_id) {
        const [rows] = await db.execute('SELECT * FROM lessons WHERE lesson_id = ?', [lesson_id]);
        return rows[0];
    }

    static async update(lesson_id, lesson) {
        await db.execute(
            `UPDATE lessons SET section_id = ?, title = ?, summary = ?, video_url = ? 
             WHERE lesson_id = ?`,
            [lesson.section_id, lesson.title, lesson.summary, lesson.video_url, lesson_id]
        );
    }

    static async delete(lesson_id) {
        await db.execute('DELETE FROM lessons WHERE lesson_id = ?', [lesson_id]);
    }
}

module.exports = Lesson;
