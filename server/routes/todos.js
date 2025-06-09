import express from 'express';
import { Todo } from '../models/Todo.js';

const router = express.Router();

// Get all todos
router.get('/', async (req, res) => {
  try {
    const todos = Todo.findAll();
    res.json(todos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a specific todo
router.get('/:id', async (req, res) => {
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

// Create a new todo
router.post('/', async (req, res) => {
  try {
    const { title, description, priority, dueDate } = req.body;
    
    if (!title) {
      return res.status(400).json({ error: 'Title is required' });
    }

    const todo = Todo.create({ title, description, priority, dueDate });
    res.status(201).json(todo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a todo
router.put('/:id', async (req, res) => {
  try {
    const { title, description, completed, priority, dueDate } = req.body;
    
    const existingTodo = Todo.findById(req.params.id);
    if (!existingTodo) {
      return res.status(404).json({ error: 'Todo not found' });
    }

    const todo = Todo.update(req.params.id, { title, description, completed, priority, dueDate });
    res.json(todo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a todo
router.delete('/:id', async (req, res) => {
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

// Toggle todo completion status
router.patch('/:id/toggle', async (req, res) => {
  try {
    const existingTodo = Todo.findById(req.params.id);
    if (!existingTodo) {
      return res.status(404).json({ error: 'Todo not found' });
    }

    const todo = Todo.toggleComplete(req.params.id);
    res.json(todo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;