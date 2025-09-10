import React from 'react';
import { Input } from './ui/input';
import { Search } from 'lucide-react';

interface FilterBarProps {
  filters: {
    favorite: boolean;
    color: string;
  };
  onFilterChange: (filters: { favorite: boolean; color: string }) => void;
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

const FilterBar: React.FC<FilterBarProps> = ({ filters, onFilterChange, searchTerm, onSearchChange }) => {
  
  return (
    <div className="w-full max-w-4xl mx-auto mb-6 space-y-4">
   
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <Input
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Pesquisar por tarefas..."
          className="pl-10"
        />
      </div>
    </div>
  );
};

export default FilterBar;




