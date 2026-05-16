import { useState, useEffect } from 'react';
import { useTodos } from './hooks/useTodos';
import Header from './components/Header';
import TodoInput from './components/TodoInput';
import FilterBar from './components/FilterBar';
import TodoList from './components/TodoList';

export default function App() {
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem('darkMode') === 'true');

  useEffect(() => {
    localStorage.setItem('darkMode', String(darkMode));
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  const {
    todos,
    filter,
    searchQuery,
    activeCount,
    completedCount,
    addTodo,
    toggleTodo,
    deleteTodo,
    editTodo,
    clearCompleted,
    setFilter,
    setSearchQuery,
  } = useTodos();

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-violet-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-900 transition-colors duration-300">
      <div className="max-w-xl mx-auto px-4 py-10">
        <Header darkMode={darkMode} onToggleDarkMode={() => setDarkMode(d => !d)} />
        <div className="mt-6 bg-white dark:bg-gray-800 rounded-2xl shadow-md border border-gray-100 dark:border-gray-700 overflow-hidden">
          <TodoInput onAdd={addTodo} />
          <FilterBar
            filter={filter}
            searchQuery={searchQuery}
            activeCount={activeCount}
            completedCount={completedCount}
            onFilterChange={setFilter}
            onSearchChange={setSearchQuery}
            onClearCompleted={clearCompleted}
          />
          <TodoList
            todos={todos}
            onToggle={toggleTodo}
            onDelete={deleteTodo}
            onEdit={editTodo}
          />
        </div>
      </div>
    </div>
  );
}
