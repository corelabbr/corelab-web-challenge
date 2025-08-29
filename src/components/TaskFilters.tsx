'use client';

import { Search } from 'lucide-react';

interface TaskFiltersProps {
  value: string;
  onSearchChange: (value: string) => void;
}

export default function TaskFiltersComponent({ value, onSearchChange }: TaskFiltersProps) {
  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
      <input
        type="text"
        placeholder="Search notes..."
        value={value}
        onChange={(e) => onSearchChange(e.target.value)}
        className="flex h-9 w-full min-w-0 rounded-md border border-gray-300 bg-white py-1 pl-10 pr-3 text-base outline-none focus:outline-none focus-visible:border-gray-300 focus-visible:ring-2 focus-visible:ring-gray-300 focus-visible:ring-opacity-100"
      />
    </div>
  );
}
