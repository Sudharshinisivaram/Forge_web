import React from 'react';
import { Filter, Search } from 'lucide-react';

interface TodoFiltersProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  filterStatus: 'all' | 'completed' | 'pending';
  onFilterChange: (status: 'all' | 'completed' | 'pending') => void;
  filterPriority: 'all' | 'high' | 'medium' | 'low';
  onPriorityChange: (priority: 'all' | 'high' | 'medium' | 'low') => void;
}

const TodoFilters: React.FC<TodoFiltersProps> = ({
  searchTerm,
  onSearchChange,
  filterStatus,
  onFilterChange,
  filterPriority,
  onPriorityChange
}) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-6 animate-fade-in">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-primary-100 rounded-lg">
          <Filter className="w-5 h-5 text-primary-600" />
        </div>
        <h2 className="text-lg font-semibold text-gray-800">Filter & Search</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search todos..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
          />
        </div>

        <select
          value={filterStatus}
          onChange={(e) => onFilterChange(e.target.value as 'all' | 'completed' | 'pending')}
          className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
        >
          <option value="all">All Status</option>
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
        </select>

        <select
          value={filterPriority}
          onChange={(e) => onPriorityChange(e.target.value as 'all' | 'high' | 'medium' | 'low')}
          className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
        >
          <option value="all">All Priorities</option>
          <option value="high">High Priority</option>
          <option value="medium">Medium Priority</option>
          <option value="low">Low Priority</option>
        </select>
      </div>
    </div>
  );
};

export default TodoFilters;