import React, { useState, useEffect } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import { CheckSquare, Loader } from 'lucide-react';
import TodoForm from './components/TodoForm';
import TodoItem from './components/TodoItem';
import TodoStats from './components/TodoStats';
import TodoFilters from './components/TodoFilters';
import EditTodoModal from './components/EditTodoModal';
import { todoApi } from './services/api';
import { Todo, CreateTodoData, UpdateTodoData } from './types/todo';

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'completed' | 'pending'>('all');
  const [filterPriority, setFilterPriority] = useState<'all' | 'high' | 'medium' | 'low'>('all');
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // Load todos on component mount
  useEffect(() => {
    loadTodos();
  }, []);

  const loadTodos = async () => {
    try {
      setLoading(true);
      const todosData = await todoApi.getTodos();
      setTodos(todosData);
    } catch (error) {
      toast.error('Failed to load todos');
      console.error('Error loading todos:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTodo = async (todoData: CreateTodoData) => {
    try {
      const newTodo = await todoApi.createTodo(todoData);
      setTodos(prev => [newTodo, ...prev]);
      toast.success('Todo created successfully!');
    } catch (error) {
      toast.error('Failed to create todo');
      console.error('Error creating todo:', error);
    }
  };

  const handleToggleTodo = async (id: string) => {
    try {
      const updatedTodo = await todoApi.toggleTodo(id);
      setTodos(prev => prev.map(todo => 
        todo._id === id ? updatedTodo : todo
      ));
      toast.success(updatedTodo.completed ? 'Todo completed!' : 'Todo reopened!');
    } catch (error) {
      toast.error('Failed to update todo');
      console.error('Error toggling todo:', error);
    }
  };

  const handleDeleteTodo = async (id: string) => {
    try {
      await todoApi.deleteTodo(id);
      setTodos(prev => prev.filter(todo => todo._id !== id));
      toast.success('Todo deleted successfully!');
    } catch (error) {
      toast.error('Failed to delete todo');
      console.error('Error deleting todo:', error);
    }
  };

  const handleEditTodo = (todo: Todo) => {
    setEditingTodo(todo);
    setIsEditModalOpen(true);
  };

  const handleUpdateTodo = async (id: string, todoData: UpdateTodoData) => {
    try {
      const updatedTodo = await todoApi.updateTodo(id, todoData);
      setTodos(prev => prev.map(todo => 
        todo._id === id ? updatedTodo : todo
      ));
      setIsEditModalOpen(false);
      setEditingTodo(null);
      toast.success('Todo updated successfully!');
    } catch (error) {
      toast.error('Failed to update todo');
      console.error('Error updating todo:', error);
    }
  };

  // Filter todos based on search term, status, and priority
  const filteredTodos = todos.filter(todo => {
    const matchesSearch = todo.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (todo.description && todo.description.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesStatus = filterStatus === 'all' || 
                         (filterStatus === 'completed' && todo.completed) ||
                         (filterStatus === 'pending' && !todo.completed);
    
    const matchesPriority = filterPriority === 'all' || todo.priority === filterPriority;
    
    return matchesSearch && matchesStatus && matchesPriority;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <Loader className="w-12 h-12 text-primary-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600 text-lg">Loading your todos...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Toaster position="top-right" />
      
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-primary-600 rounded-xl">
              <CheckSquare className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-800">Todo Master</h1>
          </div>
          <p className="text-gray-600 text-lg">Organize your tasks efficiently and boost productivity</p>
        </div>

        {/* Stats */}
        <TodoStats todos={todos} />

        {/* Todo Form */}
        <TodoForm onSubmit={handleCreateTodo} />

        {/* Filters */}
        <TodoFilters
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          filterStatus={filterStatus}
          onFilterChange={setFilterStatus}
          filterPriority={filterPriority}
          onPriorityChange={setFilterPriority}
        />

        {/* Todo List */}
        <div className="space-y-4">
          {filteredTodos.length === 0 ? (
            <div className="text-center py-12">
              <CheckSquare className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-500 mb-2">
                {todos.length === 0 ? 'No todos yet' : 'No todos match your filters'}
              </h3>
              <p className="text-gray-400">
                {todos.length === 0 
                  ? 'Create your first todo to get started!' 
                  : 'Try adjusting your search or filter criteria'
                }
              </p>
            </div>
          ) : (
            filteredTodos.map(todo => (
              <TodoItem
                key={todo._id}
                todo={todo}
                onToggle={handleToggleTodo}
                onDelete={handleDeleteTodo}
                onEdit={handleEditTodo}
              />
            ))
          )}
        </div>

        {/* Edit Modal */}
        <EditTodoModal
          todo={editingTodo}
          isOpen={isEditModalOpen}
          onClose={() => {
            setIsEditModalOpen(false);
            setEditingTodo(null);
          }}
          onSave={handleUpdateTodo}
        />
      </div>
    </div>
  );
}

export default App;