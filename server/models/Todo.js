import Database from 'better-sqlite3';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Initialize SQLite database
const db = new Database(join(__dirname, '../todos.db'));

// Create todos table if it doesn't exist
db.exec(`
  CREATE TABLE IF NOT EXISTS todos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT,
    completed BOOLEAN DEFAULT FALSE,
    priority TEXT DEFAULT 'medium',
    dueDate TEXT,
    createdAt TEXT DEFAULT CURRENT_TIMESTAMP,
    updatedAt TEXT DEFAULT CURRENT_TIMESTAMP
  )
`);

export class Todo {
  static findAll() {
    const stmt = db.prepare('SELECT * FROM todos ORDER BY createdAt DESC');
    return stmt.all();
  }

  static findById(id) {
    const stmt = db.prepare('SELECT * FROM todos WHERE id = ?');
    return stmt.get(id);
  }

  static create(todoData) {
    const { title, description, priority = 'medium', dueDate } = todoData;
    const stmt = db.prepare(`
      INSERT INTO todos (title, description, priority, dueDate, createdAt, updatedAt)
      VALUES (?, ?, ?, ?, datetime('now'), datetime('now'))
    `);
    const result = stmt.run(title, description, priority, dueDate);
    return this.findById(result.lastInsertRowid);
  }

  static update(id, todoData) {
    const { title, description, completed, priority, dueDate } = todoData;
    const stmt = db.prepare(`
      UPDATE todos 
      SET title = ?, description = ?, completed = ?, priority = ?, dueDate = ?, updatedAt = datetime('now')
      WHERE id = ?
    `);
    stmt.run(title, description, completed, priority, dueDate, id);
    return this.findById(id);
  }

  static delete(id) {
    const stmt = db.prepare('DELETE FROM todos WHERE id = ?');
    const result = stmt.run(id);
    return result.changes > 0;
  }

  static toggleComplete(id) {
    const stmt = db.prepare(`
      UPDATE todos 
      SET completed = NOT completed, updatedAt = datetime('now')
      WHERE id = ?
    `);
    stmt.run(id);
    return this.findById(id);
  }
}

export default Todo;