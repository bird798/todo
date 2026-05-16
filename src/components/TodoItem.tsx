import { useState } from 'react';
import { Todo } from '../types/todo';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, text: string) => void;
}

const PRIORITY_CONFIG = {
  high:   { label: '높음', dot: 'bg-red-400',   text: 'text-red-500 dark:text-red-400'   },
  medium: { label: '중간', dot: 'bg-amber-400', text: 'text-amber-500 dark:text-amber-400' },
  low:    { label: '낮음', dot: 'bg-blue-400',  text: 'text-blue-500 dark:text-blue-400'  },
};

function formatDate(iso: string) {
  const d = new Date(iso);
  return `${d.getMonth() + 1}월 ${d.getDate()}일`;
}

function isOverdue(iso: string) {
  return new Date(iso) < new Date(new Date().toDateString());
}

export default function TodoItem({ todo, onToggle, onDelete, onEdit }: TodoItemProps) {
  const [editing, setEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  const commitEdit = () => {
    const trimmed = editText.trim();
    if (trimmed) onEdit(todo.id, trimmed);
    else setEditText(todo.text);
    setEditing(false);
  };

  const cfg = PRIORITY_CONFIG[todo.priority];
  const overdue = todo.dueDate && !todo.completed && isOverdue(todo.dueDate);

  return (
    <li className="flex items-start gap-3 px-4 py-3.5 hover:bg-gray-50 dark:hover:bg-gray-700/30 group transition-colors">
      <button
        onClick={() => onToggle(todo.id)}
        className={`mt-0.5 flex-shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
          todo.completed
            ? 'bg-indigo-500 border-indigo-500'
            : 'border-gray-300 dark:border-gray-500 hover:border-indigo-400 dark:hover:border-indigo-400'
        }`}
        aria-label={todo.completed ? '완료 취소' : '완료'}
      >
        {todo.completed && (
          <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        )}
      </button>

      <div className="flex-1 min-w-0">
        {editing ? (
          <input
            autoFocus
            value={editText}
            onChange={e => setEditText(e.target.value)}
            onBlur={commitEdit}
            onKeyDown={e => {
              if (e.key === 'Enter') commitEdit();
              if (e.key === 'Escape') { setEditText(todo.text); setEditing(false); }
            }}
            className="w-full text-sm bg-transparent border-b-2 border-indigo-400 focus:outline-none text-gray-800 dark:text-gray-100 pb-0.5"
          />
        ) : (
          <p
            onDoubleClick={() => { if (!todo.completed) setEditing(true); }}
            className={`text-sm leading-snug ${
              todo.completed
                ? 'line-through text-gray-400 dark:text-gray-500'
                : 'text-gray-800 dark:text-gray-100 cursor-text'
            }`}
          >
            {todo.text}
          </p>
        )}
        <div className="flex items-center gap-2 mt-1">
          <span className={`flex items-center gap-1 text-xs font-medium ${cfg.text}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
            {cfg.label}
          </span>
          {todo.dueDate && (
            <span className={`text-xs ${overdue ? 'text-red-500 dark:text-red-400 font-medium' : 'text-gray-400 dark:text-gray-500'}`}>
              {overdue ? '⚠ 마감 ' : ''}{formatDate(todo.dueDate)}
            </span>
          )}
        </div>
      </div>

      <button
        onClick={() => onDelete(todo.id)}
        className="mt-0.5 flex-shrink-0 opacity-0 group-hover:opacity-100 p-1.5 -mr-1 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all"
        aria-label="삭제"
      >
        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </li>
  );
}
