import express from 'express';
import { Todo } from '../models/Todo.js';

const router = express.Router();

// GET /api/todos - Get all todos
router.get('/', (req, res) => {
  try {
    const todos = Todo.findAll();
    res.json(todos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/todos/:id - Get a specific todo
router.get('/:id', (req, res) => {
  try {
    const todo = Todo.findById(req.params.id);
    if (!todo) {
      return res.status(404).json({ error: 'Todo not found' });
    }
    res.json(todo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST /api/todos - Create a new todo
router.post('/', (req, res) => {
  try {
    const todo = Todo.create(req.body);
    res.status(201).json(todo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PUT /api/todos/:id - Update a todo
router.put('/:id', (req, res) => {
  try {
    const todo = Todo.update(req.params.id, req.body);
    if (!todo) {
      return res.status(404).json({ error: 'Todo not found' });
    }
    res.json(todo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE /api/todos/:id - Delete a todo
router.delete('/:id', (req, res) => {
  try {
    const deleted = Todo.delete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: 'Todo not found' });
    }
    res.json({ message: 'Todo deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PATCH /api/todos/:id/toggle - Toggle todo completion status
router.patch('/:id/toggle', (req, res) => {
  try {
    const todo = Todo.toggleComplete(req.params.id);
    if (!todo) {
      return res.status(404).json({ error: 'Todo not found' });
    }
    res.json(todo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;