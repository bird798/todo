import { FilterType } from '../types/todo';

interface FilterBarProps {
  filter: FilterType;
  searchQuery: string;
  activeCount: number;
  completedCount: number;
  onFilterChange: (f: FilterType) => void;
  onSearchChange: (q: string) => void;
  onClearCompleted: () => void;
}

const FILTERS: { value: FilterType; label: string }[] = [
  { value: 'all', label: '전체' },
  { value: 'active', label: '진행 중' },
  { value: 'completed', label: '완료' },
];

export default function FilterBar({
  filter,
  searchQuery,
  activeCount,
  completedCount,
  onFilterChange,
  onSearchChange,
  onClearCompleted,
}: FilterBarProps) {
  return (
    <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-700 space-y-2.5">
      <div className="relative">
        <svg
          className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400"
          fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          type="text"
          value={searchQuery}
          onChange={e => onSearchChange(e.target.value)}
          placeholder="검색..."
          className="w-full pl-8 pr-4 py-2 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700/50 text-sm text-gray-800 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition"
        />
      </div>
      <div className="flex items-center justify-between">
        <div className="flex gap-0.5">
          {FILTERS.map(f => (
            <button
              key={f.value}
              onClick={() => onFilterChange(f.value)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                filter === f.value
                  ? 'bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400'
                  : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs text-gray-400 dark:text-gray-500">
            {activeCount}개 남음
          </span>
          {completedCount > 0 && (
            <button
              onClick={onClearCompleted}
              className="text-xs text-red-400 hover:text-red-500 dark:text-red-500 dark:hover:text-red-400 transition-colors"
            >
              완료 삭제
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
