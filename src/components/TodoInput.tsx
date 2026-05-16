import { useState, useRef } from 'react';
import { Priority } from '../types/todo';

interface TodoInputProps {
  onAdd: (text: string, priority: Priority, dueDate?: string) => void;
}

const PRIORITIES: { value: Priority; label: string; active: string; dot: string }[] = [
  { value: 'high', label: '높음', active: 'bg-red-100 text-red-600 dark:bg-red-900/40 dark:text-red-400', dot: 'bg-red-500' },
  { value: 'medium', label: '중간', active: 'bg-amber-100 text-amber-600 dark:bg-amber-900/40 dark:text-amber-400', dot: 'bg-amber-500' },
  { value: 'low', label: '낮음', active: 'bg-blue-100 text-blue-600 dark:bg-blue-900/40 dark:text-blue-400', dot: 'bg-blue-500' },
];

export default function TodoInput({ onAdd }: TodoInputProps) {
  const [text, setText] = useState('');
  const [priority, setPriority] = useState<Priority>('medium');
  const [dueDate, setDueDate] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = () => {
    if (!text.trim()) return;
    onAdd(text, priority, dueDate || undefined);
    setText('');
    setDueDate('');
    inputRef.current?.focus();
  };

  return (
    <div className="p-4 border-b border-gray-100 dark:border-gray-700">
      <div className="flex gap-2">
        <input
          ref={inputRef}
          type="text"
          value={text}
          onChange={e => setText(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleSubmit()}
          placeholder="새 할 일을 입력하세요..."
          className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700/50 text-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent text-sm transition"
        />
        <button
          onClick={handleSubmit}
          disabled={!text.trim()}
          className="px-4 py-2.5 bg-indigo-500 hover:bg-indigo-600 disabled:bg-gray-200 dark:disabled:bg-gray-700 disabled:text-gray-400 text-white rounded-xl text-sm font-semibold transition-colors disabled:cursor-not-allowed"
        >
          추가
        </button>
      </div>
      <div className="flex items-center gap-3 mt-2.5 flex-wrap">
        <div className="flex items-center gap-1.5">
          <span className="text-xs text-gray-400 dark:text-gray-500 mr-0.5">우선순위</span>
          {PRIORITIES.map(p => (
            <button
              key={p.value}
              onClick={() => setPriority(p.value)}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium transition-colors ${
                priority === p.value
                  ? p.active
                  : 'text-gray-400 dark:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${priority === p.value ? p.dot : 'bg-gray-300 dark:bg-gray-600'}`} />
              {p.label}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-1.5 ml-auto">
          <span className="text-xs text-gray-400 dark:text-gray-500">마감일</span>
          <input
            type="date"
            value={dueDate}
            onChange={e => setDueDate(e.target.value)}
            className="text-xs px-2.5 py-1 rounded-lg border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700/50 text-gray-600 dark:text-gray-400 focus:outline-none focus:ring-1 focus:ring-indigo-400 transition"
          />
        </div>
      </div>
    </div>
  );
}
